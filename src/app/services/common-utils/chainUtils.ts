import { arbitrumTokens } from "@/app/constants/TokenDirectory/Arbitrum";
import { optimismTokens } from "@/app/constants/TokenDirectory/Optimisim";
import { arbitrumSepoliaTokens } from "@/app/constants/TokenDirectory/Testnet/ArbitrumSepolia";
import { sepoliaTokens } from "@/app/constants/TokenDirectory/Testnet/EthereumSepolia";
import { amoyTokens } from "@/app/constants/TokenDirectory/Testnet/PolygonAmoy";
import { createPublicClient, Chain, http } from "viem";

export interface ChainConfig extends Chain {
  currencyConversionSymbol: string;
}

import {
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  arbitrum,
  arbitrumSepolia,
  base,
  optimism,
} from "viem/chains";
import { ethereumTokens } from "@/app/constants/TokenDirectory/Ethereum";
import { polygonTokens } from "@/app/constants/TokenDirectory/Polygon";
import { ChainInfo } from "@/app/constants/asset.interface";

export const MAINNET = "ethereum";
export const MATIC = "polygon";
export const AMOY = "polygon-amoy";
export const MUMBAI = "mumbai";
export const BSC_MAINNET = "bsc_mainnet";
export const BSC_TESTNET = "bsc_testnet";
export const ARBITRUM_MAINNET = "arbitrum";
export const ARBITRUM_SEPOLIA = "arbitrum-sepolia";
export const OPTIMISM_MAINNET = "optimism";
export const OPTIMISM_SEPOLIA = "optimism-sepolia";
export const CELO_MAINNET = "celo_mainnet";
export const AVALANCHE_MAINNET = "avalanche_mainnet";
export const AVALANCHE_TESTNET = "avalanche_testnet";
export const GNOSIS = "xdai";
export const GOERLI = "goerli";

export type TChain = {
  chainId: number;
  id: number;
  displayName: string;
  currency: string;
  logo: string;
  blockExplorerUrl: string;
};

export enum EChain {
  // mainnets
  ETH_MAINNET = 1,
  POLYGON_MAINNET = 137,
  OPTIMISM = 10,
  BASE = 8453,
  ARBITRUM_ONE = 42161,

  // testnets
  ETH_GOERLI = 5,
  ETH_RINKEBY = 4,
  ETH_SEPOLIA = 11155111,
  POLYGON_AMOY = 80002,
  BASE_SEPOLIA = 84532,
  OPTIMISM_SEPOLIA = 11155420,
  ARBITRUM_SEPOLIA = 421614,
}

export const AVAILABLE_CHAINS: Record<string, TChain> = {
  [EChain.ETH_SEPOLIA]: {
    chainId: EChain.ETH_SEPOLIA,
    id: EChain.ETH_SEPOLIA,
    displayName: "Ethereum Sepolia",
    currency: "ETH",
    logo: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    blockExplorerUrl: "https://sepolia.etherscan.io",
  },
  [EChain.ARBITRUM_SEPOLIA]: {
    chainId: EChain.ARBITRUM_SEPOLIA,
    id: EChain.ARBITRUM_SEPOLIA,
    displayName: "Arbitrum Sepolia",
    currency: "ETH",
    logo: "https://assets.web3pay.io/images/arbitrum-dark.svg",
    blockExplorerUrl: "https://sepolia.arbiscan.io",
  },
};

export const Ethereum: ChainInfo = {
  id: "ethereum",
  name: "ethereum",
  network: "ethereum",
  chainId: 1,
  rpc: "https://mainnet.infura.io/v3",
  networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
  publicRpc: "https://eth.llamarpc.com",
  symbol: "ETH",
  decimals: 18,

  defaultAssetInfoList: ethereumTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const Polygon: ChainInfo = {
  id: "polygon",
  name: "polygon",
  network: "polygon",
  chainId: 137,
  rpc: "https://polygon-mainnet.infura.io/v3",
  networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/polygon.svg`,
  publicRpc: "https://polygon.llamarpc.com",
  symbol: "MATIC",
  decimals: 18,

  defaultAssetInfoList: polygonTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const Base: ChainInfo = {
  id: "base",
  name: "base",
  network: "base",
  chainId: 8453,
  rpc: "https://base-mainnet.infura.io/v3",
  networkImage:
    "https://assets.coingecko.com/asset_platforms/images/131/small/base-network.png?1720533039",
  publicRpc: "https://base-rpc.publicnode.com",
  // publicRpc: "https://base.llamarpc.com",
  symbol: "BASE",
  decimals: 18,

  defaultAssetInfoList: [],

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const Arbitrum: ChainInfo = {
  id: "arbitrum",
  name: "arbitrum",
  network: "arbitrum",
  chainId: 42161,
  rpc: "https://arbitrum-mainnet.infura.io/v3",
  networkImage: "https://assets.web3pay.io/images/arbitrum-dark.svg",

  publicRpc: "https://arbitrum.llamarpc.com",

  symbol: "ETH",
  decimals: 18,

  defaultAssetInfoList: arbitrumTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const Optimism: ChainInfo = {
  id: "optimism",
  name: "optimism",
  network: "optimism",
  chainId: 10,
  rpc: "https://optimism-mainnet.infura.io/v3",
  networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/optimism.svg`,
  publicRpc: "https://optimism.llamarpc.com",

  symbol: "OP",
  decimals: 18,

  defaultAssetInfoList: optimismTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

// Testnet
export const EthereumSepolia: ChainInfo = {
  id: "ethereum-sepolia",
  name: "sepolia",
  network: "ethereum-sepolia",
  chainId: 11155111,
  rpc: "https://sepolia.infura.io/v3",
  networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,

  publicRpc: "https://1rpc.io/sepolia",

  symbol: "ETH",
  decimals: 18,

  defaultAssetInfoList: sepoliaTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const PolygonAmoy: ChainInfo = {
  id: "polygon-amoy",
  name: "amoy",
  network: "polygon-amoy",
  chainId: 80002,
  rpc: "https://polygon-amoy.infura.io/v3",
  networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/polygon.svg`,

  publicRpc: "https://polygon-amoy.drpc.org",

  symbol: "MATIC",
  decimals: 18,

  defaultAssetInfoList: amoyTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

export const ArbitrumSepolia: ChainInfo = {
  id: "arbitrum-sepolia",
  name: "arbitrum-sepolia",
  network: "arbitrum-sepolia",
  chainId: 421614,
  rpc: "https://arbitrum-sepolia.infura.io/v3",
  networkImage: "https://assets.web3pay.io/images/arbitrum-dark.svg",

  publicRpc: "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public",

  symbol: "ETH",
  decimals: 18,

  defaultAssetInfoList: arbitrumSepoliaTokens,

  // erc-5792, erc-7682
  walletCapabilities: {
    atomicBatch: {
      supported: true,
    },
    auxiliaryFunds: {
      supported: true,
    },
  },
};

const SupportedChain = [
  //Mainnet
  Ethereum,
  Polygon,
  // Base,
  Arbitrum,
  // Optimism,

  //Testnet
  EthereumSepolia,
  PolygonAmoy,
  ArbitrumSepolia,
];

export const SupportedNetworkId = () => {
  return SupportedChain.map((chain) => chain.network);
};

export const getChainInfoFromNetwork = (network: string) => {
  return SupportedChain.find((chain) => chain.network === network);
};

const InfuraKey = process.env.INFURA_KEY;

export const ethClient = createPublicClient({
  chain: mainnet,
  transport: http(`${Ethereum.rpc}/${InfuraKey}`),
});

export const baseClient = createPublicClient({
  chain: base,
  transport: http(`${Base.rpc}/${InfuraKey}`),
});

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http(`${Arbitrum.rpc}/${InfuraKey}`),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(`${Optimism.rpc}/${InfuraKey}`),
});

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(`${Polygon.rpc}/${InfuraKey}`),
});

// testnet clients
export const sepoliaClient = createPublicClient({
  chain: sepolia,
  transport: http(`${EthereumSepolia.rpc}/${InfuraKey}`),
});

export const polygonAmoyClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(`${PolygonAmoy.rpc}/${InfuraKey}`),
});

export const arbitrumSepoliaClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(`${ArbitrumSepolia.rpc}/${InfuraKey}`),
});

export function chainIdToNetworkKey(chainId: number | string): string {
  const chainIdNumb = Number(chainId);
  switch (chainIdNumb) {
    case EChain.ETH_MAINNET:
      return "ethereum";
    case EChain.ETH_SEPOLIA:
      return "ethereum-sepolia";
    case EChain.POLYGON_MAINNET:
      return "polygon";
    case EChain.POLYGON_AMOY:
      return "polygon-amoy";
    case EChain.ARBITRUM_ONE:
      return "arbitrum";
    case EChain.ARBITRUM_SEPOLIA:
      return "arbitrum-sepolia";
    case EChain.BASE:
      return "base";
    case EChain.OPTIMISM:
      return "optimism";
    default:
      throw new Error(`Unsupported chainId: ${Number(chainId)}`);
  }
}

export function getNetworkImageUrl(chainId: number | string): string {
  const chainIdNumb = Number(chainId);
  switch (chainIdNumb) {
    case EChain.ETH_MAINNET:
    case EChain.ETH_SEPOLIA:
      return `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`;
    case EChain.POLYGON_MAINNET:
    case EChain.POLYGON_AMOY:
      return "https://lrc-accounts.web3auth.io/icons/polygon.svg";
    case EChain.ARBITRUM_ONE:
    case EChain.ARBITRUM_SEPOLIA:
      return "https://assets.web3pay.io/images/arbitrum-dark.svg";
    case EChain.OPTIMISM:
    case EChain.OPTIMISM_SEPOLIA:
      return "https://ethereum-optimism.github.io/data/GTC/logo.svg";
    case EChain.BASE:
    case EChain.BASE_SEPOLIA:
      return `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`;
    default:
      throw new Error(`Unsupported chainId: ${JSON.stringify(chainId)}`);
  }
}

export const idleTimeTracker = ((
  activityThresholdTime: number,
): { checkIfIdle: () => boolean } => {
  let isIdle = false;
  let idleTimeout: number | null = null;

  const resetTimer = () => {
    if (idleTimeout) {
      window.clearTimeout(idleTimeout);
    }
    isIdle = false;
    idleTimeout = window.setTimeout(() => {
      isIdle = true;
    }, activityThresholdTime * 1000);
  };

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    window.addEventListener("load", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
  }

  function checkIfIdle() {
    return isIdle;
  }
  return {
    checkIfIdle,
  };
})(60 * 3);

export function chainIdToViemChain(chainId: number | string): ChainConfig {
  const chainIdNumb = Number(chainId);
  switch (chainIdNumb) {
    case 1:
      return { ...mainnet, currencyConversionSymbol: "ETH" };
    case 11155111:
      return { ...sepolia, currencyConversionSymbol: "ETH" };
    case 137:
      return { ...polygon, currencyConversionSymbol: "MATIC" };
    case 80002:
      return { ...polygonAmoy, currencyConversionSymbol: "MATIC" };
    case 42161:
      return { ...arbitrum, currencyConversionSymbol: "ETH" };
    case 421614:
      return { ...arbitrumSepolia, currencyConversionSymbol: "ARB" };
    default:
      throw new Error(`Invalid chainId: ${JSON.stringify(chainId)}`);
  }
}

export function getPublicClient(chainId: number | string) {
  const chain = chainIdToViemChain(chainId);
  const rpc = getProxyChainRpc(chain.id);

  return createPublicClient({
    chain,
    transport: http(rpc),
  });
}

export const getProxyChainRpc = (chainId: number | string): string => {
  const chainIdNum = Number(chainId);
  switch (chainIdNum) {
    case EChain.ETH_SEPOLIA:
      return `https://rpc-proxy.web3auth.io?network=${chainIdNum}`;
    case EChain.POLYGON_AMOY:
      return `https://rpc-proxy.web3auth.io?network=${chainIdNum}`;
    case EChain.ARBITRUM_SEPOLIA:
      return `https://rpc-proxy.web3auth.io?network=${chainIdNum}`;
    default:
      throw new Error(`Unsupported chain, ${chainId}`);
  }
};

type API_PROVIDER_OBJ = { keys: string[]; globalCounter: number; url: string };

export const ETHERSCAN_API_MAP: Record<string, API_PROVIDER_OBJ> = {
  ["ethereum"]: {
    url: "https://api.etherscan.io/api",
    keys: process.env.ETHERSCAN_ETH_KEYS?.split(",") || [],
    globalCounter: -1,
  },
  [BSC_MAINNET]: {
    url: "https://api.bscscan.com/api",
    keys: process.env.ETHERSCAN_BSC_KEYS?.split(",") || [],
    globalCounter: -1,
  },
  [MATIC]: {
    url: "https://api.polygonscan.com/api",
    keys: process.env.ETHERSCAN_POLYGON_KEYS?.split(",") || [],
    globalCounter: -1,
  },
};
export const SIMPLEHASH = "simplehash";
export const CRYPTOCOMPARE = "cryptocompare";

export const SIMPLEHASH_API: API_PROVIDER_OBJ = {
  url: "api.simplehash.com",
  keys: process.env.KEYS_SIMPLEHASH?.split(",") || [],
  globalCounter: -1,
};

const getNextKey = (obj: API_PROVIDER_OBJ) => {
  const { keys, globalCounter } = obj;
  let tempCounter = globalCounter;
  tempCounter += 1;
  const selectedApiKey = keys[tempCounter];
  if (tempCounter === keys.length - 1) tempCounter = -1;
  obj.globalCounter = tempCounter;
  return selectedApiKey;
};

export const getEtherscanApiKey = (network: string): string =>
  getNextKey(ETHERSCAN_API_MAP[network]);

export const getSimpleHashApiKey = (): string => getNextKey(SIMPLEHASH_API);

export const BLOCK_EXPLORER_URL = {
  // mainnets
  [EChain.ETH_MAINNET]: "https://api.etherscan.io/api",
  [EChain.POLYGON_MAINNET]: "https://api.polygonscan.com/api",
  [EChain.OPTIMISM]: "https://api-optimistic.etherscan.io/api",
  [EChain.BASE]: "https://api.basescan.org/api",
  [EChain.ARBITRUM_ONE]: "https://api.arbiscan.io/api",

  // testnets
  [EChain.ETH_SEPOLIA]: "https://api-sepolia.etherscan.io/api",
  [EChain.POLYGON_AMOY]: "https://api-amoy.polygonscan.com/api",
  [EChain.BASE_SEPOLIA]: "https://api-sepolia.basescan.org/api",
  [EChain.ARBITRUM_SEPOLIA]: "https://api-sepolia.arbiscan.io/api",
  [EChain.OPTIMISM_SEPOLIA]: "https://api-sepolia-optimism.etherscan.io/api",
  [EChain.ETH_GOERLI]: "",
  [EChain.ETH_RINKEBY]: "",
};

export const BLOCK_EXPLORER_URL_UI = {
  // mainnets
  [EChain.ETH_MAINNET]: "https://etherscan.io",
  [EChain.POLYGON_MAINNET]: "https://polygonscan.com",
  [EChain.OPTIMISM]: "https://optimistic.etherscan.io",
  [EChain.BASE]: "https://basescan.org",
  [EChain.ARBITRUM_ONE]: "https://arbiscan.io/",

  // testnets
  [EChain.ETH_SEPOLIA]: "https://sepolia.etherscan.io",
  [EChain.POLYGON_AMOY]: "https://oklink.com/amoy",
  [EChain.BASE_SEPOLIA]: "https://sepolia.basescan.org/",
  [EChain.ARBITRUM_SEPOLIA]: "https://sepolia.arbiscan.io",
  [EChain.OPTIMISM_SEPOLIA]: "https://sepolia-optimism.etherscan.io",
  [EChain.ETH_GOERLI]: "",
  [EChain.ETH_RINKEBY]: "",
};

// Helper to get chain configuration
export const getChainConfiguration = (chainId: number) => {
  switch (chainId) {
    case 1:
      return mainnet;
    case 11155111:
      return sepolia;
    case 137:
      return polygon;
    case 42161:
      return arbitrum;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export function validateAddress(address: string) {
  if (!address || typeof address !== "string") {
    return false;
  }
  return true;
}

// const estimateGas = async () => {
//   if (!selectedToken || !amount || !validateBalance() || !address) return;

//   try {
//     const value = parseUnits(amount, selectedToken.decimals);
//     const chain = getChainConfiguration(selectedToken.chainId);

//     let gasEstimate;
//     if (selectedToken.isErc20) {
//       gasEstimate = await publicClient.estimateGas({
//         account: address as `0x${string}`,
//         to: selectedToken.address as `0x${string}`,
//         data: encodeFunctionData({
//           abi: ERC20_ABI,
//           functionName: "transfer",
//           args: [address, value],
//         }),
//         // Chain-specific configuration is not needed here
//       });
//     } else {
//       gasEstimate = await publicClient.estimateGas({
//         account: address as `0x${string}`,
//         value,
//         //   chain, // Chain-specific configuration
//       });
//     }

//     // Convert gas estimate to native token units (ETH, MATIC, etc.)
//     const formattedGas = formatUnits(
//       gasEstimate,
//       chain.nativeCurrency.decimals
//     );
//     setGasEstimate(`${formattedGas} ${chain.nativeCurrency.symbol}`);
//   } catch (err) {
//     console.error("Gas estimation error:", err);
//     addToast(
//       "error",
//       (err as any).shortMessage ||
//         (err as Error).message ||
//         "Transaction failed"
//     );
//   }
// };
