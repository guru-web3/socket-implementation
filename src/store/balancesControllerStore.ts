import { BalancesState } from "@/app/controllers/balanceController/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BalancesStore {
  state: BalancesState;
  setState: (v: BalancesState) => void;
}

const useBalancesStore = create<BalancesStore>()(
  persist(
    (set) => ({
      state: {
        balancesMap: {},
      },
      setState: (v: BalancesState) => {
        set({ state: v });
      },
    }),
    {
      name: "balances-storage",
      skipHydration: true,
    },
  ),
);
export default useBalancesStore;
