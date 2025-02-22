import { AccountAssetsInfo } from "../assetsController/assetsController";
import { BaseConfig, BaseState } from "../base";

export interface IAccountPreferenceAPI {
  getAccounts(): string[];
  getSupportedNetworks(): string[];
}
export interface IAssetInfoAPI {
  getAssetsIdsForBalanceQuery(): string[];
}

export interface IBalancesControllerOptions {
  config?: Partial<BalancesConfig>;
  state?: Partial<BalancesState>;
  assetInfoAPI: IAssetInfoAPI;
  accountPreferenceAPI: IAccountPreferenceAPI;
}
export interface BalancesConfig extends BaseConfig {
  interval: number;
}

type Address = string;
type Network = string;
type TokenBalance = Record<Address, string>;

export type BalanceApiReturnType = Record<
  Network,
  Record<Address, TokenBalance>
>;

export interface BalancesState extends BaseState {
  balancesMap: Record<Address, TokenBalance>;
}
