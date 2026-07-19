// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ShipReceipt
/// @notice Public, append-only proof that a creator shipped work into the world.
/// @dev Used by Createvity Boost: ideas stay offchain; only ship events hit Monad.
///      Does not store private draft content — only public title, optional link, and a content hash.
contract ShipReceipt {
    /// @notice One public ship record.
    struct Receipt {
        address creator;
        bytes32 contentHash;
        string title;
        string link;
        uint64 timestamp;
    }

    /// @notice Next receipt id (also total number of receipts).
    uint256 public nextId;

    /// @notice id => receipt
    mapping(uint256 => Receipt) private _receipts;

    /// @notice creator => list of receipt ids
    mapping(address => uint256[]) private _idsByCreator;

    /// @notice Emitted when someone ships.
    event Shipped(
        address indexed creator,
        uint256 indexed id,
        bytes32 contentHash,
        string title,
        string link
    );

    error EmptyTitle();
    error ReceiptNotFound(uint256 id);

    /// @notice Record a public ship.
    /// @param title Short public title of what was shipped (required).
    /// @param link Optional URL (portfolio, GitHub, live app). Empty string allowed.
    /// @param contentHash Client-computed keccak256 fingerprint of offchain payload
    ///        (e.g. title + link + local idea id). Enables integrity checks without storing body text.
    /// @return id The new receipt id.
    function ship(string calldata title, string calldata link, bytes32 contentHash)
        external
        returns (uint256 id)
    {
        if (bytes(title).length == 0) revert EmptyTitle();

        id = nextId;
        unchecked {
            nextId = id + 1;
        }

        _receipts[id] = Receipt({
            creator: msg.sender,
            contentHash: contentHash,
            title: title,
            link: link,
            timestamp: uint64(block.timestamp)
        });

        _idsByCreator[msg.sender].push(id);

        emit Shipped(msg.sender, id, contentHash, title, link);
    }

    /// @notice Fetch a single receipt by id.
    function getReceipt(uint256 id) external view returns (Receipt memory) {
        if (id >= nextId) revert ReceiptNotFound(id);
        return _receipts[id];
    }

    /// @notice All receipt ids for a creator (may be large; use for UI pagination carefully).
    function receiptsOf(address creator) external view returns (uint256[] memory) {
        return _idsByCreator[creator];
    }

    /// @notice Number of ships by a creator.
    function shipCount(address creator) external view returns (uint256) {
        return _idsByCreator[creator].length;
    }

    /// @notice Total receipts ever created.
    function totalShips() external view returns (uint256) {
        return nextId;
    }
}
