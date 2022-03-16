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

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    // function name() public view returns (string) {
    //     return name;
    // }

    // function symbol() public view returns (string) {
    //     return symbol;
    // }                                                    Solidity уже создал для этих полей свои публичные геттеры, верно?

    // function decimals() public view returns (uint8) {
    //     return decimals;
    // }

    // function totalSupply() public view returns (uint256) {
    //     return totalSupply;
    // }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_value < _balances[msg.sender], "Withdrawal value is greater than total balance");
        // _to.transfer(_value); Что будет если сделать address payable и оптравлять через transfer?
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {

    }

    function approve(address _spender, uint256 _value) public returns (bool success) {

    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        
    }
}
