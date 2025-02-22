import { AssetInfo } from "@/app/constants/asset.interface";

export const PolygonAmoy = "polygon-amoy";
export const amoyTokens: AssetInfo[] = [
  {
    assetId: `${PolygonAmoy}.0x0`,
    network: PolygonAmoy,
    chainId: 80002,
    address: "0x0",
    name: "MATIC",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/polygon.svg`,
    symbol: "MATIC",
    decimals: 18,
    logoURI: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/polygon.svg`,
    extensions: {},
    testnet: true,
  },
  {
    assetId: `${PolygonAmoy}.0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582`,
    network: PolygonAmoy,
    chainId: 80002,
    address: "0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582",
    networkImage: `${process.env.NEXT_PUBLIC_S3_ASSETS}/icons/polygon.svg`,
    name: "USDC",
    symbol: "USDC",
    decimals: 6,
    // logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=032",
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    extensions: {},
    testnet: true,
  },
];
