import { AssetIdType, AssetInfo } from "@/app/constants/asset.interface";
import { arbitrumTokens } from "./Arbitrum";
import { ethereumTokens } from "./Ethereum";
import { polygonTokens } from "./Polygon";
import {
  ArbitrumSepolia,
  arbitrumSepoliaTokens,
} from "./Testnet/ArbitrumSepolia";
import { EthereumSepolia, sepoliaTokens } from "./Testnet/EthereumSepolia";
import { PolygonAmoy, amoyTokens } from "./Testnet/PolygonAmoy";

export const DefaultShownAssets: AssetIdType[] = [
  "ethereum.0x0",
  "ethereum.0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  "arbitrum.0x0",
  "arbitrum.0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  "optimism.0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  "optimism.0x0",
  "polygon.0x0",
  "polygon.0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
];

export const DefaultAssetsInfo: AssetInfo[] = [
  ...arbitrumTokens,
  ...ethereumTokens,
  ...polygonTokens,

  // Testnet
  ...sepoliaTokens,
  ...amoyTokens,
  ...arbitrumSepoliaTokens,
];

export const TestnetMainnetMap: Record<string, string> = {
  [EthereumSepolia]: "ethereum",
  [PolygonAmoy]: "polygon",
  [ArbitrumSepolia]: "arbitrum",
  // optimismSepolia: "optimism",
  // baseSepolia: "base",
};

export const CustomAssetsInfo: AssetInfo[] = [
  // ethereum
  {
    assetId: "ethereum.0x0",
    symbol: "ETH",
    address: "0x0",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    name: "ethereum",
    decimals: 18,
    chainId: 0,
    network: "ethereum",
  },
  {
    assetId: "ethereum.0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    name: "usdc",
    decimals: 18,
    chainId: 0,
    network: "ethereum",
  },

  // base
  {
    assetId: "ethereum.0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    symbol: "USDC",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    name: "usdc",
    decimals: 18,
    chainId: 8453, //0x2105
    network: "base",
  },
];
