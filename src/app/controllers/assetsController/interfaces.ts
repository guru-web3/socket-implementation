import { AssetInfo, AssetIdType } from "@/app/constants/asset.interface";
import { BaseConfig, BaseState } from "../base";

export interface AssetsInfoState extends BaseState {
  allAssets: AssetInfo[];
  shownAssets: AssetIdType[];
  nonZeroBalanceAssets: AssetIdType[];
  customAssets: Record<string, AssetInfo>;
}

export interface Transaction {
  timeStamp: number;
  tokenSymbol?: string;
  tokenID?: string;
  type?: string;
  timestamp?: Date;
}

export interface AssestInfoConfig extends BaseConfig {
  interval: number;
}
