"use client";
import React, { useEffect } from "react";
import { formatEther, formatUnits } from "viem";
import dynamic from "next/dynamic";
import { EChain, BLOCK_EXPLORER_URL } from "@/app/services/common-utils/chainUtils";
import useTransactionStore from "@/store/activityStore";
import { Loader } from "../molecules/Loader";
import ComponentLoader from "../atoms/ComponentLoader";
import { useAccount } from "wagmi";

const Dropdown = dynamic(() => import('../atoms/DropDown'), {
  ssr: true,
  loading: () => <ComponentLoader loaderClass="h-[42px] mb-4" />,
})

const ActivityFeed = () => {

  const { fetchTransactions, isLoading, transactions, error, filters, setFilters } = useTransactionStore();

    const { address, chain } = useAccount();
  
  const DAYS_FILTER_OPTIONS = [
    { value: "7", name: "Last 7 days" },
    { value: "30", name: "Last 30 days" },
    { value: "90", name: "Last 90 days" },
  ];

  const TYPE_FILTER_OPTIONS = [
    { value: "all", name: "All Transactions" },
    { value: "ETH", name: "ETH Transfers" },
    { value: "ERC20", name: "Token Transfers" },
    { value: "NFT", name: "NFT Transfers" },
  ];

  const changeFilter = (value: string) => {
      setFilters(Number(value), filters?.type || "all")
  }

  const changeFilterType = (type: string) => {
      setFilters(filters?.days, type)
  }

  const fetchExplorerActivity = async () => {
    await fetchTransactions(address!, chain?.id || EChain.ETH_SEPOLIA, filters?.days.toString() || "7", filters?.type || "all");
  };

  useEffect(() => {
    fetchExplorerActivity();
  }, [filters]);


  useEffect(() => {
    const interval = setInterval(fetchExplorerActivity, 15000);
    return () => clearInterval(interval);
  }, []);

  const TransactionTypeIcon = ({ type }: { type: string }) => {
    const icons = {
      ETH: "Ξ",
      ERC20: "🪙",
      ERC721: "🖼️",
      NFT: "🖼️",
      default: "🌐",
    };

    return (
      <span className="text-2xl">
        {icons[type as keyof typeof icons] || icons.default}
      </span>
    );
  };

  const formatValue = (tx: any) => {
    if (tx.type === "ETH") {
      return `${formatEther(BigInt(tx.value || 0))} ETH`;
    }

    if (tx.type === "ERC20" && tx.tokenSymbol) {
      return `${formatUnits(
        BigInt(tx.tokenValue || 0),
        Number(tx.tokenDecimal || 18)
      )} ${tx.tokenSymbol}`;
    }
    // if (tx.type === "NFT") {
    //   return `NFT ${tx.tokenId ? `#${tx.tokenId}` : "Transfer"}`;
    // }
    return "Token Transfer";
  };

  const getTransactionTitle = (tx: any) => {
    const base = `${tx.type} Transfer`;
    if (tx.type === "ERC20" && tx.tokenSymbol)
      return `${tx.tokenSymbol} Transfer`;
    if (tx.type === "NFT") return "NFT Transfer";
    return base;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh] py-8">
        <Loader size="md" className="w-8 h-8 " />
      </div>
    );
  }

  return (
    <div className="bg-[#171721] relative mx-auto mt-12 w-full max-w-4xl rounded-xl border border-neutral-800 p-6 shadow-card">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-xl font-semibold text-socket-primary sm:text-2xl"
          aria-label="Transaction History"
        >
          Transaction History
        </h2>

        {/* Filters */}
        <div className="flex gap-4">
          <Dropdown
            options={DAYS_FILTER_OPTIONS}
            inputSize="md"
            defaultValue={filters?.days.toString()}
            classes={{
              container: "w-36",
              inputContainer: "p-3 bg-[#1c1c28] border border-neutral-800",
              input: "text-app-gray-50",
              arrow: "text-app-gray-400",
            }}
            onChange={changeFilter}
          />

          <Dropdown
            options={TYPE_FILTER_OPTIONS}
            inputSize="md"
            defaultValue={filters?.type}
            classes={{
              container: "w-44",
              inputContainer: "p-3 bg-[#1c1c28] border border-neutral-800",
              input: "text-app-gray-50",
              arrow: "text-app-gray-400",
            }}
            onChange={changeFilterType}
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.hash}
            className="bg-[#1c1c28] p-4 border border-neutral-800 rounded-lg hover:bg-[#252534] transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <TransactionTypeIcon type={tx.type} />
                <div>
                  <h3 className="font-medium text-app-gray-50">
                    {getTransactionTitle(tx)}
                  </h3>
                  <p className="text-sm text-app-gray-300">
                    {new Date(tx.timestamp).toLocaleDateString()} •{" "}
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <span
                aria-label={tx.status}
                className={`px-3 py-1 rounded-full text-sm ${
                  tx.status === "failed"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {tx.status === "failed" ? "Failed" : "Confirmed"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <p className="text-app-gray-300 mb-1" aria-label="from">
                  From
                </p>
                <p className="text-app-gray-50 truncate" aria-label={tx.from}>
                  {tx.from}
                </p>
              </div>
              <div>
                <p className="text-app-gray-300 mb-1" aria-label="to">
                  To
                </p>
                <p className="text-app-gray-50 truncate" aria-label={tx.to}>
                  {tx.to}
                </p>
              </div>
              <div>
                <p className="text-app-gray-300 mb-1" aria-label="value">
                  Value
                </p>
                <p className="text-app-gray-50">
                  {formatValue(tx)}
                  {tx.type === "NFT" && (
                    <span className="block text-xs text-app-gray-400 mt-1">
                      Contract: {tx.contractAddress?.slice(0, 6)}...
                      {tx.contractAddress?.slice(-4)}
                    </span>
                  )}
                </p>
              </div>
            </div>

            <a
              aria-label="View transactions Explorer"
              href={`${BLOCK_EXPLORER_URL[chain?.id as EChain || EChain.ETH_SEPOLIA]}/tx/${tx.hash}`}
              target="_blank"
              className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm transition-colors"
            >
              View on Explorer
              <svg
                className="ml-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        ))}

        {!isLoading && transactions.length === 0 && (
          <div
            className="text-center py-8 text-app-gray-400"
            aria-label="No transactions Found Explorer"
          >
            No transactions found
          </div>
        )}
        
        {error && (
          <div
            className="text-center py-8 text-app-gray-400"
            aria-label="Error Fetching Transaction from Explorer"
          >
            Error Fetching Transaction
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
