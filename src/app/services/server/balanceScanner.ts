import { readContract } from "viem/actions";
import { type Address, Client, Hex } from "viem";
import {
  ARBITRUM_MAINNET,
  ArbitrumSepolia,
  AVALANCHE_MAINNET,
  EthereumSepolia,
  GOERLI,
  MAINNET,
  MATIC,
  OPTIMISM_MAINNET,
  PolygonAmoy,
} from "../common-utils/chainUtils";

const abi = [
  {
    inputs: [
      { internalType: "address[]", name: "contracts", type: "address[]" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
      { internalType: "uint256", name: "gas", type: "uint256" },
    ],
    name: "call",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct BalanceScanner.Result[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "contracts", type: "address[]" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" },
    ],
    name: "call",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct BalanceScanner.Result[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "addresses", type: "address[]" },
    ],
    name: "etherBalances",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct BalanceScanner.Result[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "addresses", type: "address[]" },
      { internalType: "address", name: "token", type: "address" },
    ],
    name: "tokenBalances",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct BalanceScanner.Result[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address[]", name: "contracts", type: "address[]" },
    ],
    name: "tokensBalance",
    outputs: [
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct BalanceScanner.Result[]",
        name: "results",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Deployed contract address for the balance checker contract
const ReadBalanceContractAddress: Record<string, Address> = {
  [MAINNET]: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5",
  [GOERLI]: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5",
  [MATIC]: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5",
  [AVALANCHE_MAINNET]: "0x08A8fDBddc160A7d5b957256b903dCAb1aE512C5",
  [OPTIMISM_MAINNET]: "0x9e5076DF494FC949aBc4461F4E57592B81517D81",
  [ARBITRUM_MAINNET]: "0x9e5076DF494FC949aBc4461F4E57592B81517D81",

  // Testnet
  [EthereumSepolia.id]: "0x3cf85792bc098f7e76128a85c034b12c59e67321",
  [PolygonAmoy.id]: "0x1F1739fc7dBebBD40188ECa4D012DeD98428FBB4",
  [ArbitrumSepolia.id]: "0x956924aD97B2E9Fd624b0e16c1CB928CFC39F46C",
};

export type ReadBalanceCheckerReturnType = Record<
  string,
  Record<string, string>
>;

export const readNativeBalance = async (params: {
  client: Client;
  ownersAddress: string[];
  network: string;
}): Promise<ReadBalanceCheckerReturnType> => {
  const { client, ownersAddress: batchOwnerAddress, network } = params;
  const readContractAddress = ReadBalanceContractAddress[network];

  if (!readContractAddress) {
    throw new Error(`Native Balance checker unsupported ${network} network`);
  }

  const result = (await readContract(client, {
    address: readContractAddress,
    abi,
    functionName: "etherBalances",
    args: [batchOwnerAddress],
  })) as { success: boolean; data: Hex }[];

  const resultMap: ReadBalanceCheckerReturnType = {};

  result.forEach((value, index) => {
    const keyName = `${network}.0x0`;
    resultMap[batchOwnerAddress[index]] = {
      [keyName]: BigInt(value.data).toString(),
    };
  });

  return resultMap;
};

// read token balance from contracts for one owner
export const readTokensBalance = async (params: {
  client: Client;
  ownerAddress: string;
  tokensContractAddress: string[];
  network: string;
}): Promise<ReadBalanceCheckerReturnType> => {
  const { client, ownerAddress, tokensContractAddress, network } = params;
  const readContractAddress = ReadBalanceContractAddress[network];

  if (!readContractAddress) {
    throw new Error(`Token Balance checker unsupported ${network} network`);
  }

  const result = (await readContract(client, {
    address: readContractAddress,
    abi,
    functionName: "tokensBalance",
    args: [ownerAddress, tokensContractAddress],
  })) as { success: boolean; data: Hex }[];

  const resultMap: ReadBalanceCheckerReturnType = {};
  result.forEach((value, index) => {
    const keyName = `${network}.${tokensContractAddress[index]}`;
    const amount = value.success ? BigInt(value.data).toString() : "0";
    if (!resultMap[ownerAddress]) {
      resultMap[ownerAddress] = {};
    }
    resultMap[ownerAddress][keyName] = amount;
  });

  return resultMap;
};

// read Token Balance for multiple owners
export const readMultipleOwnersTokensBalance = async (params: {
  client: Client;
  batchOwnerAddress: string[];
  tokensContractAddress: string[];
  network: string;
}): Promise<ReadBalanceCheckerReturnType> => {
  const { client, batchOwnerAddress, tokensContractAddress, network } = params;
  const readContractAddress = ReadBalanceContractAddress[network];
  if (!readContractAddress) {
    console.log(`Unsupported network: ${network}`);
    throw new Error(`Token Balance checker unsupported ${network} network`);
  }

  const resultMap: ReadBalanceCheckerReturnType = {};

  const batchPromis = batchOwnerAddress.map(async (ownerAddress) => {
    if (!ownerAddress) {
      throw new Error("Invalid owner address");
    }
    const result = await readTokensBalance({
      client,
      ownerAddress,
      tokensContractAddress,
      network,
    });
    resultMap[ownerAddress] = result[ownerAddress];
  });

  await Promise.all(batchPromis);

  return resultMap;
};
