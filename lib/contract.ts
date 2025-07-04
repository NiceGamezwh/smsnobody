import { ethers } from "ethers";

const CONTRACT_CONFIG = {
  address: "0x3EEb89EabC28355c89315ecDbAc111a942EA23cC",
  network: {
    chainId: "0xaa36a7",
    chainName: "Sepolia Test Network",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/qZ5FlZZT5W27pwGceQansOuwgDUZFahp",
    blockExplorerUrl: "https://sepolia.etherscan.io/",
  },
};

const SUBMISSION_CONTRACT_CONFIG = {
  address: "0xa4f46cbBF01b034512d2DbC3d7228C9b68945A9B",
};

const CONTRACT_ABI = [
  "function getProjectId(string memory prefix) public view returns (string memory)",
  "function addProject(string memory prefix, string memory projectId) public",
];

const SUBMISSION_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldAdmin",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "AdminTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prefix",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "projectId",
        "type": "string"
      }
    ],
    "name": "ApplicationApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prefix",
        "type": "string"
      }
    ],
    "name": "ApplicationRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "prefix",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "submitter",
        "type": "address"
      }
    ],
    "name": "ApplicationSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_projectId",
        "type": "string"
      }
    ],
    "name": "approveApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "rejectApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_prefix",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_template",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_contact",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      }
    ],
    "name": "submitApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newAdmin",
        "type": "address"
      }
    ],
    "name": "transferAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "applicationCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "applications",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "prefix",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "template",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "contact",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "submitter",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "projectId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllApplications",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "prefix",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "template",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contact",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "submitter",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "projectId",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct SMSPrefixRegistrySubmissions.Application[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getApplication",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "prefix",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "template",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "contact",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "submitter",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "projectId",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct SMSPrefixRegistrySubmissions.Application",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const getProvider = () => {
  return new ethers.JsonRpcProvider(CONTRACT_CONFIG.network.rpcUrl);
};

const getSigner = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return await provider.getSigner();
  }
  throw new Error("No Ethereum provider found");
};

export const searchPrefix = async (prefix: string) => {
  const contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_ABI, getProvider());
  try {
    console.log(`Searching for prefix: ${prefix}`);
    const projectId = await contract.getProjectId(prefix);
    console.log(`Raw result - projectId: ${projectId}`);
    return { projectId, template: "" }; // Template is empty since ABI only returns projectId
  } catch (error: any) {
    console.error("Search error:", error);
    if (error.code === "BAD_DATA") {
      console.warn("Received invalid data from contract, returning empty result");
      return { projectId: "", template: "" };
    }
    throw error;
  }
};

export const addProjectToContract = async (prefix: string, projectId: string) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_ABI, signer);
  console.log(`Adding project - prefix: ${prefix}, projectId: ${projectId}`);
  const tx = await contract.addProject(prefix, projectId);
  const receipt = await tx.wait();
  console.log(`Transaction confirmed: ${receipt.hash}`);
  return receipt.hash;
};

export const submitApplicationToContract = async (
  prefix: string,
  template: string,
  contact: string,
  description: string
) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(SUBMISSION_CONTRACT_CONFIG.address, SUBMISSION_CONTRACT_ABI, signer);
  console.log(`Submitting application - prefix: ${prefix}, template: ${template}`);
  const tx = await contract.submitApplication(prefix, template, contact, description);
  const receipt = await tx.wait();
  console.log(`Transaction confirmed: ${receipt.hash}`);
  return receipt.hash;
};

export const approveApplication = async (id: number, projectId: string) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(SUBMISSION_CONTRACT_CONFIG.address, SUBMISSION_CONTRACT_ABI, signer);
  console.log(`Approving application - id: ${id}, projectId: ${projectId}`);
  const tx = await contract.approveApplication(id, projectId);
  const receipt = await tx.wait();
  console.log(`Transaction confirmed: ${receipt.hash}`);
  return receipt.hash;
};

export const rejectApplication = async (id: number) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(SUBMISSION_CONTRACT_CONFIG.address, SUBMISSION_CONTRACT_ABI, signer);
  console.log(`Rejecting application - id: ${id}`);
  const tx = await contract.rejectApplication(id);
  const receipt = await tx.wait();
  console.log(`Transaction confirmed: ${receipt.hash}`);
  return receipt.hash;
};

export const getAllApplications = async () => {
  const contract = new ethers.Contract(SUBMISSION_CONTRACT_CONFIG.address, SUBMISSION_CONTRACT_ABI, getProvider());
  try {
    console.log("Fetching all applications");
    const applications = await contract.getAllApplications();
    const formattedApplications = applications.map((app: any) => ({
      id: Number(app.id),
      prefix: app.prefix,
      template: app.template,
      contact: app.contact,
      description: app.description,
      submitter: app.submitter,
      status: app.status,
      projectId: app.projectId,
      timestamp: Number(app.timestamp),
    }));
    console.log(`Fetched ${formattedApplications.length} applications`);
    return formattedApplications;
  } catch (error) {
    console.error("Get applications error:", error);
    return [];
  }
};

export const transferAdmin = async (newAdmin: string) => {
  const signer = await getSigner();
  const contract = new ethers.Contract(SUBMISSION_CONTRACT_CONFIG.address, SUBMISSION_CONTRACT_ABI, signer);
  console.log(`Transferring admin to: ${newAdmin}`);
  const tx = await contract.transferAdmin(newAdmin);
  const receipt = await tx.wait();
  console.log(`Transaction confirmed: ${receipt.hash}`);
  return receipt.hash;
};