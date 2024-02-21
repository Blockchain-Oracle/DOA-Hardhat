// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract goveranceToken is ERC20, ERC20Permit, ERC20Votes {
    uint256 public s_maxSupply = 1000000000000000000000000;

    constructor() ERC20("goveranceToken", "GT") ERC20Permit("goveranceToken") {
        _mint(msg.sender, s_maxSupply);
    }

    //The function below are override

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Votes) {
        super._update(from, to, value);
    }

    function nonces(
        address owner
    ) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
