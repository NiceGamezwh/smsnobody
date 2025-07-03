"use client";

import Web3 from "web3";

// 智能合约 ABI
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "prefix", "type": "string" },
      { "internalType": "string", "name": "projectId", "type": "string" }
    ],
    "name": "addProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "prefix", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "projectId", "type": "string" }
    ],
    "name": "ProjectAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "prefix", "type": "string" }
    ],
    "name": "ProjectRemoved",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "prefix", "type": "string" }
    ],
    "name": "removeProject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllPrefixes",
    "outputs": [
      { "internalType": "string[]", "name": "", "type": "string[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "prefix", "type": "string" }
    ],
    "name": "getProjectId",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "prefixes",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "prefixToId",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// 合约配置
const CONTRACT_CONFIG = {
  address: "0x3EEb89EabC28355c89315ecDbAc111a942EA23cC",
  network: {
    chainId: "0xaa36a7",
    chainName: "Sepolia Test Network",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/qZ5FlZZT5W27pwGceQansOuwgDUZFahp",
    blockExplorerUrl: "https://sepolia.etherscan.io/",
  },
};

// 搜索前缀对应的项目ID
export async function searchPrefix(prefix: string) {
  try {
    const web3 = new Web3(CONTRACT_CONFIG.network.rpcUrl);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_CONFIG.address);

    const projectId = await contract.methods.getProjectId(prefix).call();
    return {
      projectId: projectId || "",
      template: projectId
        ? `【${prefix}】您的验证码为：XXXX，请在5分钟内完成验证登录，请勿向他人泄露，如非本人操作请忽略`
        : "",
    };
  } catch (error) {
    console.error("搜索失败:", error);
    return { projectId: "", template: "" };
  }
}

// 管理员添加项目到合约
export async function addProjectToContract(prefix: string, projectId: string) {
  if (typeof window !== "undefined" && window.ethereum) {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_CONFIG.address);

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    const gasEstimate = await contract.methods.addProject(prefix, projectId).estimateGas({ from: account });
    const result = await contract.methods.addProject(prefix, projectId).send({
      from: account,
      gas: Math.floor(Number(gasEstimate) * 1.2).toString(),
      gasPrice: await web3.eth.getGasPrice(),
    });

    return result;
  }
  throw new Error("Web3 not available");
}

// 获取所有前缀
export async function getAllPrefixes() {
  try {
    const web3 = new Web3(CONTRACT_CONFIG.network.rpcUrl);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_CONFIG.address);
    const prefixes = await contract.methods.getAllPrefixes().call();
    return prefixes;
  } catch (error) {
    console.error("获取前缀列表失败:", error);
    return [];
  }
}

export { CONTRACT_CONFIG, CONTRACT_ABI };