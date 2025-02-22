import { useEffect, useState } from "react";
import useAssetsInfoStore from "@/store/assetsInfoControllerStore";
import useBalancesStore from "@/store/balancesControllerStore";
import { useAccount } from "wagmi";

import BigNumber from "bignumber.js";
import AssetsBalanceController from "../controllers/assetBalanceController/assetBalanceController";
import { AssetInfo } from "../constants/asset.interface";
import { convertToDecimals } from "../services/common-utils/bungeeUtils";

export function useAssetsBalances() {
  const { state: assetsState, setState: setAssetsState } = useAssetsInfoStore();
  const { state: balanceState, setState: setBalanceState } = useBalancesStore();

  const [assetBalanceController, setAssetBalanceController] =
    useState<AssetsBalanceController>();

  const initLocalAssetBalanceController = () => {
    const localAssetBalanceController = AssetsBalanceController.getInstance({
      config: {
        assetsInfoConfig: {},
        balanceControllerConfig: {
          interval: 30_000,
        },
      },

      state: {
        assetsInfoState: assetsState,
        balanceControllerState: {
          balancesMap: {},
        },
      },

      setStates: (newState) => {
        if (newState.assetsInfoState) {
          setAssetsState(newState.assetsInfoState);
        }
        if (newState.balanceControllerState) {
          setBalanceState(newState.balanceControllerState);
        }
      },
    });

    localAssetBalanceController.start();

    setAssetBalanceController(localAssetBalanceController);
    return () => {
      localAssetBalanceController.stop();
    };
  };
  useEffect(() => {
    initLocalAssetBalanceController();
  }, [setAssetsState, setBalanceState]);

  useEffect(() => {
    initLocalAssetBalanceController();
  }, []);

  return {
    balanceState,
    assetsState,
    refreshBalance: assetBalanceController?.balanceController.refreshBalances,
    readErc20TokenDetails:
      assetBalanceController?.assetsController.readErc20TokenDetails,
  };
}

export interface TokenCardProps extends AssetInfo {
  name: string;
  crypto: string;
  icon?: string;
  balance?: string;
  isErc20: boolean;
  // display
  chosenQuantity?: number;
  tokenSign?: "+" | "-";
  variant?: "success" | "danger";
  transactionHeading?: string;
  cryptoAmount?: string;
}

// modify assets variable here
export type VisibleAssetsInfo = {
  balance: string;
} & AssetInfo;
export const useVisibleAssets = () => {
  const { balanceState, assetsState, readErc20TokenDetails, refreshBalance } =
    useAssetsBalances();
  const [visibleAssets, setVisibleAssets] = useState<TokenCardProps[]>([]);
  const [nonZeroAssets, setNonZeroAssets] = useState<TokenCardProps[]>([]);
  const { address: deployedAccountAddress } = useAccount();
  const [accountValue, setAccountValue] = useState("--");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      if (
        refreshBalance &&
        deployedAccountAddress &&
        !balanceState.balancesMap[deployedAccountAddress]
      ) {
        const result = await refreshBalance();
        if (result) {
          balanceState.balancesMap = result;
        }
      }
      if (
        assetsState &&
        deployedAccountAddress &&
        balanceState.balancesMap[deployedAccountAddress]
      ) {
        const localVisibleAssets: TokenCardProps[] = [];
        let localAccountValue = new BigNumber(0);

        // for logging
        const assetNotFound: string[] = [];

        assetsState.shownAssets.forEach((assetId) => {
          const asset = assetsState.allAssets.find(
            (asset) => asset.assetId === assetId
          );
          if (
            asset &&
            deployedAccountAddress &&
            balanceState.balancesMap[deployedAccountAddress][assetId]
          ) {
            const balance = convertToDecimals(
              balanceState.balancesMap[deployedAccountAddress][assetId],
              asset.decimals
            );
            if (balance > 0) {
              localVisibleAssets.push({
                ...asset,
                crypto: asset.symbol,
                balance: balance.toString(),
                icon: asset.logoURI,
                isErc20: asset.address != "0x0",
              });
            }
          } else {
            assetNotFound.push(assetId);
          }
        });
        console.warn("asset not found", assetNotFound);

        // custom assets
        Object.values(assetsState.customAssets).forEach((customAsset) => {
          const { assetId } = customAsset;
          if (localVisibleAssets.some((a) => a.assetId === assetId)) {
            return;
          }

          const rawBalance =
            balanceState.balancesMap[deployedAccountAddress][assetId];
          let balance = 0;
          if (rawBalance && !isNaN(Number(rawBalance))) {
            balance = convertToDecimals(rawBalance, customAsset.decimals);
          }

          localVisibleAssets.push({
            ...customAsset,
            crypto: customAsset.symbol,
            balance: balance.toString(),
            icon: customAsset.logoURI,
            isErc20: customAsset.address != "0x0",
          });
        });

        // compare before set state
        setAccountValue(localAccountValue.toString());
        setVisibleAssets(localVisibleAssets);
        setNonZeroAssets(
          localVisibleAssets.filter((asset) => {
            if (asset.balance) {
              return Number(asset.balance) > 0;
            }
            return false;
          })
        );
        setLoading(false);
      }
    };
    init();
  }, [refreshBalance, balanceState, assetsState, deployedAccountAddress]);

  return {
    visibleAssets,
    nonZeroAssets,
    accountValue,
    loading,
    readErc20TokenDetails,
  };
};
