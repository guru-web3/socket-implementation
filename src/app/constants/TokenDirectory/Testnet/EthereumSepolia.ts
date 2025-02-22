import { AssetInfo } from "@/app/constants/asset.interface";
export const EthereumSepolia = "ethereum-sepolia";

export const sepoliaTokens: AssetInfo[] = [
  {
    assetId: `${EthereumSepolia}.0x0`,
    network: EthereumSepolia,
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 11155111,
    address: "0x0",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    logoURI: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    extensions: {},
    testnet: true,
  },
  {
    assetId: `${EthereumSepolia}.0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`,
    network: EthereumSepolia,
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 11155111,
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    extensions: {},
    testnet: true,
  },
  {
    assetId: `${EthereumSepolia}.0x3870419Ba2BBf0127060bCB37f69A1b1C090992B`,
    network: EthereumSepolia,
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/eth.svg`,
    chainId: 11155111,
    address: "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B",
    name: "Stackup 6 Decimal Test Token ",
    symbol: "TEST",
    decimals: 6,
    // logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=032",
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    extensions: {},
    testnet: true,
  },
];
