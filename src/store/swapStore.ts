import { Token, UserBalance, Chain } from "@/app/services/api/socket.interface";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SwapStore {
  supportedChains: Chain[];
  fromTokens: Token[];
  toTokens: Token[];
  userBalance: UserBalance[] | null;
  selectedFromChain: Chain | null;
  selectedToChain: Chain | null;
  selectedFromToken: Token | null;
  selectedToToken: Token | null;
  selectedTokenType: "from" | "to" | undefined;
  setSupportedChains: (chains: Chain[]) => void;
  setFromTokens: (tokens: Token[]) => void;
  setToTokens: (tokens: Token[]) => void;
  setSelectedFromChain: (chain: Chain) => void;
  setSelectedToChain: (chain: Chain) => void;
  setSelectedFromToken: (token: Token) => void;
  setSelectedToToken: (token: Token) => void;
  setSelectedTokenType: (tokenType: "from" | "to" | undefined) => void;
  setUserBalance: (userBalance: UserBalance[]) => void;
}

const useSwapStore = create<SwapStore>()(
  persist(
    (set) => ({
    supportedChains: [],
    fromTokens: [],
    toTokens: [],
    selectedFromChain: null,
    selectedToChain: null,
    selectedFromToken: null,
    selectedToToken: null,
    userBalance: null,
    selectedTokenType: undefined,
    setSelectedTokenType: (tokenType) => set({ selectedTokenType: tokenType }),
    setSupportedChains: (chains) => set({ supportedChains: chains }),
    setFromTokens: (tokens) => set({ fromTokens: tokens }),
    setToTokens: (tokens) => set({ toTokens: tokens }),
    setSelectedFromChain: (chain) => set({ selectedFromChain: chain }),
    setSelectedToChain: (chain) => set({ selectedToChain: chain }),
    setSelectedFromToken: (token) => set({ selectedFromToken: token }),
    setSelectedToToken: (token) => set({ selectedToToken: token }),
    setUserBalance: (userBalance) => set({ userBalance: userBalance }),
  }), 
  {
    name: "swap-storage",
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    skipHydration: true,
  },
));

export default useSwapStore;
