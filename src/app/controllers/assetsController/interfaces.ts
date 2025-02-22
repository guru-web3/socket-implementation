import { AssetInfo, AssetIdType } from "@/app/constants/asset.interface";
import { BaseState } from "../base";

export interface AssestInfoConfig {}

export interface AssetsInfoState extends BaseState {
  // allAssets: Record<string, AssetInfo>;
  allAssets: AssetInfo[];
  shownAssets: AssetIdType[];
  nonZeroBalanceAssets: AssetIdType[];
  customAssets: Record<string, AssetInfo>;
}
