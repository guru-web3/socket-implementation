import { getQuote } from "@/app/services/api/socket";
import {
  QuoteParams,
  QuoteToken,
  Route,
} from "@/app/services/api/socket.interface";
import { create } from "zustand";

interface SwapTransactionStore {
  fromAmount: number | undefined;
  fetchingQuote: boolean;
  isRefuelEnabled: boolean;
  toAmount: number | undefined;
  setFromAmount: (amount: number) => void;
  setToAmount: (amount: number) => void;

  // quote api result
  routes: Route[] | null;
  setRoutes: (routes: Route[]) => void;
  selectedRoute: Route | null;
  setSelectedRoute: (route: Route) => void;
  fromTokenQuote: QuoteToken | null;
  setFromTokenQuote: (token: QuoteToken) => void;
  toTokenQuote: QuoteToken | null;
  setToTokenQuote: (token: QuoteToken) => void;
  setFetchingQuote: (isFetching: boolean) => void;
  setIsRefuelEnabled: (isRefuelEnabled: boolean) => void;
  fetchQuote: (params: QuoteParams) => Promise<void>;
}

const useSwapTransactionStore = create<SwapTransactionStore>()((set) => ({
  fromAmount: undefined,
  toAmount: undefined,
  routes: null,
  selectedRoute: null,
  fromTokenQuote: null,
  toTokenQuote: null,
  fetchingQuote: false,
  isRefuelEnabled: false,

  setFromAmount: (amount: number) => {
    set({ fromAmount: amount });
  },
  setFetchingQuote: (isFetching: boolean) => {
    set({ fetchingQuote: isFetching });
    set({ selectedRoute: null });
  },
  setIsRefuelEnabled: (isRefuelEnabled: boolean) =>
    set({ isRefuelEnabled: isRefuelEnabled }),

  setToAmount: (amount: number) => set({ toAmount: amount }),
  // quote api result
  setRoutes: (routes: Route[]) => set({ routes: routes }),
  setSelectedRoute: (route: Route) => set({ selectedRoute: route }),
  setFromTokenQuote: (token: QuoteToken) => set({ fromTokenQuote: token }),
  setToTokenQuote: (token: QuoteToken) => set({ toTokenQuote: token }),
  // Fetch a quote
  fetchQuote: async (params: QuoteParams) => {
    set({ fetchingQuote: true });
    try {
      const response = await getQuote(params);
      set({ routes: response.result?.routes || [] });
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      set({ fetchingQuote: false });
    }
  },
}));

export default useSwapTransactionStore;
