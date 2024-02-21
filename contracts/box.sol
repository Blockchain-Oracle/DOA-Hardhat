// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
error box__NotOwner();

contract box is Ownable {
    constructor(address _timeLock) Ownable(_timeLock) {}

    uint256 internal value;

    event ValueSet(uint256 value);

    function SetValue(uint256 _value) public onlyOwner {
        // address owner = owner();
        // if (owner != msg.sender) {
        //     revert box__NotOwner();
        // }
        value = _value;
        emit ValueSet(value);
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
