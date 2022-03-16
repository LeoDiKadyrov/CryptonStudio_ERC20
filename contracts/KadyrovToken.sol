//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract KadyrovToken {
    string public name = "KadyrovToken";
    string public symbol = "KDVT";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public _balances;
    mapping(address => mapping(address => uint256)) public _allowances;

}
