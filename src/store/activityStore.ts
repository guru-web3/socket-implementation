// stores/transactionStore.ts
import { create } from "zustand";
import { WETH_SEPOLIA_CONTRACT } from "@/app/constants/transaction";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  type: "ETH" | "ERC20" | "NFT";
  status: "pending" | "confirmed" | "failed";
  timestamp: Date;
  tokenSymbol?: string;
  tokenDecimal?: number;
  contractAddress?: string;
}

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  filters: {
    days: number, 
    type: string,
  };
  setFilters: (
    days: number, 
    type: string,
  ) => Promise<void>;
  fetchTransactions: (
    address: string, 
    chainId: number,
    days: string,
    typ: string,
  ) => Promise<void>;

  isPosting: boolean;
  postTransactionError: string | null;
  postTransaction: (
    wrapType: "wrap" | "unwrap",
    hash: string,
    address: string,
    amount: string,
    unWrapAmount: string
  ) => Promise<void>;
}

const useTransactionStore = create<TransactionState>((set) => ({
  // activity feed
  transactions: [],
  isLoading: false,
  error: null,
  filters: {
    days: 7,
    type: "all",
  },
  setFilters: async (days, type) => {
    set((state) => ({
      filters: {
        ...state.filters,
        days,
        type,
      },
    }));
  },
  fetchTransactions: async (address, chainId, days = "7", type = "all") => {
    set({ isLoading: true, error: null });

    try {
      const params = new URLSearchParams({
        address,
        chainId: chainId.toString(),
        days: days,
        type: type,
      });

      const response = await fetch(`/api/transactions?${params}`);
      if (!response.ok) throw new Error("Failed to fetch transactions");

      const { data } = await response.json();
      set({ transactions: data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },


  //   post transaction from wrap
  isPosting: false,
  postTransactionError: null,
  postTransaction: async (
    wrapType,
    hash,
    address,
    amount,
    unWrapAmount
  ) => {
    set({ isPosting: true, error: null });
    const { sepolia } = await import("wagmi/chains");

    try {
      const url = "/api/transactions";
      const commonData = {
        chainId: sepolia.id,
        from: address,
      };

      const body =
        wrapType === "wrap"
          ? {
              hash: hash,
              type: "WRAP",
              to: WETH_SEPOLIA_CONTRACT,
              value: amount,
              tokenSymbol: "WETH",
              tokenDecimal: 18,
            }
          : {
              hash: hash,
              type: "UNWRAP",
              to: "0x0",
              value: unWrapAmount,
              tokenSymbol: "ETH",
              tokenDecimal: 18,
            };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commonData, ...body }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Transaction post failed");
      }
    } catch (error) {
      set({
        postTransactionError:
          error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    } finally {
      set({ isPosting: false });
    }
  },
}));

export default useTransactionStore;
