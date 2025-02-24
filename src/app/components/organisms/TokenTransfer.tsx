import { useState, useEffect } from "react";
import { useAccount, useSendTransaction, useSwitchChain } from "wagmi";
import Image from "next/image";
import {
  createPublicClient,
  http,
  parseUnits,
  encodeFunctionData,
  parseGwei,
  formatEther,
} from "viem";
import { mainnet } from "viem/chains";
import { useRouter } from "next/navigation";

import ERC20_ABI from "../../constants/erc20.json";
import {
  chainIdToViemChain,
  validateAddress,
} from "@/app/services/common-utils/chainUtils";
import { TokenCardProps } from "@/app/composibles/useAssetsBalance";
import { TextInput } from "../atoms/TextInput";
import { useToast } from "@/context/ToastContex";
import Button from "../atoms/Button";

interface TokenTransferProps {
  selectedToken: TokenCardProps;
}

export const TokenTransfer = ({ selectedToken }: TokenTransferProps) => {
  const router = useRouter();
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const { sendTransactionAsync } = useSendTransaction();
  const { addToast } = useToast();

  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [gasEstimate, setGasEstimate] = useState<string>("0");
  const [transferError, setTransferError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState("");

  // Initialize public client with multicall support
  const [publicClient, setPublicClient] = useState(
    createPublicClient({
      chain: selectedToken
        ? chainIdToViemChain(selectedToken.chainId)
        : mainnet, // Default chain, will override per token
      transport: http(),
    }),
  );

  useEffect(() => {
    console.log({ selectedToken });
    setPublicClient(
      createPublicClient({
        chain: selectedToken
          ? chainIdToViemChain(selectedToken.chainId)
          : mainnet, // Default chain, will override per token
        transport: http(),
      }),
    );
  }, [selectedToken]);

  useEffect(() => {
    if (amount && selectedToken?.balance) {
      if (parseFloat(amount) > Number(selectedToken?.balance)) {
        setTransferError("Insufficient Balance");
      } else {
        setTransferError("");
      }
    }
  }, [amount]);

  useEffect(() => {
    if (amount && !toAddress) {
      setIsValidAddress("Address is needed");
    } else if (amount && !validateAddress(toAddress)) {
      setIsValidAddress("Invalid Address");
    } else {
      setIsValidAddress("");
    }
  }, [toAddress, amount]);

  // Update gas estimate when amount or token changes
  useEffect(() => {
    if (selectedToken && amount) estimateGas();
  }, [selectedToken, amount]);

  const estimateGas = async () => {
    if (!address || chain?.id !== selectedToken.chainId) return;

    try {
      if (!selectedToken || !amount || !address) return;

      // Parse the input amount to the token's smallest unit
      const value = parseUnits(amount, selectedToken.decimals);

      // Fetch the current block to get base fee and priority fee
      const block = await publicClient.getBlock();
      const baseFeePerGas = block?.baseFeePerGas;

      if (!baseFeePerGas) {
        throw new Error("EIP-1559 not supported on this chain");
      }

      // Set priority fee (e.g., 2 Gwei)
      const priorityFeePerGas = parseGwei("2.4");

      let gasEstimate;

      if (selectedToken.isErc20) {
        // Estimate gas for ERC20 transfer
        gasEstimate = await publicClient.estimateGas({
          account: address as `0x${string}`,
          to: selectedToken.address as `0x${string}`,
          data: encodeFunctionData({
            abi: ERC20_ABI,
            functionName: "transfer",
            args: [address, value],
          }),
        });
      } else {
        // Estimate gas for native ETH transfer
        gasEstimate = await publicClient.estimateGas({
          account: address as `0x${string}`,
          value,
        });
      }

      // Calculate total gas cost: (base fee + priority fee) x gas units
      const totalGasCost = (baseFeePerGas + priorityFeePerGas) * gasEstimate;

      // Convert total gas cost to native token units (ETH, MATIC, etc.)
      const formattedGasCost = formatEther(totalGasCost);

      setGasEstimate(`${formattedGasCost}`);
    } catch (error) {
      console.error("Error calculating gas:", error);
      setGasEstimate("Error calculating gas");
    }
  };

  // Validate token balance
  const validateBalance = () => {
    if (!address || chain?.id !== selectedToken.chainId) return;

    const inputAmount = parseFloat(amount);
    const tokenBalance = parseFloat(selectedToken?.balance || "0");

    return inputAmount <= tokenBalance;
  };

  // Handle token transfer
  const handleTransfer = async () => {
    if (chain?.id !== selectedToken.chainId) {
      addToast("error", `Change to ${selectedToken.chainId} and try again!`);
      return;
    }

    if (!validateBalance()) {
      addToast("error", "Insufficient balance");
      return;
    }
    setIsLoading(true);
    try {
      const value = parseUnits(amount, selectedToken.decimals);

      const txHash = await sendTransactionAsync(
        selectedToken?.isErc20
          ? {
              to: selectedToken.address,
              data: encodeFunctionData({
                abi: ERC20_ABI,
                functionName: "transfer",
                args: [toAddress || address, value],
              }),
            }
          : { value },
      );

      // post transaction
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hash: txHash,
          type: selectedToken?.isErc20 ? "ERC20" : "NATIVE",
          to: selectedToken.address,
          value: value.toString(),
          tokenSymbol: selectedToken?.symbol,
          tokenDecimal: selectedToken?.decimals,
          address: address,
          chainId: chain.id,
        }),
      });

      router.push(`/activity`);
    } catch (err) {
      addToast(
        "error",
        (err as { shortMessage: string }).shortMessage ||
          (err as Error).message ||
          "Transaction failed",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (chain?.id !== selectedToken.chainId) {
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
          <p className="text-app-gray-50">
            Please switch to {selectedToken.network} network
          </p>
          <button
            onClick={() => switchChain?.({ chainId: selectedToken.chainId })}
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
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg">
      {/* Amount Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2" aria-label="Amount">
          Amount
        </label>
        <TextInput
          placeholder="0.0"
          type="number"
          inputSize="lg"
          pill={true}
          error={!!transferError}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          EndSlot={
            <span className="text-neutral-500" aria-label="ETH">
              {selectedToken.symbol}
            </span>
          }
          helperText={transferError}
          className="w-full"
          aria-label="Amount Input"
        />
        <TextInput
          placeholder="Your Address"
          type="text"
          inputSize="lg"
          error={!!isValidAddress}
          pill={true}
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          helperText={isValidAddress}
          className="w-full my-3"
          aria-label="Eth Address"
        />
        {selectedToken && (
          <div
            className="mt-2 text-sm text-center text-gray-600"
            aria-label="Balance"
          >
            Balance: {selectedToken.balance} {selectedToken.symbol}
          </div>
        )}
      </div>

      {/* Gas Estimate */}
      {selectedToken && (
        <div className="mb-4">
          <div
            className="text-sm text-center text-gray-600"
            aria-label="Estimated Gas"
          >
            Estimated Gas: {gasEstimate} {chain?.nativeCurrency.symbol}
          </div>
        </div>
      )}

      {/* Transfer Button */}
      <Button
        onClick={handleTransfer}
        disabled={!selectedToken || !amount || !!transferError}
        className={`rounded-lg font-medium transition-colors ${
          !selectedToken || !amount || !!transferError || !!isValidAddress
            ? "bg-neutral-800 text-app-gray-400 cursor-not-allowed"
            : " bg-purple-400 text-white"
        }`}
        aria-label="Send Transaction Button"
      >
        {isLoading ? "Processing..." : "Send Transaction"}
      </Button>
    </div>
  );
};
