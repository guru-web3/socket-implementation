import { AssetIdType } from "@/app/constants/asset.interface";

export interface IERC20TokenCommonProps {
  symbol: string;
  name: string;
  decimals: number;
  balance: string;
}

export interface IImportedTokenDetails extends IERC20TokenCommonProps {
  address: AssetIdType;
  chainId: number;
}
