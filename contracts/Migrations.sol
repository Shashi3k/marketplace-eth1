// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.2 <0.9.0;

contract Migrations{
    address public owner =msg.sender;
    uint public last_completed_migration;

    modifier restricted(){
        require(
            msg.sender==owner);
        _;
    }

    function setCompleted(uint completed) public restricted{
        last_completed_migration=completed;
    }
}