// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract MockWETH {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function approve(address spender, uint256 amount) external pure returns (bool) {
        return true;
    }

    function transfer(address recipient, uint256 amount) external returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}

contract MockAavePool {
    mapping(address => mapping(address => uint256)) public supplies;

    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external {
        supplies[asset][onBehalfOf] += amount;
    }

    function withdraw(address asset, uint256 amount, address to) external returns (uint256) {
        require(supplies[asset][msg.sender] >= amount, "Insufficient supply");
        supplies[asset][msg.sender] -= amount;
        return amount;
    }
}