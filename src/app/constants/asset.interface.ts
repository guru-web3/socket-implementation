export type TokenImage = {
  imageUrl: string;
  isSelected: boolean;
};

export type TokenDetails = {
  symbol: string;
  balance: string;
};

export type AssetIdType = `${string}.0x${string}`;

export type AssetInfo = {
  assetId: AssetIdType;
  symbol: string;
  address: string;
  name: string;
  decimals: number;
  chainId: number;
  network: string;
  networkImage: string;
  logoURI?: string;
  extensions?: Record<string, string | number>;
  testnet?: boolean;
};

export type TAssetInfoWithBalance = AssetInfo & { balance?: string };

export type ApiResponse<T> = {
  success: boolean;
  error?: string;
  data?: T;
};

export type ChainInfo = {
  id: string;
  name: string;
  network: string;
  chainId: number;
  rpc: string;
  networkImage: string;
  // for sdk's rpc call
  publicRpc: string;
  symbol: string;
  decimals: number;

  defaultAssetInfoList: AssetInfo[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  walletCapabilities: Record<string, any>;
};

export type RawToken = {
  type: string;
  tokenId: string;
  value?: string;
  tokenSymbol?: string;
  tokenValue?: string;
  tokenDecimal?: string;
};
