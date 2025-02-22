"use-client";

import { idleTimeTracker } from "@/app/services/common-utils/chainUtils";
import { BaseController } from "../base";
import {
  BalanceApiReturnType,
  BalancesConfig,
  BalancesState,
  IAccountPreferenceAPI,
  IAssetInfoAPI,
  IBalancesControllerOptions,
} from "./interfaces";
import { DefaultAssetsInfo } from "@/app/constants/TokenDirectory/TokenTemporyDB";
import { HttpClient } from "@/app/services/http/httpClient";
import useUserStore from "@/store/userStore";

export default class BalancesController extends BaseController<
  BalancesConfig,
  BalancesState
> {
  name = "BalancesController";

  assetInfoApi: IAssetInfoAPI;

  accountPreferenceAPI: IAccountPreferenceAPI;

  private _timer: number | undefined;

  constructor({
    config,
    state,
    assetInfoAPI,
    accountPreferenceAPI,
  }: IBalancesControllerOptions) {
    super({ config, state });
    this.defaultConfig = {
      interval: 30_000,
    };

    this.defaultState = {
      balancesMap: {},
    };

    this.assetInfoApi = assetInfoAPI;
    this.accountPreferenceAPI = accountPreferenceAPI;

    // Initialize.
    this.initialize();
  }

  // setInterval to update balances
  updateState(newState: Partial<BalancesState>) {
    this.update({
      ...this.state,
      ...newState,
    });
  }

  async refreshBalances() {
    // get shownAssets and nonZeroBalanceAssets from controller
    let assets: string[] = [];
    try {
      assets = this.assetInfoApi?.getAssetsIdsForBalanceQuery();
    } catch (e) {
      console.error("Error getting assets for balance query", e);
    }
    const defaultShownAssets: `${string}.0x${string}`[] = DefaultAssetsInfo.map(
      (asset) => asset.assetId,
    );
    const finalAssets = assets.length ? assets : defaultShownAssets;
    // const accounts = this.accountPreferenceAPI.getAccounts();
    const accounts = [useUserStore.getState().address];
    if (!accounts.length || !finalAssets.length) {
      return;
    }

    const body = {
      address: accounts,
      tokenContracts: finalAssets,
    };

    // get all balances from server
    const response = await HttpClient<{
      data: BalanceApiReturnType;
    }>("/api/balance", {
        method: "POST",
        body: body,
      });

    // check if balances changes
    // emit balance changed

    // data in the formant [network][address][network.token] = balance
    // convert to format [address][network.token] = balance
    const balancesMap: Record<string, Record<string, string>> = {};
    Object.values(response.data).forEach((accountsBalance) => {
      accounts.forEach((account) => {
        if (balancesMap[account] === undefined) {
          balancesMap[account] = {};
        }
        balancesMap[account] = {
          ...balancesMap[account],
          ...accountsBalance[account],
        };
      });
    });
    if (!assets.length) {
      return balancesMap;
    }
    // update state
    this.updateState({
      balancesMap: balancesMap,
    });

    this.interval = this.config.interval;
  }

  getBalances() {
    return this.state.balancesMap;
  }

  get interval(): number {
    return this.config.interval;
  }

  set interval(interval: number) {
    if (this._timer) window.clearInterval(this._timer);
    if (!interval) {
      return;
    }
    this._timer = window.setInterval(() => {
      if (!idleTimeTracker.checkIfIdle()) {
        this.refreshBalances();
      }
    }, interval);
  }
}
