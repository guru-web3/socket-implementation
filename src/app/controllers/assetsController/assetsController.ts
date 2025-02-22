
import { BaseController } from "../base";
import { AssestInfoConfig, AssetsInfoState } from "./interfaces";

import { TokenHandler } from "../token/tokenERC20Handler";
import { chainIdToNetworkKey, getNetworkImageUrl } from "@/app/services/common-utils/chainUtils";
import { AssetInfo, AssetIdType, TAssetInfoWithBalance } from "@/app/constants/asset.interface";

export interface AccountAssetsInfo {
  customAssets: { [key: string]: AssetInfo };
  shownAssets: AssetIdType[];
}

export interface IAccountPreferenceAPI {
  getAccounts(): string[];
  getAccountAssetInfo(): AccountAssetsInfo;
}

interface IAssetsInfoControllerOptions {
  config?: Partial<AssestInfoConfig>;
  state?: Partial<AssetsInfoState>;
  accountPreferenceAPI: IAccountPreferenceAPI;
}

export default class AssetsInfoController extends BaseController<
  AssestInfoConfig,
  AssetsInfoState
> {
  name = "AssetsInfoController";
  accountPreferenceAPI: IAccountPreferenceAPI;
  private baseApi: string;

  constructor({
    config,
    state,
    accountPreferenceAPI,
  }: IAssetsInfoControllerOptions) {
    super({ config, state });
    this.defaultConfig = {
      interval: 30_000,
    };

    this.defaultState = {
      ...{
        allAssets: [],
        shownAssets: [],
        nonZeroBalanceAssets: [],
        customAssets: {},
      },
      ...state,
    };

    this.accountPreferenceAPI = accountPreferenceAPI;

    this.baseApi = `/api`;

    // Initialize.
    this.initialize();
    this.postInitialize();

    this.readErc20TokenDetails = this.readErc20TokenDetails.bind(this);
  }

  async postInitialize() {
    // done via zustand initalize
    // this.updateDefaultAssetsInfo();
    const preferenceInfo = this.accountPreferenceAPI.getAccountAssetInfo();
    const mergedAssetsInfo = preferenceInfo;

    // use default shown assets if no user saved shown assets
    if (mergedAssetsInfo.shownAssets.length === 0) {
      mergedAssetsInfo.shownAssets = [
        ...this.state.shownAssets,
        ...(Object.keys(
          mergedAssetsInfo.customAssets,
        ) as `${string}.0x${string}`[]),
      ];
    }

    this.updateState({
      allAssets: [
        ...this.state.allAssets,
        ...Object.values(mergedAssetsInfo.customAssets),
      ],
      ...mergedAssetsInfo,
    });

    (this as any).emit("postInitialized");
  }

  updateState(newState: Partial<AssetsInfoState>) {
    this.update({
      ...this.state,
      ...newState,
    });
  }

  unhideAssets(asset_id: AssetIdType) {
    const newAssetsState = this.state.shownAssets.concat(asset_id);
    this.updateState({
      shownAssets: newAssetsState,
    });
  }

  hideAssets(asset_id: AssetIdType) {
    const newAssetsState = this.state.shownAssets.filter(
      (asset) => asset !== asset_id,
    );
    this.updateState({
      shownAssets: newAssetsState,
    });
  }


  async readErc20TokenDetails(
    chainId: number,
    tokenAddress: AssetIdType,
  ): Promise<TAssetInfoWithBalance> {
    try {
      const accounts = this.accountPreferenceAPI.getAccounts();
      if (accounts.length > 0 && !accounts[0]) {
        throw new Error("Account address not found!");
      }
      const tokenInfoHandler = new TokenHandler({
        address: tokenAddress,
        chainId,
      });

      const [symbolResult, nameResult, decimalsResult, balanceResult] =
        await Promise.allSettled([
          tokenInfoHandler.getSymbol(),
          tokenInfoHandler.getName(),
          tokenInfoHandler.getDecimals(),
          tokenInfoHandler.getUserBalance(accounts[0] as AssetIdType),
        ]);

      const networkKey = chainIdToNetworkKey(chainId);

      const assetInfo: TAssetInfoWithBalance = {
        assetId: `${networkKey}.${tokenAddress}`,
        network: networkKey,
        networkImage: getNetworkImageUrl(chainId),
        symbol: symbolResult.status === "fulfilled" ? symbolResult.value : "",
        name: nameResult.status === "fulfilled" ? nameResult.value : "",
        decimals:
          decimalsResult.status === "fulfilled" ? decimalsResult.value : 0,
        balance:
          balanceResult.status === "fulfilled" ? balanceResult.value : "0",
        address: tokenAddress,
        chainId,
      };
      return assetInfo;
    } catch (e: unknown) {
      console.error("error reading ERC-20 token details", e);
      throw e;
    }
  }
  addNonZeroBalanceAssets(asset_id: AssetIdType) {
    const newAssetsState = this.state.nonZeroBalanceAssets.concat(asset_id);
    this.updateState({
      nonZeroBalanceAssets: newAssetsState,
    });
  }

  getAssetsIdsForBalanceQuery() {
    return Array.from(
      new Set(this.state.shownAssets.concat(this.state.nonZeroBalanceAssets)),
    );
  }

}
