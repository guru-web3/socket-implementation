// services/api/tokenLists.ts
export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  balance: number;
  tokenImage?: React.JSX.Element;
}

export interface UserBalance extends Token {
  amount: number;
  chainAgnosticId: number;
  chainId: number;
}

export interface QuoteToken extends Token {
  amount: number;
  chainAgnosticId: number;
  chainId: number;
  priceInUsd: number;
}

export interface TokenListResponse {
  result: Token[];
}

export interface UserBalanceResponse {
  result: UserBalance[];
}

export interface TokenListParams {
  fromChainId: number;
  toChainId: number;
  isShortList?: boolean;
}

export interface UserBalanceParams {
  userAddress: string;
  isShortList?: boolean;
}

export interface Chain {
  chainId: number;
  name: string;
  icon: string;
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface ChainsResponse {
  result: Chain[];
}

export interface QuoteParams {
  fromChainId: number;
  toChainId: number;
  fromTokenAddress: string;
  toTokenAddress: string;
  fromAmount: bigint;
  userAddress: string;
  singleTxOnly?: boolean;
  bridgeWithGas?: boolean;
  sort?: "output" | "time";
  defaultSwapSlippage?: number;
  isContractCall?: boolean;
  showAutoRoutes?: boolean;
}

export interface Asset {
  chainId: number;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  icon: string;
}

export interface Step {
  type: string;
  protocol: {
    name: string;
    displayName: string;
    icon: string;
    securityScore?: number;
    robustnessScore?: number;
  };
  fromChainId: number;
  fromAsset: Asset;
  fromAmount: string;
  toChainId: number;
  toAsset: Asset;
  toAmount: string;
}

export interface UserTx {
  userTxType: string;
  txType: string;
  chainId: number;
  toAmount: string;
  toAsset: Asset;
  steps: Step[];
}

export interface Route {
  routeId: string;
  serviceTime: number;
  fromAmount: string;
  toAmount: string;
  outputValueInUsd: number;
  totalGasFeesInUsd: number;
  usedBridgeNames?: string[];
  userTxs?: UserTx[];
}

export interface QuoteResponse {
  success: boolean;
  result?: {
    routes?: Route[];
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    [key: string]: any; // Handle additional fields
  };
}

export interface StartRouteParams {
  fromChainId: number;
  toChainId: number;
  fromAssetAddress: string;
  toAssetAddress: string;
  userAddress: string;
  routeId?: string; // Optional for restarting a route
  [key: string]: any; // Allow additional fields if needed
}

export interface StartRouteResponse {
  success: boolean;
  routeId?: string;
  message?: string;
  [key: string]: any; // Handle additional fields in the response
}

export interface PrepareNextTxParams {
  activeRouteId: string;
  userTxIndex: number;
  txHash: string;
}

export interface PrepareNextTxResponse {
  success: boolean;
  proceed: boolean;
  message?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  [key: string]: any; // Handle additional fields in the response
}
