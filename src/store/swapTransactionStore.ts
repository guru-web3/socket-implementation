import { QuoteToken, Route } from "@/app/services/api/socket.interface";
import { create } from "zustand";

interface SwapTransactionStore {
    fromAmount: number | undefined,
    toAmount: number | undefined,
    setFromAmount: (amount: number) => void,
    setToAmount: (amount: number) => void,
    // quote api result 
    routes: Route[] | null,
    setRoutes: (routes: Route[]) => void,
    selectedRoute: Route | null,
    setSelectedRoute: (route: Route) => void,
    fromTokenQuote: QuoteToken | null,
    setFromTokenQuote: (token: QuoteToken) => void,
    toTokenQuote: QuoteToken | null,
    setToTokenQuote: (token: QuoteToken) => void,
}

const useSwapTransactionStore = create<SwapTransactionStore>()(
(set) => ({
    fromAmount: undefined,
    toAmount: undefined,
    routes: null,
    selectedRoute: null,
    fromTokenQuote: null,
    toTokenQuote: null,
    setFromAmount: (amount: number) => set({ fromAmount: amount }),
    setToAmount: (amount: number) => set({ toAmount: amount }),
    // quote api result 
    setRoutes: (routes: Route[]) => set({ routes: routes }),
    setSelectedRoute: (route: Route) => set({ selectedRoute: route }),
    setFromTokenQuote: (token: QuoteToken) => set({ fromTokenQuote: token }),
    setToTokenQuote: (token: QuoteToken) => set({ toTokenQuote: token }),
}));

export default useSwapTransactionStore;
