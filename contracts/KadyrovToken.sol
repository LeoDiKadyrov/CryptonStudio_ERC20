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
    event Approval(address indexed _owner, address indexed _spender, uint256 _oldValue, uint256 _value); // ask about transfer with four arguments (is it override?)

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return _balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_value < _balances[msg.sender], "Caller's account balance doesn't have enough tokens");
        require(_to != address(0), "_to shouldn't be 0x0 address");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0), "_to shouldn't be 0x0 address");
        require(_value < _balances[_from], "Not enough tokens on the balance to make transfer");
        require(_allowances[_from][msg.sender] >= _value, "Not enough allowance");
        _balances[_from] -= _value;
        _allowances[_from][msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _currentValue, uint256 _value) public returns (bool success) {
        require(_spender != address(0), "_spender cannot be the zero address");
        if (_allowances[msg.sender][_spender] == _currentValue) { // condition to prevent attack vector
            _allowances[msg.sender][_spender] += _value;
            emit Approval(msg.sender, _spender, _currentValue, _value);
            return true;
        } else { return false; }
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return _allowances[_owner][_spender];
    }
}
