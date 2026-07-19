// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {ShipReceipt} from "../src/ShipReceipt.sol";

/// @notice Deploy ShipReceipt to Monad (testnet or mainnet).
/// @dev Example (keystore, recommended):
///      forge script script/Deploy.s.sol:Deploy --account monad-deployer --broadcast
///
///      Example (private key — not recommended):
///      forge script script/Deploy.s.sol:Deploy --private-key $PRIVATE_KEY --broadcast
contract Deploy is Script {
    function run() external returns (ShipReceipt receipts) {
        vm.startBroadcast();
        receipts = new ShipReceipt();
        vm.stopBroadcast();

        console2.log("ShipReceipt deployed at:", address(receipts));
        console2.log("Chain id:", block.chainid);
    }
}
