// "use client";
// import React, { useState, useEffect } from "react";
// import { formatEther, formatUnits } from "viem";
// import { sepolia } from "viem/chains";
// import SafeApiKit from "@safe-global/api-kit";
// import Dropdown from "../atoms/DropDown";
// import Image from "next/image";
// import { EChain, BLOCK_EXPLORER_URL } from "@/app/services/utils/chainUtils";


// const SAFE_API_URL = "https://safe-transaction-sepolia.safe.global/api";

// const SafeActivityFeed = ({ safeAddress }: { safeAddress: string }) => {
//   const [transactions, setTransactions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     days: 7,
//     type: "all",
//   });
//   const DAYS_FILTER_OPTIONS = [
//     { value: "7", name: "Last 7 days" },
//     { value: "30", name: "Last 30 days" },
//     { value: "90", name: "Last 90 days" },
//   ];

//   const TYPE_FILTER_OPTIONS = [
//     { value: "all", name: "All Transactions" },
//     { value: "ETH", name: "ETH Transfers" },
//     { value: "ERC20", name: "Token Transfers" },
//     { value: "NFT", name: "NFT Transfers" },
//   ];

//   const safeService = new SafeApiKit({
//     chainId: BigInt(sepolia.id),
//     txServiceUrl: SAFE_API_URL,
//   });

//   useEffect(() => {
//     const fetchSafeActivity = async () => {
//       try {
//         const [multisigTxs, moduleTxs, getPendingTransactions] =
//           await Promise.all([
//             safeService.getMultisigTransactions(safeAddress),
//             safeService.getModuleTransactions(safeAddress),
//             safeService.getPendingTransactions(safeAddress),
//           ]);
//         const pendingTransactionsWithTimestamp =
//           getPendingTransactions.results.map((tx) => ({
//             ...tx,
//             timestamp: new Date(tx.submissionDate),
//           }));

//         const processed = [...multisigTxs.results, ...moduleTxs.results]
//           .filter((tx) => tx.isSuccessful)
//           .map((tx) => ({
//             ...tx,
//             timestamp: new Date(tx.executionDate),
//           }))
//           .sort(
//             (a, b) =>
//               new Date(b.executionDate).getTime() -
//               new Date(a.executionDate).getTime()
//           );
//         const allTransactions = processed.concat(
//           pendingTransactionsWithTimestamp
//         );
//         setTransactions(allTransactions);
//       } catch (error) {
//         console.error("Error fetching activity:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSafeActivity();
//     const interval = setInterval(fetchSafeActivity, 15000);
//     return () => clearInterval(interval);
//   }, [safeAddress]);

//   const StatusBadge = ({ tx }: { tx: any }) => (
//     <div className="flex items-center gap-2">
//       {tx.isExecuted ? (
//         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
//           {/* <CheckCircle2 className="w-4 h-4 mr-1" /> */}
//           Executed
//         </span>
//       ) : (
//         <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
//           {tx.confirmations.length >= tx.confirmationsRequired ? (
//             <>
//               {/* <AlertCircle className="w-4 h-4 mr-1" /> */}
//               Ready to Execute
//             </>
//           ) : (
//             <>
//               {/* <Clock className="w-4 h-4 mr-1" /> */}
//               Awaiting {tx.confirmationsRequired - tx.confirmations.length}{" "}
//               signatures
//             </>
//           )}
//         </span>
//       )}
//     </div>
//   );

//   const TransactionProgress = ({ tx }: { tx: any }) => (
//     <div className="space-y-2">
//       <div className="flex items-center justify-between text-sm">
//         <span className="text-gray-600">
//           {/* <Users className="inline-block w-4 h-4 mr-1" /> */}
//           {tx.confirmations.length}/{tx.confirmationsRequired} confirmations
//         </span>
//         <span className="text-gray-500">
//           {formatEther(BigInt(tx.value))} ETH
//         </span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
//           style={{
//             width: `${
//               (tx.confirmations.length / tx.confirmationsRequired) * 100
//             }%`,
//           }}
//         />
//       </div>
//     </div>
//   );
//   const TransactionTypeIcon = ({ type }: { type: string }) => {
//     const icons = {
//       ETH: "Ξ",
//       ERC20: "🪙",
//       ERC721: "🖼️",
//       NFT: "🖼️",
//       default: "🌐"
//     };

//     return (
//       <span className="text-2xl">
//         {icons[type as keyof typeof icons] || icons.default}
//       </span>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-8">
//         {/* <Loader2 className="w-8 h-8 text-blue-500 animate-spin" /> */}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-app-dark-surface3 relative mx-auto mt-12 w-full max-w-4xl rounded-xl border border-neutral-800 p-6 shadow-card">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold text-socket-primary sm:text-2xl">
//           Transaction History
//         </h2>

//         {/* Filters */}
//         <div className="flex gap-4">
//           <Dropdown
//             options={DAYS_FILTER_OPTIONS}
//             inputSize="md"
//             defaultValue={filters.days.toString()}
//             classes={{
//               container: "w-36",
//               inputContainer: "p-3 bg- bg-app-dark-surface2 border border-neutral-800",
//               input: "text-app-gray-50",
//               arrow: "text-app-gray-400",
//             }}
//             onChange={(value) =>
//               setFilters({ ...filters, days: Number(value) })
//             }
//           />

//           <Dropdown
//             options={TYPE_FILTER_OPTIONS}
//             inputSize="md"
//             defaultValue={filters.type}
//             classes={{
//               container: "w-44",
//               inputContainer: "p-3 bg- bg-app-dark-surface2 border border-neutral-800",
//               input: "text-app-gray-50",
//               arrow: "text-app-gray-400",
//             }}
//             onChange={(value) => setFilters({ ...filters, type: value })}
//           />
//         </div>
//       </div>

//       {/* Transaction List */}
//       <div className="space-y-4">
//         {transactions.map((tx) => (
//           <div
//             key={tx.hash}
//             className="bg- bg-app-dark-surface2 p-4 border border-neutral-800 rounded-lg hover:bg-app-dark-surface4 transition-colors"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex items-center gap-3">
//                 <TransactionTypeIcon type={tx.type} />
//                 <div>
//                   <h3 className="font-medium text-app-gray-50">
//                     {getTransactionTitle(tx)}
//                   </h3>
//                   <p className="text-sm text-app-gray-300">
//                     {new Date(tx.timestamp).toLocaleDateString()} •{" "}
//                     {new Date(tx.timestamp).toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   tx.status === "failed"
//                     ? "bg-red-500/20 text-red-400"
//                     : "bg-green-500/20 text-green-400"
//                 }`}
//               >
//                 {tx.status === "failed" ? "Failed" : "Confirmed"}
//               </span>
//             </div>

//             <div className="grid grid-cols-3 gap-4 text-sm mb-4">
//               <div>
//                 <p className="text-app-gray-300 mb-1">From</p>
//                 <p className="text-app-gray-50 truncate">{tx.from}</p>
//               </div>
//               <div>
//                 <p className="text-app-gray-300 mb-1">To</p>
//                 <p className="text-app-gray-50 truncate">{tx.to}</p>
//               </div>
//               <div>
//                 <p className="text-app-gray-300 mb-1">Value</p>
//                 <p className="text-app-gray-50">
//                   {formatValue(tx)}
//                   {tx.type === "NFT" && (
//                     <span className="block text-xs text-app-gray-400 mt-1">
//                       Contract: {tx.contractAddress?.slice(0, 6)}...
//                       {tx.contractAddress?.slice(-4)}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </div>

//             {/* NFT Preview (if available) */}
//             {tx.type === "NFT" && (
//               <div className="mb-4 flex items-center gap-3">
//                 <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center">
//                   {tx.image ? (
//                     <Image
//                       src={tx.image}
//                       alt="NFT"
//                       width={64}
//                       height={64}
//                       className="rounded-lg"
//                     />
//                   ) : (
//                     <span className="text-2xl">🖼️</span>
//                   )}
//                 </div>
//                 <div>
//                   <p className="text-app-gray-50">
//                     {tx.tokenName || "Unnamed NFT"}
//                   </p>
//                   {tx.tokenId && (
//                     <p className="text-app-gray-400 text-sm">
//                       ID: #{tx.tokenId}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             )}

//             <a
//               href={`${BLOCK_EXPLORER_URL[EChain.ETH_SEPOLIA]}/tx/${tx.hash}`}
//               target="_blank"
//               className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm transition-colors"
//             >
//               View on Explorer
//               <svg
//                 className="ml-1 w-4 h-4"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
//                 <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
//               </svg>
//             </a>
//           </div>
//         ))}

//         {!loading && transactions.length === 0 && (
//           <div className="text-center py-8 text-app-gray-400">
//             No transactions found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SafeActivityFeed;
