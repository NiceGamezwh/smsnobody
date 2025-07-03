"use client";

import { useState, useEffect } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWeb3() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        }
      } catch (error) {
        console.error("检查连接失败:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
          await switchToSepolia();
        }
      } catch (error) {
        console.error("连接钱包失败:", error);
        alert("连接钱包失败，请检查 MetaMask");
      }
    } else {
      alert("请安装 MetaMask 钱包");
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xaa36a7",
                chainName: "Sepolia Test Network",
                nativeCurrency: {
                  name: "ETH",
                  symbol: "ETH",
                  decimals: 18,
                },
                rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/qZ5FlZZT5W27pwGceQansOuwgDUZFahp"],
                blockExplorerUrls: ["https://sepolia.etherscan.io/"],
              },
            ],
          });
        } catch (addError) {
          console.error("添加网络失败:", addError);
        }
      }
    }
  };

  return {
    isConnected,
    account,
    web3,
    connectWallet,
    switchToSepolia,
  };
}