// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {ShipReceipt} from "../src/ShipReceipt.sol";

contract ShipReceiptTest is Test {
    ShipReceipt internal receipts;

    address internal alice = makeAddr("alice");
    address internal bob = makeAddr("bob");

    event Shipped(
        address indexed creator,
        uint256 indexed id,
        bytes32 contentHash,
        string title,
        string link
    );

    function setUp() public {
        receipts = new ShipReceipt();
    }

    function test_Ship_StoresReceiptAndEmits() public {
        bytes32 hash = keccak256(abi.encodePacked("idea-1", "Landing page", "https://example.com"));

        vm.prank(alice);
        vm.expectEmit(true, true, false, true);
        emit Shipped(alice, 0, hash, "Landing page", "https://example.com");

        uint256 id = receipts.ship("Landing page", "https://example.com", hash);
        assertEq(id, 0);

        ShipReceipt.Receipt memory r = receipts.getReceipt(0);
        assertEq(r.creator, alice);
        assertEq(r.contentHash, hash);
        assertEq(r.title, "Landing page");
        assertEq(r.link, "https://example.com");
        assertEq(r.timestamp, uint64(block.timestamp));

        assertEq(receipts.totalShips(), 1);
        assertEq(receipts.shipCount(alice), 1);

        uint256[] memory ids = receipts.receiptsOf(alice);
        assertEq(ids.length, 1);
        assertEq(ids[0], 0);
    }

    function test_Ship_EmptyLinkAllowed() public {
        vm.prank(alice);
        uint256 id = receipts.ship("Sketch dump", "", bytes32(uint256(1)));
        assertEq(id, 0);

        ShipReceipt.Receipt memory r = receipts.getReceipt(0);
        assertEq(bytes(r.link).length, 0);
    }

    function test_Ship_MultipleCreatorsAndIds() public {
        vm.prank(alice);
        uint256 a0 = receipts.ship("A0", "", bytes32(uint256(10)));
        vm.prank(bob);
        uint256 b0 = receipts.ship("B0", "https://bob.dev", bytes32(uint256(20)));
        vm.prank(alice);
        uint256 a1 = receipts.ship("A1", "", bytes32(uint256(11)));

        assertEq(a0, 0);
        assertEq(b0, 1);
        assertEq(a1, 2);
        assertEq(receipts.totalShips(), 3);
        assertEq(receipts.shipCount(alice), 2);
        assertEq(receipts.shipCount(bob), 1);

        uint256[] memory aliceIds = receipts.receiptsOf(alice);
        assertEq(aliceIds[0], 0);
        assertEq(aliceIds[1], 2);
    }

    function test_Ship_RevertsOnEmptyTitle() public {
        vm.prank(alice);
        vm.expectRevert(ShipReceipt.EmptyTitle.selector);
        receipts.ship("", "https://x.com", bytes32(0));
    }

    function test_GetReceipt_RevertsWhenMissing() public {
        vm.expectRevert(abi.encodeWithSelector(ShipReceipt.ReceiptNotFound.selector, 0));
        receipts.getReceipt(0);

        vm.prank(alice);
        receipts.ship("Only one", "", bytes32(0));

        vm.expectRevert(abi.encodeWithSelector(ShipReceipt.ReceiptNotFound.selector, 1));
        receipts.getReceipt(1);
    }

    function testFuzz_Ship_TitleNonEmpty(string memory title, string memory link, bytes32 contentHash)
        public
    {
        vm.assume(bytes(title).length > 0);
        // Bound gas / storage: keep strings reasonable for fuzz
        vm.assume(bytes(title).length < 256);
        vm.assume(bytes(link).length < 512);

        vm.prank(alice);
        uint256 id = receipts.ship(title, link, contentHash);

        ShipReceipt.Receipt memory r = receipts.getReceipt(id);
        assertEq(r.creator, alice);
        assertEq(r.title, title);
        assertEq(r.link, link);
        assertEq(r.contentHash, contentHash);
    }
}
