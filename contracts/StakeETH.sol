// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
    function approve(address guy, uint256 wad) external returns (bool);
    function transfer(address dst, uint256 wad) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

interface IAavePool {
    function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode) external;
    function withdraw(address asset, uint256 amount, address to) external returns (uint256);
}

contract IndirectAaveEthStaking is ReentrancyGuard, Ownable {
    IWETH public immutable WETH;
    IAavePool public immutable aavePool;
    address public immutable aWETHAddress;

    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

     constructor(
        address _weth,
        address _aavePool,
        address _aWETHAddress
    ) Ownable(msg.sender) {  
        WETH = IWETH(_weth);
        aavePool = IAavePool(_aavePool);
        aWETHAddress = _aWETHAddress;
    }

    function stake() external payable nonReentrant {
        require(msg.value > 0, "Cannot stake 0");
        _totalSupply += msg.value;
        _balances[msg.sender] += msg.value;
        
        WETH.deposit{value: msg.value}();
        WETH.approve(address(aavePool), msg.value);
        aavePool.supply(address(WETH), msg.value, address(this), 0);
        
        emit Staked(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Cannot withdraw 0");
        require(_balances[msg.sender] >= amount, "Not enough balance");
        
        _totalSupply -= amount;
        _balances[msg.sender] -= amount;
        
        aavePool.withdraw(address(WETH), amount, address(this));
        WETH.withdraw(amount);
        payable(msg.sender).transfer(amount);
        
        emit Withdrawn(msg.sender, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }

    receive() external payable {
        // This function is needed to receive ETH when WETH is unwrapped
    }
}