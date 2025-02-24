import { useWriteContract, useAccount, useSendTransaction } from "wagmi";
import { createPublicClient, encodeFunctionData, http } from "viem";
// Get from Safe contracts repo
import ERC20_ABI from "../constants/erc20.json";

export function useMakeApprovalTx() {
  const { chain } = useAccount();

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });

  const {
    writeContractAsync,
    isPending,
    error,
    data: txHash,
  } = useWriteContract();

  interface ApproveParams {
    allowanceTarget: string;
    minimumApprovalAmount: bigint;
    approvalTokenAddress: string;
  }

  const approve = async ({
    allowanceTarget,
    minimumApprovalAmount,
    approvalTokenAddress,
  }: ApproveParams) => {
    const gasEstimate: bigint = await publicClient.estimateGas({
      account: allowanceTarget,
      to: approvalTokenAddress,
      data: encodeFunctionData({
        abi: ERC20_ABI,
        functionName: "approve",
        args: [allowanceTarget, minimumApprovalAmount],
      }),
    });
    const txHash = await writeContractAsync({
      abi: ERC20_ABI,
      address: approvalTokenAddress,
      functionName: "approve",
      args: [allowanceTarget, minimumApprovalAmount],
      gas: gasEstimate,
    });
    await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });
  };

  return {
    approve,
    isApproving: isPending,
    error,
    txHash,
  };
}

export function useBungeeTx() {
  const { chain, address } = useAccount();

  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });

  // Send transaction
  const {
    sendTransactionAsync,
    isPending,
    isSuccess,
    data: txHash,
    error,
  } = useSendTransaction();

  const executeTx = async (txTarget: string, value: string, txData: string) => {
    const gasEstimate: bigint = await publicClient.estimateGas({
      to: txTarget,
      account: address,
      //   value: BigInt("0x0"),
      data: txData as `0x${string}`,
    });

    return sendTransactionAsync({
      to: txTarget as `0x${string}`,
      value: BigInt("0x0"),
      data: txData as `0x${string}`,
      gas: gasEstimate,
    });
  };

  return {
    executeTx,
    isPending,
    isSuccess,
    txHash,
    error,
  };
}
