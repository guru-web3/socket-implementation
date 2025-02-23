// "use client";
// import React, { useState, useEffect } from "react";
// import { formatEther, formatUnits } from "viem";
// import Dropdown from "../atoms/DropDown";
// import { EChain, BLOCK_EXPLORER_URL } from "@/app/services/common-utils/chainUtils";
// import { RawToken } from "@/app/constants/asset.interface";

// const ActivityFeed = ({ safeAddress }: { safeAddress: string }) => {
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
//   /* eslint-disable  @typescript-eslint/no-explicit-any */
//   const [transactions, setTransactions] = useState<any[]>([]);
  
//   const TYPE_FILTER_OPTIONS = [
//     { value: "all", name: "All Transactions" },
//     { value: "ETH", name: "ETH Transfers" },
//     { value: "ERC20", name: "Token Transfers" },
//     { value: "NFT", name: "NFT Transfers" },
//   ];

//   const fetchExplorerActivity = async () => {
//     try {
//       const params = new URLSearchParams({
//         address: safeAddress!,
//         chainId: EChain.ETH_SEPOLIA.toString(),
//         // ...Object.fromEntries(
//         //   Object.entries(filters).map(([key, value]) => [key, value.toString()])
//         // ),
//       });

//       const response = await fetch(`/api/transactions?${params}`);
//       const { data } = await response.json();

//       interface Transaction {
//         timeStamp: number;
//         tokenSymbol?: string;
//         tokenID?: string;
//         type?: string;
//         timestamp?: Date;
//       }

//       const formatted: Transaction[] = data.map((tx: Transaction) => ({
//         ...tx,
//         timestamp: new Date(tx.timeStamp),
//         type: tx.tokenSymbol ? "ERC20" : tx.tokenID ? "NFT" : "ETH",
//       }));

//       console.log({ formatted });
//       setTransactions(formatted);
//     } catch (error) {
//       console.error("Failed to load transactions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExplorerActivity();
//     const interval = setInterval(fetchExplorerActivity, 15000);
//     return () => clearInterval(interval);
//   }, [safeAddress]);

//   const TransactionTypeIcon = ({ type }: { type: string }) => {
//     const icons = {
//       ETH: "Ξ",
//       ERC20: "🪙",
//       ERC721: "🖼️",
//       NFT: "🖼️",
//       default: "🌐",
//     };

//     return (
//       <span className="text-2xl">
//         {icons[type as keyof typeof icons] || icons.default}
//       </span>
//     );
//   };

//   const formatValue = (tx: RawToken) => {
//     if (tx.type === "ETH") {
//       return `${formatEther(BigInt(tx.value || 0))} ETH`;
//     }

//     if (tx.type === "ERC20" && tx.tokenSymbol) {
//       return `${formatUnits(
//         BigInt(tx.tokenValue || 0),
//         Number(tx.tokenDecimal || 18)
//       )} ${tx.tokenSymbol}`;
//     }

//     if (tx.type === "NFT") {
//       return `NFT ${tx.tokenId ? `#${tx.tokenId}` : "Transfer"}`;
//     }

//     return "Token Transfer";
//   };

//   const getTransactionTitle = (tx: any) => {
//     const base = `${tx.type} Transfer`;
//     if (tx.type === "ERC20" && tx.tokenSymbol)
//       return `${tx.tokenSymbol} Transfer`;
//     if (tx.type === "NFT") return "NFT Transfer";
//     return base;
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
//         <h2
//           className="text-xl font-semibold text-socket-primary sm:text-2xl"
//           aria-label="Transaction History"
//         >
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
//                 aria-label={tx.status}
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
//                 <p className="text-app-gray-300 mb-1" aria-label="from">
//                   From
//                 </p>
//                 <p className="text-app-gray-50 truncate" aria-label={tx.from}>
//                   {tx.from}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-app-gray-300 mb-1" aria-label="to">
//                   To
//                 </p>
//                 <p className="text-app-gray-50 truncate" aria-label={tx.to}>
//                   {tx.to}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-app-gray-300 mb-1" aria-label="value">
//                   Value
//                 </p>
//                 <p className="text-app-gray-50">
//                   {formatValue(tx as RawToken)}
//                   {tx.type === "NFT" && (
//                     <span className="block text-xs text-app-gray-400 mt-1">
//                       Contract: {tx.contractAddress?.slice(0, 6)}...
//                       {tx.contractAddress?.slice(-4)}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </div>

//             <a
//               aria-label="View transactions Explorer"
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
//           <div
//             className="text-center py-8 text-app-gray-400"
//             aria-label="No transactions Found Explorer"
//           >
//             No transactions found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ActivityFeed;


// "use client";
// import React, { useEffect, useState } from "react";

// import {
//   useAccount,
//   useBalance,
//   useSwitchChain,
//   useWriteContract,
//   useWaitForTransactionReceipt,
//   useEstimateGas,
//   useConnectorClient,
//   Config,
//   usePublicClient,
// } from "wagmi";
// import { formatEther, parseGwei } from 'viem'

// import { sepolia } from "wagmi/chains";
// import WethAbi from "../../constants/wethAbi.json";
// import Image from "next/image";
// import type { SafeConfig } from "@safe-global/protocol-kit";
// import { useToast } from "@/context/ToastContex";

// import { TextInput } from "../atoms/TextInput";
// import Button from "../atoms/Button";
// import { WETH_SEPOLIA_CONTRACT } from "@/lib/constants/transaction";
// import useTransactionStore from "@/store/activityStore";



// const WrapUnwrapCard = () => {
//   const publicClient = usePublicClient();
//   const { address, chain } = useAccount();
//   const { switchChain } = useSwitchChain();
//   const { addToast } = useToast();
//   const { postTransaction, isPosting, error } = useTransactionStore();

//   const [wrapAmount, setWrapAmount] = useState("");
//   const [unWrapAmount, setUnwrapAmount] = useState("");

//   const [safeEnabled, setSafeEnabled] = useState(false);
//   const [safeAddress, setSafeAddress] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [unWrapLoading, setUnWrapLoading] = useState(false);

//   const [txHash, setTxHash] = useState<`0x${string}`>();
//   const [transactionFailure, setTransactionFailure] = useState<string>();
//   const [wrapError, setWrapError] = useState<string>("");
//   const [unWrapError, setUnWrapError] = useState<string>("");

//   // Balances
//   const { data: ethBalance } = useBalance({ address });
//   const { data: wethBalance } = useBalance({
//     address,
//     token: WETH_SEPOLIA_CONTRACT,
//   });

//   // Transaction status
//   const { status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });
//   const { data: connectorData } = useConnectorClient<Config>();

//   // Gas estimation
//   const wrapGas = useEstimateGas({
//     account: address,
//     to: WETH_SEPOLIA_CONTRACT,
//     data: "0xd0e30db0",
//     value: wrapAmount ? BigInt(parseFloat(wrapAmount) * 1e18) : undefined,
//   });

//   const { writeContractAsync } = useWriteContract();

//   const handleMaxWrap = async () => {
    
//     if (!ethBalance?.value || !wrapGas.data) return;
//     try {
//       // Get current block base fee
//       const block = await publicClient?.getBlock();
//       const baseFeePerGas = block?.baseFeePerGas;
      
//       if (!baseFeePerGas) throw new Error('EIP-1559 not supported');
  
//       // Set priority fee (2 Gwei in this example)
//       const priorityFeePerGas = parseGwei('3'); 
  
//       // Calculate total gas cost
//       const totalGasCost = (baseFeePerGas + priorityFeePerGas) * wrapGas.data;
  
//       // Calculate max sendable amount
//       const maxValue = ethBalance.value > totalGasCost 
//         ? ethBalance.value - totalGasCost
//         : 0n;
  
//       setWrapAmount(Number(formatEther(maxValue)).toFixed(5));
  
//     } catch (error) {
//       console.error('Gas estimation error:', error);
//       // Fallback to simple gas subtraction
//       const maxValue = ethBalance.value - wrapGas.data;
//       setWrapAmount((Number(maxValue) / 1e18).toFixed(4));
//     }
//   };

//   useEffect(() => {
//     if (wrapAmount && ethBalance?.value) {
//       if (parseFloat(wrapAmount) > Number(ethBalance.value) / 1e18) {
//         setWrapError("Insufficient Balance");
//       } else {
//         setWrapError("");
//       }
//     }
//   }, [wrapAmount]);

//   useEffect(() => {
//     if (unWrapAmount && ethBalance?.value) {
//       if (parseFloat(unWrapAmount) > Number(wethBalance?.value) / 1e18) {
//         setUnWrapError("Insufficient Balance");
//       } else {
//         setUnWrapError("");
//       }
//     }
//   }, [unWrapAmount]);

//   const handleMaxUnwrap = () => {
//     if (!wethBalance?.value) return;
//     setUnwrapAmount((Number(wethBalance.value) / 1e18).toFixed(4));
//   };

//   const postTransactionApi = async (wrapType: "wrap" | "unwrap", hash: string) => {
//     postTransaction(wrapType, hash, address || "", wrapAmount, hash, 0)
//     if (wrapType === "wrap") {
//       postTransaction(wrapType, hash, address || "", wrapAmount, "0")

//       const response = await fetch('/api/transactions', {
//         method: 'POST',
//         body: JSON.stringify({
//           hash: hash,
//           chainId: sepolia.id,
//           type: 'WRAP', // or 'UNWRAP'
//           from: address,
//           to: WETH_SEPOLIA_CONTRACT,
//           value: wrapAmount,
//           tokenSymbol: 'WETH',
//           tokenDecimal: 18,
//         })
//       });
//     } else {
//       postTransaction(wrapType, txHash || "", address || "", "0", wrapAmount)

//       const response2 = await fetch('/api/transactions', {
//         method: 'POST',
//         body: JSON.stringify({
//           hash: txHash,
//           chainId: sepolia.id,
//           type: 'UNWRAP', // or 'UNWRAP'
//           from: address,
//           to: "0x0",
//           value: unWrapAmount,
//           tokenSymbol: 'ETH',
//           tokenDecimal: 18
//         })
//       });
//     }
//   }

//   const handleWrap = async () => {
//     if (!address || chain?.id !== sepolia.id) return;
    
//     try {
//       setLoading(true);
//       const value = BigInt(parseFloat(wrapAmount) * 1e18);

//       if (safeEnabled) {
        
//         const SafeKit = (await import('@safe-global/protocol-kit')).default
//         const apiKit = (await import("@safe-global/api-kit")).default

//         const safeSDK = await SafeKit.init({ 
//           safeAddress: safeAddress as `0x${string}`, 
//           provider: connectorData?.transport as SafeConfig["provider"],
//         });
//         const signerAddress = (await safeSDK.getSafeProvider().getSignerAddress()) || '0x'

//         const safeTx = await safeSDK.createTransaction({
//           transactions: [{
//             to: WETH_SEPOLIA_CONTRACT,
//             value: value.toString(),
//             // deposit hex
//             data: "0xd0e30db0",
//           }]
//         });

//         const txHash = await safeSDK.getTransactionHash(safeTx);
//         const signature = await safeSDK.signHash(txHash);
        
//         console.log({txHash});

//         const api = new apiKit({ 
//           chainId: BigInt(sepolia.id),
//         });
//         await api.proposeTransaction({
//           safeAddress,
//           safeTransactionData: safeTx.data,
//           safeTxHash: txHash,
//           senderAddress: signerAddress!,
//           senderSignature: signature.data
//         });
//         await postTransactionApi("wrap", txHash);
//         setTxHash(txHash as `0x${string}`);
//       } else {
//         const hash = await writeContractAsync({
//           address: WETH_SEPOLIA_CONTRACT,
//           abi: WethAbi,
//           functionName: "deposit",
//           value,
//         });
//         await postTransactionApi("wrap", hash);
//         // post to tx api
//         // store in redis with expiry of 10 minutes
//         // while fetching from transaction activity api, check if tx is in redis
//         // if yes, use txhash fetch from eth scan if not present in eth scan
//         // get the transaction details from api and format it to show in the UI
//         setTxHash(hash);
//         console.log({ hash });
//       }
//     } catch (error) {
//       console.error("Transaction failed:", error);
//       addToast("error", (error as any).shortMessage || (error as Error).message || "Transaction failed")
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnwrap = async () => {
//     if (!address || chain?.id !== sepolia.id) return;

//     try {
//       setUnWrapLoading(true);
//       const value = BigInt(parseFloat(unWrapAmount) * 1e18);

//       const hash = await writeContractAsync({
//         address: WETH_SEPOLIA_CONTRACT,
//         abi: WethAbi,
//         functionName: "withdraw",
//         args: [value],
//       });
//       await postTransactionApi("unwrap", hash);
      
//       setTxHash(hash);
//     } catch (error) {
//       console.error("Unwrap failed:", error);
//       addToast("error", (error as any).shortMessage || (error as Error).message || "Transaction failed")
//     } finally {
//       setUnWrapLoading(false);
//     }
//   };

//   if (chain?.id !== sepolia.id) {
//     return (
//       <div className="bg-app-dark-surface3 p-4 rounded-xl border border-neutral-800 text-center">
//         <div className="mb-3 flex flex-col items-center gap-2">
//           <Image
//             src="/icons/warning.svg"
//             alt="Warning"
//             width={40}
//             height={40}
//             className="mb-2"
//           />
//           <p className="text-app-gray-50">Please switch to Sepolia network</p>
//           <button
//             onClick={() => switchChain?.({ chainId: sepolia.id })}
//             className="mt-2 hover:bg-purple-400 text-white px-4 py-2 rounded-full transition-colors"
//             aria-label="Switch to Sepolia network"
//           >
//             Switch Network
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-app-dark-surface3 relative mx-auto w-full max-w-lg rounded-xl border border-neutral-800 p-6 shadow-card">
//       {/* Safe Wallet Toggle */}
//       <div className="mb-4 h-8 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <label htmlFor="refuel-toggle" className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               id="refuel-toggle"
//               className="sr-only peer"
//               checked={safeEnabled}
//               onChange={(e) => setSafeEnabled(e.target.checked)}
//             />
//             <div className="w-11 h-6 bg-gray-600 border:bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-purple-500 transition-all"></div>
//             <span className="absolute left-[4px] top-[2px] w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform"></span>
//           </label>
//           <span className="text-app-gray-50 text-sm">Use Safe Wallet</span>
//         </div>
        
//         {safeEnabled && (
//           <input
//             type="text"
//             value={safeAddress}
//             onChange={(e) => setSafeAddress(e.target.value)}
//             placeholder="Safe address..."
//             className="w-48 px-3 py-1 bg- bg-app-dark-surface2 border border-neutral-800 rounded-lg text-app-gray-50 text-sm focus:outline-none"
//             aria-label="Safe Wallet Address"
//           />
//         )}
//       </div>

//       {/* Cards Container */}
//       <div className="space-y-4">
//         {/* Wrap Card */}
//         <div className="bg- bg-app-dark-surface2 rounded-lg border border-neutral-800 p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-app-gray-50 font-medium text-nowrap">Wrap-ETH</h3>
//             <Button
//               onClick={handleMaxWrap}
//               className="text-purple-500 text-sm hover:text-purple-400 !justify-end"
//               aria-label="Set max ETH to wrap"
//             >
//               Max: {Number(ethBalance?.formatted || 0).toFixed(4)} ETH
//             </Button>
//           </div>
          
//           <div className="flex gap-2 justify-center items-center">
//             <TextInput
//               placeholder="0.0"
//               type="number"
//               inputSize="lg"
//               pill={true}
//               error={!!wrapError}
//               value={wrapAmount}
//               onChange={(e) => setWrapAmount(e.target.value)}
//               EndSlot={<span className="text-neutral-500">ETH</span>}
//               helperText={wrapError}
//               className="w-full"
//             />
//             <Button
//               onClick={handleWrap}
//               loading={loading}
//               disabled={loading || !wrapAmount}
//               className={`!h-12 w-28 px-6 py-3 rounded-lg font-medium transition-colors ${
//                 loading || !wrapAmount 
//                   ? 'bg-neutral-800 text-app-gray-400 cursor-not-allowed'
//                   : '  bg-purple-400 text-white'
//               }`}
//               aria-label="Wrap ETH to WETH"
//             >
//               {loading ? "" : "Wrap"}
//             </Button>
//           </div>
//         </div>

//         {/* Unwrap Card */}
//         <div className="bg- bg-app-dark-surface2 rounded-lg border border-neutral-800 p-4">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-app-gray-50 font-medium">Unwrap WETH</h3>
//             <Button
//               onClick={handleMaxUnwrap}
//               className="text-purple-500 text-sm hover:text-purple-400 !justify-end"
//               aria-label="Set max WETH to unwrap"
//             >
//               Max: {Number(wethBalance?.formatted || 0).toFixed(4)} WETH
//             </Button>
//           </div>
          
//         <div className="flex gap-2 justify-center items-center">
//           <TextInput
//               placeholder="0.0"
//               type="number"
//               inputSize="lg"
//               pill={true}
//               error={!!unWrapError}
//               value={unWrapAmount}
//               onChange={(e) => setUnwrapAmount(e.target.value)}
//               EndSlot={<span className="text-neutral-500">wETH</span>}
//               helperText={unWrapError}
//               className="w-full"
//             />
//             <Button
//               onClick={handleUnwrap}
//               loading={unWrapLoading}
//               disabled={unWrapLoading || !unWrapAmount}
//               className={`!h-12 w-28 px-6 py-3 rounded-lg font-medium transition-colors ${
//                 unWrapLoading || !unWrapAmount 
//                   ? 'bg-neutral-800 text-app-gray-400 cursor-not-allowed'
//                   : ' bg-purple-400 text-white'
//               }`}
//               aria-label="Wrap ETH to WETH"
//             >
//               {unWrapLoading ? "" : "Unwrap"}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Transaction Status */}
//       {txStatus === "success" && (
//         <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-center text-sm">
//           Transaction confirmed successfully!
//         </div>
//       )}
      
//       {transactionFailure && (
//         <div className="mt-4 p-3 bg-red-500/20 text-red-500 rounded-lg text-center text-sm">
//           {transactionFailure}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WrapUnwrapCard;

// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   Config,
//   useAccount,
//   useBalance,
//   useConnectorClient,
//   useEstimateFeesPerGas,
//   useEstimateGas,
//   useReadContract,
//   useWaitForTransactionReceipt,
//   useWatchContractEvent,
//   useWriteContract,
// } from "wagmi";
// import WethAbi from "../../constants/wethAbi.json";
// import { createPublicClient, encodeFunctionData, formatUnits, http, parseEther } from "viem";
// import { sepolia } from "viem/chains";
// export type Hex = `0x${string}`;
// import SafeAbi from "../../constants/safeAbi.json"; // Get from Safe contracts repo
// import Safe, { Eip1193Provider, SafeConfig } from '@safe-global/protocol-kit';
// import SafeApiKit from '@safe-global/api-kit'
// import { SafeTransactionDataPartial } from "@safe-global/types-kit";

// const WETH_SEPOLIA_CONTRACT = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

// const publicClient = createPublicClient({
//   chain: sepolia,
//   transport: http(),
// });

// const WrapEthCard = () => {
//   const { address } = useAccount();
//   const { data: wEthBalance } = useReadContract({
//     abi: WethAbi,
//     address: WETH_SEPOLIA_CONTRACT,
//     functionName: "balanceOf",
//     args: [address],
//   });

//   const { data: balance } = useBalance({ address });
//   const { data: feeData } = useEstimateFeesPerGas();
//   const { writeContractAsync } = useWriteContract();
//   const [amount, setAmount] = useState("");
//   const [unWrapAmount, setUnWrapAmount] = useState("");
//   const [txHash, setTxHash] = useState<Hex>();
//   // safe wallet
//   const [safeTxHash, setSafeTxHash] = useState<Hex>();
//   const [pendingTxNonce, setPendingTxNonce] = useState<bigint>();
//   const [confirmations, setConfirmations] = useState<string[]>([]);
//   const [isSafeWallet, setIsSafeWallet] = useState(false);
//   const [threshold, setThreshold] = useState(1);

//   // Detect Safe wallet
//   const { data: safeVersion } = useReadContract({
//     address: address as `0x${string}`,
//     abi: SafeAbi,
//     functionName: "VERSION",
//     args: [],
//   });

//   // Get Safe threshold
//   const { data: safeThreshold } = useReadContract({
//     address: address as `0x${string}`,
//     abi: SafeAbi,
//     functionName: "getThreshold",
//     args: [],
//     // enabled: !!safeVersion
//   });
//    // Track confirmations for Safe transactions
//    useWatchContractEvent({
//     address: address,
//     abi: SafeAbi,
//     eventName: 'Confirmation',
//     args: { sender: address },
//     onLogs(logs) {
//       console.log({logs});
//       const newConfirmations = logs.map(l => (l as any).args.owner);
//       setConfirmations(prev => [...new Set([...prev, ...newConfirmations])]);
//     }
//   });

//   useEffect(() => {
//     if (safeVersion) {
//       console.log({ safeVersion }, { safeThreshold });
//       setIsSafeWallet(true);
//       setThreshold(Number(safeThreshold));
//     }
//   }, [safeVersion, safeThreshold]);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (address && appKit) {
//         // const pendingTx = await appKit.getAllTransactions(address);
//         // console.log({pendingTx});
//       }
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [address]);

//   // Transaction status tracking
//   const { status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });
//   const txData = encodeFunctionData({
//     abi: WethAbi,
//     functionName: 'deposit',
//   });
//   // Gas estimation for wrapping
//   const { data: gasEstimate } = useEstimateGas({
//     to: WETH_SEPOLIA_CONTRACT,
//     account: address,
//     data: "0xd0e30db0", // deposit() function selector
//     value: amount ? parseEther(amount) : undefined,
//   });

//   const handleMaxClick = async () => {
//     if (!balance?.value || !feeData?.maxFeePerGas || !address) return;

//     try {
//       // First estimate with current balance
//       const gas = await publicClient.estimateGas({
//         account: address,
//         to: WETH_SEPOLIA_CONTRACT,
//         data: "0xd0e30db0",
//         value: balance.value,
//       });
//       const estimateMaxPriorityFeePerGas =
//         await publicClient.estimateMaxPriorityFeePerGas({
//           chain: sepolia,
//         });

//       // Calculate with 25% buffer
//       const gasLimit = (gas * 125n) / 100n;
//       const gasCost = gasLimit * estimateMaxPriorityFeePerGas;

//       // Calculate max wrappable amount
//       let maxWrappable = balance.value - gasCost;
//       if (maxWrappable < 0n) maxWrappable = 0n;

//       // Final estimate with adjusted amount
//       const finalEstimate = await publicClient.estimateGas({
//         account: address,
//         to: WETH_SEPOLIA_CONTRACT,
//         data: "0xd0e30db0",
//         value: maxWrappable,
//       });

//       // Recalculate with final estimate
//       const finalGasLimit = (finalEstimate * 125n) / 100n;
//       const finalgasCost = finalGasLimit * estimateMaxPriorityFeePerGas;

//       maxWrappable =
//         balance.value > finalgasCost ? balance.value - finalgasCost : 0n;

//       setAmount(formatUnits(maxWrappable, 18));
//     } catch (error) {
//       console.error("Gas estimation failed:", error);
//       setAmount("0");
//     }
//   };

//   const handleMaxUnWrapClick = () => {
//     const formattedMax = formatUnits((wEthBalance as bigint) || 0n, 18);
//     setUnWrapAmount(formattedMax);
//   };

//   const appKit = new SafeApiKit({
//     chainId: 11155111n,
//   });
//   const { data: connectorData } = useConnectorClient<Config>();
//   const handleSafeWrap = async (amount: bigint, safeAddress: Hex) => {
//     const safeSdk = await Safe.init({
//       safeAddress: safeAddress,
//       // provider: "https://sepolia.gateway.tenderly.co",
//       provider: connectorData?.transport as SafeConfig["provider"],
//     });

//     // const safe = await createSafeClient({
//     //   provider: connectorData?.transport as SafeConfig["provider"],
//     // });
    
//     const nonce = await appKit.getNextNonce(safeAddress);
//     const signerAddress = (await safeSdk.getSafeProvider().getSignerAddress()) || '0x'

//     const txData = encodeFunctionData({
//       abi: WethAbi,
//       functionName: 'deposit',
//     });
  
//     const transactionData: SafeTransactionDataPartial = {
//       to: WETH_SEPOLIA_CONTRACT,
//       value: amount.toString(),
//       data: txData, // deposit() function
//       operation: 0,
//       nonce: Number(nonce),
//       safeTxGas: "1",
//     };
  
//       // safe.send({ transactions: [transactionData] });
//     // Create Safe transaction
//     const safeTransaction = await safeSdk.createTransaction({
//       transactions: [transactionData], 
//       options: {
//         nonce: Number(nonce),
//         safeTxGas: '0', // Auto-calculate
//         baseGas: '0',
//       }
//     });

//     const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
//     const signature = await safeSdk.signHash(safeTxHash)

//     await appKit.proposeTransaction({
//       safeAddress: safeAddress,
//       safeTransactionData: safeTransaction.data,
//       safeTxHash,
//       senderAddress: signerAddress!,
//       senderSignature: signature.data
//     });
//     // Propose transaction to the service
//     // await appKit.confirmTransaction(
//     //   safeTxHash,
//     //   signature.data,
//       // {
//       // safeAddress: safeAddress,
//       // safeTransactionData: safeTransaction.data,
//       // safeTxHash,
//       // senderAddress: WETH_SEPOLIA_CONTRACT!,
//       // senderSignature: signature.data
//     // }
//   // )
  
//   };

//   const handleWrapEth = async () => {
//     try {
//       if (!amount) return;
//       const txData = encodeFunctionData({
//         abi: WethAbi,
//         functionName: 'deposit',
//       });

//       const amountBigInt = parseEther(amount);
//       if (!isSafeWallet) {
//         await handleSafeWrap(amountBigInt, "0xB5e28ea32553273318dB53E431e37e26CbC92A7f" as Hex);
//         // const nonce = await publicClient.readContract({
//         //   address: address as Hex,
//         //   abi: SafeAbi,
//         //   functionName: 'nonce'
//         // });
  
//         // // Generate Safe transaction hash
//         // const safeTxHash = await publicClient.readContract({
//         //   address: address as Hex,
//         //   abi: SafeAbi,
//         //   functionName: 'getTransactionHash',
//         //   args: [
//         //     WETH_SEPOLIA_CONTRACT,
//         //     parseEther(amount),
//         //     txData,
//         //     0, // Operation
//         //     0, // SafeTxGas
//         //     0, // BaseGas
//         //     0, // GasPrice
//         //     '0x0000000000000000000000000000000000000000', // GasToken
//         //     '0x0000000000000000000000000000000000000000', // RefundReceiver
//         //     nonce
//         //   ]
//         // });
//         // // Submit to Safe
//         // const hash = await writeContractAsync({
//         //   address: address || `0x`,
//         //   abi: SafeAbi,
//         //   functionName: "execTransactionFromModule",
//         //   args: [
//         //     WETH_SEPOLIA_CONTRACT,
//         //     parseEther(amount),
//         //     txData,
//         //     0, // Operation
//         //   ],
//         // });

//         // setPendingTxNonce(nonce as bigint);
//         // setSafeTxHash(safeTxHash as Hex);
//       } else {
//         const gas = await publicClient.estimateGas({
//           account: address,
//           to: WETH_SEPOLIA_CONTRACT,
//           data: "0xd0e30db0",
//           value: amountBigInt,
//         });

//         const hash = await writeContractAsync({
//           address: WETH_SEPOLIA_CONTRACT,
//           abi: WethAbi,
//           functionName: "deposit",
//           value: amountBigInt,
//           gas: gas,
//         });
//         setTxHash(hash);
//       }

//     } catch (error) {
//       console.error("Wrap failed:", error);
//     }
//   };

//   const handleUnWrapEth = async () => {
//     try {
//       if (!unWrapAmount) return;

//       const amountBigInt = parseEther(unWrapAmount);
//       const hash = await writeContractAsync({
//         address: WETH_SEPOLIA_CONTRACT,
//         abi: WethAbi,
//         functionName: "withdraw",
//         args: [amountBigInt],
//       });

//       setTxHash(hash);
//     } catch (error) {
//       console.error("Unwrap failed:", error);
//     }
//   };

//   return (
//     <>
//       <div className="sm:w-1/2 max-w-[520px] w-3/4 mx-auto p-4 space-y-6">
//       {/* Wrap Card */}
//         <div className="bg-zinc-800 rounded-xl p-6 border border-neutral-700 shadow-black">
//           <h2 className="text-lg font-semibold mb-4 text-white">Wrap ETH to wETH</h2>
//           <div className="space-y-4">
//             <div className="flex flex-col space-y-2">
//               <input
//                 type="number"
//                 placeholder="0.0"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 className="w-full bg-gray-90 p-3 rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
//               />
//               <button
//                 onClick={handleMaxClick}
//                 className="text-sm text-app-primary-500 hover:text-purple-60 self-end"
//               >
//                 Max: {formatUnits(balance?.value || 0n, 18)} ETH
//               </button>
//             </div>
//             <button
//               onClick={handleWrapEth}
//               className="w-full bg-violet-500 text-white py-3 rounded-lg hover:bg-opacity-90 transition-all"
//             >
//               Wrap ETH
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WrapEthCard;

// "use client";
// import React, { useState } from "react";
// import {
//   useAccount,
//   useBalance,
//   useSwitchChain,
//   useWriteContract,
//   useWaitForTransactionReceipt,
//   useEstimateGas,
// } from "wagmi";
// import { sepolia } from "wagmi/chains";
// import WethAbi from "../../constants/wethAbi.json";

// const WETH_SEPOLIA_CONTRACT = "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9";

// const WrapUnwrapCard = () => {
//   const { address, chain } = useAccount();
//   const { switchChain } = useSwitchChain();
//   const [wrapAmount, setWrapAmount] = useState("");
//   const [unwrapAmount, setUnwrapAmount] = useState("");
//   const [safeEnabled, setSafeEnabled] = useState(false);
//   const [safeAddress, setSafeAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [txHash, setTxHash] = useState<`0x${string}`>();

//   // Balances
//   const { data: ethBalance } = useBalance({ address });
//   const { data: wethBalance } = useBalance({
//     address,
//     token: WETH_SEPOLIA_CONTRACT,
//   });

//   // Transaction status
//   const { status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });

//   // Gas estimation
//   const { data: wrapGas } = useEstimateGas({
//     account: address,
//     to: WETH_SEPOLIA_CONTRACT,
//     data: "0xd0e30db0",
//     value: wrapAmount ? BigInt(parseFloat(wrapAmount) * 1e18) : undefined,
//   });

//   const { writeContractAsync } = useWriteContract();

//   const handleMaxWrap = async () => {
//     if (!ethBalance?.value || !wrapGas) return;
    
//     const maxValue = ethBalance.value - wrapGas;
//     setWrapAmount((Number(maxValue) / 1e18).toFixed(4));
//   };

//   const handleMaxUnwrap = () => {
//     if (!wethBalance?.value) return;
//     setUnwrapAmount((Number(wethBalance.value) / 1e18).toFixed(4));
//   };

//   const handleWrap = async () => {
//     if (!address || chain?.id !== sepolia.id) return;
    
//     try {
//       setLoading(true);
//       const value = BigInt(parseFloat(wrapAmount) * 1e18);

//       if (safeEnabled) {
        
//         const SafeKit = (await import('@safe-global/protocol-kit')).default
//         const apiKit = (await import("@safe-global/api-kit")).default

//         const safeSDK = await SafeKit.init({ 
//           safeAddress: safeAddress as `0x${string}`, 
//           provider: window.ethereum as any 
//         });
//         const signerAddress = (await safeSDK.getSafeProvider().getSignerAddress()) || '0x'

//         const safeTx = await safeSDK.createTransaction({
//           transactions: [{
//             to: WETH_SEPOLIA_CONTRACT,
//             value: value.toString(),
//             // deposit hex
//             data: "0xd0e30db0",
//           }]
//         });

//         const txHash = await safeSDK.getTransactionHash(safeTx);
//         const signature = await safeSDK.signHash(txHash);
        
//         const api = new apiKit({ 
//           chainId: BigInt(sepolia.id),
//         });
//         await api.proposeTransaction({
//           safeAddress,
//           safeTransactionData: safeTx.data,
//           safeTxHash: txHash,
//           senderAddress: signerAddress!,
//           senderSignature: signature.data
//         });

//         setTxHash(txHash as `0x${string}`);
//       } else {
//         const hash = await writeContractAsync({
//           address: WETH_SEPOLIA_CONTRACT,
//           abi: WethAbi,
//           functionName: "deposit",
//           value,
//         });
//         setTxHash(hash);
//       }
//     } catch (error) {
//       console.error("Transaction failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUnwrap = async () => {
//     if (!address || chain?.id !== sepolia.id) return;

//     try {
//       setLoading(true);
//       const value = BigInt(parseFloat(unwrapAmount) * 1e18);

//       const hash = await writeContractAsync({
//         address: WETH_SEPOLIA_CONTRACT,
//         abi: WethAbi,
//         functionName: "withdraw",
//         args: [value],
//       });
      
//       setTxHash(hash);
//     } catch (error) {
//       console.error("Unwrap failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (chain?.id !== sepolia.id) {
//     return (
//       <div className="p-4 bg-yellow-100 rounded-lg text-center">
//         <p className="mb-2">Please switch to Sepolia network</p>
//         <button
//           onClick={() => switchChain?.({
//             chainId: sepolia.id,
//           })}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           aria-label="Switch to Sepolia network"
//         >
//           Switch Network
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-6">
//       {/* Safe Wallet Toggle */}
//       <div className="flex items-center gap-2">
//         <input
//           type="checkbox"
//           id="safeToggle"
//           checked={safeEnabled}
//           onChange={(e) => setSafeEnabled(e.target.checked)}
//           className="w-4 h-4"
//           aria-label="Enable Safe Wallet"
//         />
//         <label htmlFor="safeToggle" className="text-sm">
//           Use Safe Wallet
//         </label>
//       </div>

//       {safeEnabled && (
//         <input
//           type="text"
//           value={safeAddress}
//           onChange={(e) => setSafeAddress(e.target.value)}
//           placeholder="Enter Safe Wallet Address"
//           className="w-full p-2 border rounded"
//           aria-label="Safe Wallet Address"
//         />
//       )}

//       {/* Wrap Card */}
//       <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Wrap ETH</h2>
//         <div className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="number"
//               value={wrapAmount}
//               onChange={(e) => setWrapAmount(e.target.value)}
//               placeholder="0.0"
//               className="flex-1 p-2 border rounded"
//               aria-label="ETH wrap amount"
//             />
//             <button
//               onClick={handleMaxWrap}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               aria-label="Set max ETH to wrap"
//             >
//               Max
//             </button>
//           </div>
//           <button
//             onClick={handleWrap}
//             disabled={loading || !wrapAmount}
//             className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
//             aria-label="Wrap ETH to WETH"
//           >
//             {loading ? "Processing..." : "Wrap ETH"}
//           </button>
//         </div>
//       </div>

//       {/* Unwrap Card */}
//       <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
//         <h2 className="text-xl font-semibold mb-4">Unwrap WETH</h2>
//         <div className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="number"
//               value={unwrapAmount}
//               onChange={(e) => setUnwrapAmount(e.target.value)}
//               placeholder="0.0"
//               className="flex-1 p-2 border rounded"
//               aria-label="WETH unwrap amount"
//             />
//             <button
//               onClick={handleMaxUnwrap}
//               className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               aria-label="Set max WETH to unwrap"
//             >
//               Max
//             </button>
//           </div>
//           <button
//             onClick={handleUnwrap}
//             disabled={loading || !unwrapAmount}
//             className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
//             aria-label="Unwrap WETH to ETH"
//           >
//             {loading ? "Processing..." : "Unwrap WETH"}
//           </button>
//         </div>
//       </div>

//       {txStatus === "success" && (
//         <div className="p-4 bg-green-100 rounded-lg text-center">
//           Transaction successful!
//         </div>
//       )}
//     </div>
//   );
// };

// export default WrapUnwrapCard;

// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useAccount, useSwitchChain } from "wagmi";
// import Button from "../atoms/Button";
// import { parseUnits } from "viem";
// import dynamic from "next/dynamic";

// import useSwapStore from "@/store/swapStore";
// import useSwapTransactionStore from "@/store/swapTransactionStore";
// import { useBungeeTx, useMakeApprovalTx } from "@/app/composibles/useApproval";
// import { Token } from "@/app/services/api/socket.interface";
// import { startRoute } from "@/app/services/api/socket";
// import { Ethereum } from "@/app/services/common-utils/chainUtils";
// import { Loader } from "../molecules/Loader";

// const TokenFilter = dynamic(
//   () => import("../organisms/TokenFilter").then((module) => module.default),
//   { ssr: false }
// );
// const FromTokenSelection = dynamic(
//   () => import("../organisms/FromToken").then((module) => module.default),
//   { ssr: false }
// );
// const ToTokenSelection = dynamic(
//   () => import("../organisms/ToToken").then((module) => module.default),
//   { ssr: false }
// );
// const EnableRefuel = dynamic(
//   () => import("../organisms/EnableRefuel").then((module) => module.default),
//   { ssr: false }
// );
// const BridgeRoutes = dynamic(
//   () => import("../organisms/BridgeRoutes").then((module) => module.default),
//   { ssr: false }
// );

// const SwapCard = () => {
//   const { address, chain } = useAccount();
//   const { switchChain } = useSwitchChain();

//   const {
//     supportedChains,
//     fromTokens,
//     toTokens,
//     selectedFromChain,
//     selectedFromToken,
//     selectedToToken,
//     selectedToChain,
//     setSelectedTokenType,
//     selectedTokenType,
//     fetchUserBalances,
//     fetchSupportedChains,
//     setSelectedFromChain,
//     setSelectedToChain,
//     setSelectedFromToken,
//     setSelectedToToken,
//   } = useSwapStore();
//   const { approve } = useMakeApprovalTx();
//   const { executeTx } = useBungeeTx();

//   const {
//     fromAmount,
//     isRefuelEnabled,
//     selectedRoute,
//     fetchQuote,
//     setFetchingQuote,
//     fetchingQuote,
//   } = useSwapTransactionStore();
//   const [balanceError, setBalanceError] = useState("");
//   const [chainError, setChainError] = useState("");

//   // fetch all supported chains
//   const fetchSupportedChainsBungee = async () => {
//     try {
//       await Promise.all([fetchSupportedChains()]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // in case of no default chain select eth and optimism as default chain
//   useEffect(() => {
//     const setInitChain = async () => {
//       if (!selectedFromChain && supportedChains.length) {
//         const defaultChain = supportedChains.find(
//           (supportedChain) => supportedChain.chainId === 1
//         );
//         const defaultToChain = supportedChains.find(
//           (supportedChain) => supportedChain.chainId === 10
//         );
//         defaultChain && (await setSelectedFromChain(defaultChain));
//         defaultToChain && (await setSelectedToChain(defaultToChain));
//       }
//     };
//     setInitChain();
//   }, [supportedChains]);

//   // balance validation error hook
//   useEffect(() => {
//     if (
//       selectedFromToken &&
//       fromAmount &&
//       fromAmount > selectedFromToken.balance
//     ) {
//       console.log({ selectedFromChain });
//       setBalanceError("Insufficient Balance");
//     } else {
//       setBalanceError("");
//     }
//   }, [fromAmount]);

//   // chain validation error hook
//   useEffect(() => {
//     if (selectedFromChain && chain?.id !== selectedFromChain?.chainId) {
//       setChainError(`Switch to ${selectedFromChain?.name}`);
//     } else {
//       setChainError("");
//     }
//   }, [chain, selectedFromChain]);

//   // chain validation error hook
//   useEffect(() => {
//     selectedFromChain && setSelectedFromChain(selectedFromChain);
//     selectedToChain && setSelectedToChain(selectedToChain);
//   }, []);

//   // calculate route on from, to, amount change
//   useEffect(() => {
//     calculateRoutes();
//   }, [
//     selectedToToken,
//     selectedFromToken,
//     fromAmount,
//     selectedFromChain,
//     selectedToChain,
//   ]);

//   // fetch balance and chain at init
//   useEffect(() => {
//     const init = async () => {
//       if (address) {
//         await fetchUserBalances(address);
//         // in future make this cached from redis and fetch from backend server
//         await fetchSupportedChainsBungee();
//       }
//     };
//     init();
//   }, [address]);

//   const calculateRoutes = async () => {
//     // calculate routes
//     if (
//       selectedFromChain &&
//       selectedToChain &&
//       fromAmount &&
//       selectedFromToken &&
//       selectedToToken
//     ) {
//       setFetchingQuote(true);
//       const bigIntFromAmount = parseUnits(
//         fromAmount.toString(),
//         selectedFromToken.decimals
//       );
//       const routeResult = await fetchQuote({
//         fromChainId: selectedFromChain.chainId,
//         toChainId: selectedToChain.chainId,

//         fromTokenAddress: selectedFromToken?.address || "",
//         toTokenAddress: selectedToToken?.address || "",

//         fromAmount: bigIntFromAmount,
//         userAddress: address || "",

//         sort: "output",
//         defaultSwapSlippage: 0.5,
//         isContractCall: false,
//         showAutoRoutes: false,

//         singleTxOnly: true,
//         bridgeWithGas: isRefuelEnabled || false,
//       });
//       setFetchingQuote(false);
//     }
//   };

//   const changeNetwork = (chainId: string, option: "from" | "to") => {
//     const newSelectedChain = supportedChains?.find(
//       (supportedChain) => supportedChain.chainId === parseInt(chainId, 10)
//     );
//     if (newSelectedChain) {
//       if (option === "from") {
//         setSelectedFromChain(newSelectedChain);
//       } else if (option === "to") {
//         setSelectedToChain(newSelectedChain);
//       }
//     }
//   };

//   const setSelectedToken = (token: Token) => {
//     if (selectedTokenType === "from") {
//       setSelectedFromToken(token);
//     } else if (selectedTokenType === "to") {
//       setSelectedToToken(token);
//     }
//   };

//   const startTx = async () => {
//     if (
//       selectedFromChain &&
//       selectedToChain &&
//       fromAmount &&
//       selectedFromToken &&
//       selectedToToken
//     ) {
//       // const bigIntFromAmount = parseUnits(fromAmount.toString(), selectedFromToken.decimals);

//       const routeStarted = await startRoute({
//         fromChainId: selectedFromChain?.chainId || 0,
//         toChainId: selectedToChain?.chainId || 0,
//         fromTokenAddress: selectedFromToken?.address || "",
//         toTokenAddress: selectedToToken?.address || "",
//         includeFirstTxDetails: true,
//         route: selectedRoute,

//         userAddress: address || "",
//         fromAssetAddress: selectedFromToken?.address || "",
//         toAssetAddress: selectedToToken?.address || "",
//       });
//       // Relevant data from response of /route/start
//       // const activeRouteId = routeStarted.result.activeRouteId;
//       // const userTxIndex = routeStarted.result.userTxIndex;
//       const txTarget = routeStarted.result.txTarget;
//       const txData = routeStarted.result.txData;
//       const value = routeStarted.result.value;

//       if (routeStarted.result.approvalData == null) {
//         console.log("Approval is needed", routeStarted.result.approvalData);
//         // Params for approval
//         const approvalTokenAddress =
//           routeStarted.result.approvalData.approvalTokenAddress;
//         const allowanceTarget =
//           routeStarted.result.approvalData.allowanceTarget;
//         const minimumApprovalAmount =
//           routeStarted.result.approvalData.minimumApprovalAmount;

//         const txHash = await approve({
//           allowanceTarget,
//           minimumApprovalAmount,
//           approvalTokenAddress,
//         });
//         console.log("Approval txHash", txHash);
//       } else {
//         console.log("Approval not needed");
//       }
//       await executeTx(txTarget, value, txData);
//     }
//   };

//   return (
//     <>
//       {address ? (
//         <div
//           className="bg-app-dark-surface3 min-h-[560px] relative mx-auto mt-12 w-full max-w-lg rounded-xl bg-socket-layers-1 px-6 py-6 shadow-card sm:border sm:border-neutral-800"
//           aria-label="Swap Card Container"
//         >
//           {selectedTokenType ? (
//             <TokenFilter
//               onSelect={setSelectedToken}
//               tokens={
//                 selectedTokenType === "from"
//                   ? fromTokens
//                   : selectedTokenType === "to"
//                   ? toTokens
//                   : []
//               }
//               setIsSelection={setSelectedTokenType}
//               aria-label="Token Filter"
//             />
//           ) : (
//             <>
//               {/* Header */}
//               <div
//                 className="mb-3 flex items-center justify-between"
//                 aria-label="Swap Card Header"
//               >
//                 <span
//                   className="text-xl font-semibold leading-8 text-socket-primary sm:text-2xl"
//                   aria-label="Transfer Label"
//                 >
//                   Transfer
//                 </span>
//                 <div
//                   className="flex items-center gap-2"
//                   aria-label="Header Buttons"
//                 >
//                   <Button
//                     variant="secondary"
//                     className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2"
//                     aria-label="Refresh Button"
//                   >
//                     <Image
//                       src="/icons/refresh.svg"
//                       alt="Refresh"
//                       width={18}
//                       height={18}
//                       aria-label="Refresh Icon"
//                     />
//                   </Button>
//                   <Button
//                     variant="secondary"
//                     className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2"
//                     aria-label="Settings Button"
//                   >
//                     <Image
//                       src="/icons/settings.svg"
//                       alt="Settings"
//                       width={18}
//                       height={18}
//                       aria-label="Settings Icon"
//                     />
//                   </Button>
//                 </div>
//               </div>

//               {/* From Section */}
//               <FromTokenSelection
//                 changeNetwork={changeNetwork}
//                 aria-label="From Token Selection"
//               />

//               {/* Swap Icon */}
//               <Button
//                 variant="secondary"
//                 className="rounded-full ml-[40%] absolute mt-[-6] h-11 !w-11 !p-0"
//                 aria-label="Swap Icon Button"
//               >
//                 <Image
//                   className="rotate-90"
//                   src="/icons/arrow-up.svg"
//                   alt="Swap Icon"
//                   width={18}
//                   height={18}
//                   aria-label="Swap Icon"
//                 />
//               </Button>

//               {/* To Section */}
//               <ToTokenSelection
//                 changeNetwork={changeNetwork}
//                 aria-label="To Token Selection"
//               />

//               {/* Enable Section */}
//               <EnableRefuel aria-label="Enable Refuel Section" />

//               {/* Bridge Routes */}
//               <BridgeRoutes aria-label="Bridge Routes Section" />

//               {/* Add Recipient Address Button */}
//               <Button
//                 className="w-56 my-4 flex items-center gap-2 bg-neutral-800 text-app-gray-50 rounded-full !p-0 max-h-9 shadow-md hover:bg-neutral-700 transition-all"
//                 aria-label="Add Recipient Address Button"
//               >
//                 <span
//                   className="flex items-center justify-center w-5 h-5 bg-amber-300 text-black font-bold rounded-full"
//                   aria-label="Add Icon"
//                 >
//                   +
//                 </span>
//                 <span
//                   className="text-sm font-medium"
//                   aria-label="Add Recipient Address Text"
//                 >
//                   Add Recipient Address
//                 </span>
//               </Button>

//               {/* Review Route Button */}
//               {balanceError ? (
//                 <Button
//                   variant="primary"
//                   className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all"
//                   disabled={true}
//                   aria-label={balanceError}
//                 >
//                   {balanceError}
//                 </Button>
//               ) : chainError ? (
//                 <Button
//                   variant="primary"
//                   className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all"
//                   onClick={() =>
//                     switchChain?.({ chainId: selectedFromChain?.chainId || 1 })
//                   }
//                   aria-label="Review Route Button"
//                 >
//                   {chainError}
//                 </Button>
//               ) : (
//                 <Button
//                   variant="primary"
//                   className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all"
//                   disabled={
//                     !(
//                       selectedFromChain &&
//                       selectedToChain &&
//                       fromAmount &&
//                       selectedFromToken &&
//                       selectedToToken &&
//                       !fetchingQuote &&
//                       selectedRoute
//                     )
//                   }
//                   onClick={startTx}
//                   aria-label="Review Route Button"
//                 >
//                   Review Route
//                 </Button>
//               )}
//             </>
//           )}
//         </div>
//       ) : (
//         <Loader aria-label="Loading Tokens" />
//       )}
//     </>
//   );
// };

// export default SwapCard;
