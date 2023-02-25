// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    address public otherContract;
    uint256 public requiredBalance;
    uint256 public total;

    constructor(address _otherContract) ERC721("MyNFT", "NFT") {
        otherContract = _otherContract;
        requiredBalance = 1000;
    }

    /**
     * @dev Modifier to check if the user has a valid balance in another contract.
     * @param account The user account to check the balance for.
     */
    modifier onlyValid(address account) {
        require(checkBalance(account), "MyNFT: Caller does not have a valid balance");
        _;
    }

    /**
     * @dev Checks if the user has a required balance in another contract.
     * @param account The user account to check the balance for.
     * @return A boolean indicating if the user has the required balance.
     */
    function checkBalance(address account) public view returns (bool) {
        (
            bool success, 
            bytes memory data
        ) = 
        otherContract.staticcall(
            abi.encodeWithSignature("balanceOf(address)", account)
        );

        require(success, "MyNFT: Failed to check balance");
        uint256 balance = abi.decode(data, (uint256));
        return balance >= requiredBalance;
    }

    /**
     * @dev Mints a new NFT to the caller if they have a valid balance.
     * @return The ID of the newly minted NFT.
     */
    function mint() public onlyValid(msg.sender) returns (uint256) {
        total += 1;
        _mint(msg.sender, total);
        return total;
    }
}
