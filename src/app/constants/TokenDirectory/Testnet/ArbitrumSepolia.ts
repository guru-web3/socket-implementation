import { AssetInfo } from "@/app/constants/asset.interface";

export const ArbitrumSepolia = "arbitrum-sepolia";
export const arbitrumSepoliaTokens: AssetInfo[] = [
  {
    assetId: `${ArbitrumSepolia}.0x0`,
    network: ArbitrumSepolia,
    chainId: 421614,
    address: "0x0",
    name: "Ethereum",
    networkImage: "https://assets.web3pay.io/images/arbitrum-dark.svg",
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.web3pay.io/images/arbitrum-dark.svg",
    extensions: {},
    testnet: true,
  },
  {
    assetId: `${ArbitrumSepolia}.0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`,
    network: ArbitrumSepolia,
    chainId: 421614,
    address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
    networkImage: "https://assets.web3pay.io/images/arbitrum-dark.svg",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    extensions: {},
    testnet: true,
  },
  {
    assetId: `${ArbitrumSepolia}.0xb1D4538B4571d411F07960EF2838Ce337FE1E80E`,
    network: ArbitrumSepolia,
    chainId: 421614,
    address: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
    networkImage: "https://assets.web3pay.io/images/arbitrum-dark.svg",
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    extensions: {},
    testnet: true,
  },
];
