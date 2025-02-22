"use client";
import React, { useEffect, useState } from "react";

import {
  useAccount,
  useBalance,
  useSwitchChain,
  useWriteContract,
  useWaitForTransactionReceipt,
  useEstimateGas,
  useConnectorClient,
  Config,
  usePublicClient,
} from "wagmi";
import { formatEther, parseGwei } from 'viem'
import { sepolia } from "wagmi/chains";
import Image from "next/image";
import type { SafeConfig } from "@safe-global/protocol-kit";

import { WETH_SEPOLIA_CONTRACT } from "@/app/constants/transaction";
import useTransactionStore from "@/store/activityStore";

import { useToast } from "@/context/ToastContex";
import WethAbi from "../../constants/wethAbi.json";
import { TextInput } from "../atoms/TextInput";
import Button from "../atoms/Button";

const WrapUnwrapCard = () => {
  const publicClient = usePublicClient();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { addToast } = useToast();
  const { postTransaction } = useTransactionStore();

  const [wrapAmount, setWrapAmount] = useState("");
  const [unWrapAmount, setUnwrapAmount] = useState("");

  const [safeEnabled, setSafeEnabled] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [unWrapLoading, setUnWrapLoading] = useState(false);

  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [wrapError, setWrapError] = useState<string>("");
  const [unWrapError, setUnWrapError] = useState<string>("");

  // Balances
  const { data: ethBalance } = useBalance({ address });
  const { data: wethBalance } = useBalance({
    address,
    token: WETH_SEPOLIA_CONTRACT,
  });

  // Transaction status
  const { status: txStatus } = useWaitForTransactionReceipt({ hash: txHash });
  const { data: connectorData } = useConnectorClient<Config>();

  // Gas estimation
  const wrapGas = useEstimateGas({
    account: address,
    to: WETH_SEPOLIA_CONTRACT,
    data: "0xd0e30db0",
    value: wrapAmount ? BigInt(parseFloat(wrapAmount) * 1e18) : undefined,
  });

  const { writeContractAsync } = useWriteContract();

  const handleMaxWrap = async () => {
    
    if (!ethBalance?.value || !wrapGas.data) return;
    try {
      // Get current block base fee
      const block = await publicClient?.getBlock();
      const baseFeePerGas = block?.baseFeePerGas;
      
      if (!baseFeePerGas) throw new Error('EIP-1559 not supported');
  
      // Set priority fee (2 Gwei in this example)
      const priorityFeePerGas = parseGwei('3'); 
  
      // Calculate total gas cost
      const totalGasCost = (baseFeePerGas + priorityFeePerGas) * wrapGas.data;
  
      // Calculate max sendable amount
      const maxValue = ethBalance.value > totalGasCost 
        ? ethBalance.value - totalGasCost
        : 0n;
  
      setWrapAmount(Number(formatEther(maxValue)).toFixed(5));
  
    } catch (error) {
      console.error('Gas estimation error:', error);
      // Fallback to simple gas subtraction
      const maxValue = ethBalance.value - wrapGas.data;
      setWrapAmount((Number(maxValue) / 1e18).toFixed(4));
    }
  };

  useEffect(() => {
    if (wrapAmount && ethBalance?.value) {
      if (parseFloat(wrapAmount) > Number(ethBalance.value) / 1e18) {
        setWrapError("Insufficient Balance");
      } else {
        setWrapError("");
      }
    }
  }, [wrapAmount]);

  useEffect(() => {
    if (unWrapAmount && ethBalance?.value) {
      if (parseFloat(unWrapAmount) > Number(wethBalance?.value) / 1e18) {
        setUnWrapError("Insufficient Balance");
      } else {
        setUnWrapError("");
      }
    }
  }, [unWrapAmount]);

  const handleMaxUnwrap = () => {
    if (!wethBalance?.value) return;
    setUnwrapAmount((Number(wethBalance.value) / 1e18).toFixed(4));
  };

  const postTransactionApi = async (wrapType: "wrap" | "unwrap", hash: string) => {
    if (wrapType === "wrap") {
      await postTransaction(wrapType, hash, address || "", wrapAmount, "0")
    } else {
      await postTransaction(wrapType, txHash || "", address || "", "0", wrapAmount)
    }
  }

  const handleWrap = async () => {
    if (!address || chain?.id !== sepolia.id) return;
    
    try {
      setLoading(true);
      const value = BigInt(parseFloat(wrapAmount) * 1e18);
      // The module is only loaded on the client is address is sfa during handle wrap
      if (safeEnabled) {
        // dynamically loads
        const SafeKit = (await import('@safe-global/protocol-kit')).default
        const apiKit = (await import("@safe-global/api-kit")).default

        const safeSDK = await SafeKit.init({ 
          safeAddress: safeAddress as `0x${string}`, 
          provider: connectorData?.transport as SafeConfig["provider"],
        });
        const signerAddress = (await safeSDK.getSafeProvider().getSignerAddress()) || '0x'

        const safeTx = await safeSDK.createTransaction({
          transactions: [{
            to: WETH_SEPOLIA_CONTRACT,
            value: value.toString(),
            // deposit hex
            data: "0xd0e30db0",
          }]
        });

        const txHash = await safeSDK.getTransactionHash(safeTx);
        const signature = await safeSDK.signHash(txHash);
        
        console.log({txHash});

        const api = new apiKit({ 
          chainId: BigInt(sepolia.id),
        });
        await api.proposeTransaction({
          safeAddress,
          safeTransactionData: safeTx.data,
          safeTxHash: txHash,
          senderAddress: signerAddress!,
          senderSignature: signature.data
        });
        await postTransactionApi("wrap", txHash);
        setTxHash(txHash as `0x${string}`);
      } else {
        const hash = await writeContractAsync({
          address: WETH_SEPOLIA_CONTRACT,
          abi: WethAbi,
          functionName: "deposit",
          value,
        });
        await postTransactionApi("wrap", hash);
        // post to tx api
        // store in redis with expiry of 10 minutes
        // while fetching from transaction activity api, check if tx is in redis
        // if yes, use txhash fetch from eth scan if not present in eth scan
        // get the transaction details from api and format it to show in the UI
        setTxHash(hash);
        console.log({ hash });
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      addToast("error", (error as {shortMessage: string}).shortMessage || (error as Error).message || "Transaction failed")
    } finally {
      setLoading(false);
    }
  };

  const handleUnwrap = async () => {
    if (!address || chain?.id !== sepolia.id) return;

    try {
      setUnWrapLoading(true);
      const value = BigInt(parseFloat(unWrapAmount) * 1e18);

      const hash = await writeContractAsync({
        address: WETH_SEPOLIA_CONTRACT,
        abi: WethAbi,
        functionName: "withdraw",
        args: [value],
      });
      await postTransactionApi("unwrap", hash);
      
      setTxHash(hash);
    } catch (error) {
      console.error("Unwrap failed:", error);
      addToast("error", (error as {shortMessage: string}).shortMessage || (error as Error).message || "Transaction failed")
    } finally {
      setUnWrapLoading(false);
    }
  };

  if (chain?.id !== sepolia.id) {
    return (
      <div className="bg-app-dark-surface3 p-4 rounded-xl border border-neutral-800 text-center">
        <div className="mb-3 flex flex-col items-center gap-2">
          <Image
            src="/icons/settings.svg"
            alt="Warning"
            width={40}
            height={40}
            className="mb-2"
          />
          <p className="text-app-gray-50">Please switch to Sepolia network</p>
          <button
            onClick={() => switchChain?.({ chainId: sepolia.id })}
            className="mt-2 hover:bg-purple-400 text-white px-4 py-2 rounded-full transition-colors"
            aria-label="Switch to Sepolia network"
          >
            Switch Network
          </button>
        </div>
      </div>
    );
  }

  return (
    chain?.id == sepolia.id && (
    <div className="bg-app-dark-surface3 relative mx-auto w-full max-w-lg rounded-xl border border-neutral-800 p-6 shadow-card">
      {/* Safe Wallet Toggle */}
      <div className="mb-4 h-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="refuel-toggle" className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="refuel-toggle"
              className="sr-only peer"
              checked={safeEnabled}
              onChange={(e) => setSafeEnabled(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-600 border:bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-purple-500 peer-checked:bg-purple-500 transition-all"></div>
            <span className="absolute left-[4px] top-[2px] w-5 h-5 bg-white rounded-full peer-checked:translate-x-full transition-transform"></span>
          </label>
          <span className="text-app-gray-50 text-sm">Use Safe Wallet</span>
        </div>
        
        {safeEnabled && (
          <input
            type="text"
            value={safeAddress}
            onChange={(e) => setSafeAddress(e.target.value)}
            placeholder="Safe address..."
            className="w-48 px-3 py-1 bg- bg-app-dark-surface2 border border-neutral-800 rounded-lg text-app-gray-50 text-sm focus:outline-none"
            aria-label="Safe Wallet Address"
          />
        )}
      </div>

      {/* Cards Container */}
      <div className="space-y-4">
        {/* Wrap Card */}
        <div className="bg- bg-app-dark-surface2 rounded-lg border border-neutral-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-app-gray-50 font-medium text-nowrap">Wrap-ETH</h3>
            <Button
              onClick={handleMaxWrap}
              className="text-purple-500 text-sm hover:text-purple-400 !justify-end"
              aria-label="Set max ETH to wrap"
            >
              Max: {Number(ethBalance?.formatted || 0).toFixed(4)} ETH
            </Button>
          </div>
          
          <div className="flex gap-2 justify-center items-center">
            <TextInput
              placeholder="0.0"
              type="number"
              inputSize="lg"
              pill={true}
              error={!!wrapError}
              value={wrapAmount}
              onChange={(e) => setWrapAmount(e.target.value)}
              EndSlot={<span className="text-neutral-500">ETH</span>}
              helperText={wrapError}
              className="w-full"
            />
            <Button
              onClick={handleWrap}
              loading={loading}
              disabled={loading || !wrapAmount}
              className={`!h-12 !w-28 px-6 py-3 rounded-lg font-medium transition-colors ${
                loading || !wrapAmount 
                  ? 'bg-neutral-800 text-app-gray-400 cursor-not-allowed'
                  : '  bg-purple-400 text-white'
              }`}
              aria-label="Wrap ETH to WETH"
            >
              {loading ? "" : "Wrap"}
            </Button>
          </div>
        </div>

        {/* Unwrap Card */}
        <div className="bg- bg-app-dark-surface2 rounded-lg border border-neutral-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-app-gray-50 font-medium">Unwrap WETH</h3>
            <Button
              onClick={handleMaxUnwrap}
              className="text-purple-500 text-sm hover:text-purple-400 !justify-end"
              aria-label="Set max WETH to unwrap"
            >
              Max: {Number(wethBalance?.formatted || 0).toFixed(4)} WETH
            </Button>
          </div>
          
        <div className="flex gap-2 justify-center items-center">
          <TextInput
              placeholder="0.0"
              type="number"
              inputSize="lg"
              pill={true}
              error={!!unWrapError}
              value={unWrapAmount}
              onChange={(e) => setUnwrapAmount(e.target.value)}
              EndSlot={<span className="text-neutral-500">wETH</span>}
              helperText={unWrapError}
              className="w-full"
            />
            <Button
              onClick={handleUnwrap}
              loading={unWrapLoading}
              disabled={unWrapLoading || !unWrapAmount}
              className={`!h-12 !w-28 px-6 py-3 rounded-lg font-medium transition-colors ${
                unWrapLoading || !unWrapAmount 
                  ? 'bg-neutral-800 text-app-gray-400 cursor-not-allowed'
                  : ' bg-purple-400 text-white'
              }`}
              aria-label="Wrap ETH to WETH"
            >
              {unWrapLoading ? "" : "Unwrap"}
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Status */}
      {txStatus === "success" && (
        <div className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg text-center text-sm">
          Transaction confirmed successfully!
        </div>
      )}
    </div>
    )
  );
};

export default WrapUnwrapCard;
