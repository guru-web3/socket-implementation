/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DefaultAssetsInfo } from "@/app/constants/TokenDirectory/TokenTemporyDB";

import { AssetsInfoState } from "@/app/controllers/assetsController/interfaces";
import { AssetInfo } from "@/app/constants/asset.interface";

interface AssetsInfoStore {
  state: AssetsInfoState;
  setState: (v: AssetsInfoState) => void;
}

const defaultShownAssets: `${string}.0x${string}`[] = DefaultAssetsInfo.map(
  (asset) => asset.assetId,
);
const useAssetsInfoStore = create<AssetsInfoStore>()(
  persist(
    (set) => ({
      state: {
        allAssets: DefaultAssetsInfo,
        customAssets: {} as Record<string, AssetInfo>,
        shownAssets: defaultShownAssets,
        nonZeroBalanceAssets: [] as `${string}.0x${string}`[],
      },
      setState: (v: AssetsInfoState) => set({ state: v }),
    }),
    {
      name: "assetsInfo-storage",
      skipHydration: true,
    },
  ),
);

export default useAssetsInfoStore;
