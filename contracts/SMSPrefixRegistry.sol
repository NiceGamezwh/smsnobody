// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SMSPrefixRegistry {
    // 管理员地址
    address public admin;
    
    // 前缀到项目 ID 的映射
    mapping(string => string) public prefixToId;
    
    // 存储所有前缀（用于遍历）
    string[] public prefixes;
    
    // 事件：记录新项目 ID 添加
    event ProjectAdded(string prefix, string projectId);
    
    // 构造函数：设置部署者为管理员
    constructor() {
        admin = msg.sender;
    }
    
    // 修饰符：限制仅管理员调用
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    // 管理员添加前缀和项目 ID
    function addProject(string memory prefix, string memory projectId) public onlyAdmin {
        require(bytes(prefixToId[prefix]).length == 0, "Prefix already exists");
        require(bytes(prefix).length > 0, "Prefix cannot be empty");
        require(bytes(projectId).length > 0, "Project ID cannot be empty");
        
        prefixToId[prefix] = projectId;
        prefixes.push(prefix);
        emit ProjectAdded(prefix, projectId);
    }
    
    // 查询项目 ID
    function getProjectId(string memory prefix) public view returns (string memory) {
        return prefixToId[prefix];
    }
    
    // 获取所有前缀
    function getAllPrefixes() public view returns (string[] memory) {
        return prefixes;
    }
    
    // 检查前缀是否存在
    function prefixExists(string memory prefix) public view returns (bool) {
        return bytes(prefixToId[prefix]).length > 0;
    }
    
    // 获取前缀总数
    function getPrefixCount() public view returns (uint256) {
        return prefixes.length;
    }
    
    // 转移管理员权限
    function transferAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be zero address");
        admin = newAdmin;
    }
}
