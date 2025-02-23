import { Token, UserBalance, Chain, QuoteParams } from "@/app/services/api/socket.interface";
import {
  getFromTokenList,
  getToTokenList,
  getSupportedChains,
  getUserBalances,
} from "@/app/services/api/socket";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

export type TokenType = "from" | "to" | null;

interface SwapStoreState {
  supportedChains: Chain[];
  fromTokens: Token[];
  toTokens: Token[];
  userBalance: UserBalance[] | null;
  selectedFromChain: Chain | null;
  selectedToChain: Chain | null;
  selectedFromToken: Token | null;
  selectedToToken: Token | null;
  selectedTokenType: TokenType;

  setSelectedTokenType: (type: TokenType) => void;
  setSelectedToChain: (chain: Chain) => void;
  setSelectedFromChain: (chain: Chain) => void;
  setSelectedFromToken: (token: Token) => void;
  setSelectedToToken: (token: Token) => void;
  // Actions
  fetchSupportedChains: () => Promise<void>;
  fetchUserBalances: (address: string) => Promise<void>;
}

const useSwapStore = create<SwapStoreState>()(
  persist(
    (set, get) => ({
      supportedChains: [],
      fromTokens: [],
      toTokens: [],
      userBalance: null,
      selectedFromChain: null,
      selectedToChain: null,
      selectedFromToken: null,
      selectedToToken: null,
      fetchingQuote: false,
      selectedTokenType: null, 
      setSelectedTokenType: (tokenType: TokenType) => {
        set({selectedTokenType: tokenType})
      },

      setSelectedFromToken: (token: Token) => {
        set({selectedFromToken: token})
      },
      setSelectedToToken: (token: Token) => {
        set({selectedToToken: token})
      },
      // Fetch supported chains
      fetchSupportedChains: async () => {
        try {
          const response = await getSupportedChains();
          set({ supportedChains: response.result });
        } catch (error) {
          console.error("Error fetching supported chains:", error);
        }
      },
      setSelectedToChain: async (chain: Chain) => {
        set({ selectedToChain: chain });
        const { selectedFromChain, selectedToChain, userBalance, fromTokens , setSelectedFromChain} = get();
        if (selectedFromChain && selectedToChain) {
          const result = await getToTokenList({
            toChainId: selectedToChain.chainId,
            fromChainId: selectedFromChain.chainId,
          });
          const updatedTokens = result.result.map((token) => {
            const balance =
              userBalance?.find((balance) => balance.address === token.address)
                ?.amount || 0;
            return { ...token, balance };
          });
          const sortedTokens = updatedTokens.sort(
            (a, b) => (b.balance || 0) - (a.balance || 0)
          );
          if (sortedTokens) set({toTokens: sortedTokens});
          if(!fromTokens.length) await setSelectedFromChain(selectedFromChain)
        }
      },
      setSelectedFromChain: async (chain: Chain) => {
        set({ selectedFromChain: chain });
        const { selectedFromChain, selectedToChain, userBalance } = get();
        if (selectedFromChain && selectedToChain) {
          const result = await getFromTokenList({
            toChainId: selectedToChain.chainId,
            fromChainId: selectedFromChain.chainId,
          });
          const updatedTokens = result.result.map((token) => {
            const balance =
              userBalance?.find((balance) => balance.address === token.address)
                ?.amount || 0;
            return { ...token, balance };
          });
          const sortedTokens = updatedTokens.sort(
            (a, b) => (b.balance || 0) - (a.balance || 0)
          );
          if (sortedTokens) set({fromTokens: sortedTokens});
  
        }
      },

      // Fetch user balances
      fetchUserBalances: async (address: string) => {
        try {
          const response = await getUserBalances({ userAddress: address });
          set({ userBalance: response.result });
        } catch (error) {
          console.error("Error fetching user balances:", error);
        }
      },

      // Fetch quote
      fetchQuote: async (params: QuoteParams) => {
        try {
          // Add your fetch quote logic here
          console.log("Fetching quote with params:", params);
          // Example: const response = await getQuote(params);
          // set({ quote: response.result });
        } catch (error) {
          console.error("Error fetching quote:", error);
        }
      },

    }),
    {
      name: "swap-storage",
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      skipHydration: true,
    },
  )
);

export default useSwapStore;
