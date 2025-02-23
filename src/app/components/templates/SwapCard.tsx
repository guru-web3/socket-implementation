"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useSwitchChain } from "wagmi";
import Button from "../atoms/Button";
import { parseUnits } from "viem";
import dynamic from "next/dynamic";

import useSwapStore from "@/store/swapStore";
import useSwapTransactionStore from "@/store/swapTransactionStore";
import { useBungeeTx, useMakeApprovalTx } from "@/app/composibles/useApproval";
import { Token } from "@/app/services/api/socket.interface";
import { startRoute } from "@/app/services/api/socket";
import { Loader } from "../molecules/Loader";

const TokenFilter = dynamic(() => import("../organisms/TokenFilter").then((module) => module.default), { ssr: false });
const FromTokenSelection = dynamic(() => import("../organisms/FromToken").then((module) => module.default), { ssr: false });
const ToTokenSelection = dynamic(() => import("../organisms/ToToken").then((module) => module.default), { ssr: false });
const EnableRefuel = dynamic(() => import("../organisms/EnableRefuel").then((module) => module.default), { ssr: false });
const BridgeRoutes = dynamic(() => import("../organisms/BridgeRoutes").then((module) => module.default), { ssr: false });

const SwapCard = () => {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const {
    supportedChains, fromTokens, toTokens, selectedFromChain, selectedFromToken, selectedToToken, selectedToChain,
    setSelectedTokenType, selectedTokenType, fetchUserBalances, fetchSupportedChains, setSelectedFromChain,
    setSelectedToChain, setSelectedFromToken, setSelectedToToken,
  } = useSwapStore();
  const { approve } = useMakeApprovalTx();
  const { executeTx } = useBungeeTx();
  const { fromAmount, isRefuelEnabled, selectedRoute, fetchQuote, setFetchingQuote, fetchingQuote } = useSwapTransactionStore();
  const [balanceError, setBalanceError] = useState("");
  const [chainError, setChainError] = useState("");

  useEffect(() => {
    const init = async () => {
      if (address) {
        await fetchUserBalances(address);
        await fetchSupportedChains();
      }
    };
    init();
  }, [address]);

  useEffect(() => {
    const setInitChain = async () => {
      if (!selectedFromChain && supportedChains.length) {
        const defaultChain = supportedChains.find((chain) => chain.chainId === 1);
        const defaultToChain = supportedChains.find((chain) => chain.chainId === 10);
        if(defaultChain) {
          await setSelectedFromChain(defaultChain);
        } if (defaultToChain) {
          await setSelectedToChain(defaultToChain);
        }
      }
    };
    setInitChain();
  }, [supportedChains]);

  useEffect(() => {
    if (selectedFromToken && fromAmount && fromAmount > selectedFromToken.balance) {
      setBalanceError("Insufficient Balance");
    } else {
      setBalanceError("");
    }
  }, [fromAmount, selectedFromToken]);

  useEffect(() => {
    if (selectedFromChain && chain?.id !== selectedFromChain?.chainId) {
      setChainError(`Switch to ${selectedFromChain?.name}`);
    } else {
      setChainError("");
    }
  }, [chain, selectedFromChain]);

  useEffect(() => {
    calculateRoutes();
  }, [selectedToToken, selectedFromToken, fromAmount, selectedFromChain, selectedToChain]);

  const calculateRoutes = async () => {
    if (selectedFromChain && selectedToChain && fromAmount && selectedFromToken && selectedToToken) {
      setFetchingQuote(true);
      const bigIntFromAmount = parseUnits(fromAmount.toString(), selectedFromToken.decimals);
      await fetchQuote({
        fromChainId: selectedFromChain.chainId, toChainId: selectedToChain.chainId,
        fromTokenAddress: selectedFromToken?.address || "", toTokenAddress: selectedToToken?.address || "",
        fromAmount: bigIntFromAmount, userAddress: address || "", sort: "output", defaultSwapSlippage: 0.5,
        isContractCall: false, showAutoRoutes: false, singleTxOnly: true, bridgeWithGas: isRefuelEnabled || false,
      });
      setFetchingQuote(false);
    }
  };

  const changeNetwork = (chainId: string, option: "from" | "to") => {
    const newSelectedChain = supportedChains?.find((chain) => chain.chainId === parseInt(chainId, 10));
    if (newSelectedChain) {
      return option === "from" ? setSelectedFromChain(newSelectedChain) : setSelectedToChain(newSelectedChain);
    }
  };

  const setSelectedToken = (token: Token) => {
    return selectedTokenType === "from" ? setSelectedFromToken(token) : setSelectedToToken(token);
  };

  const startTx = async () => {
    if (selectedFromChain && selectedToChain && fromAmount && selectedFromToken && selectedToToken) {
      const routeStarted = await startRoute({
        fromChainId: selectedFromChain?.chainId || 0, toChainId: selectedToChain?.chainId || 0,
        fromTokenAddress: selectedFromToken?.address || "", toTokenAddress: selectedToToken?.address || "",
        includeFirstTxDetails: true, route: selectedRoute, userAddress: address || "",
        fromAssetAddress: selectedFromToken?.address || "", toAssetAddress: selectedToToken?.address || "",
      });
      const { txTarget, txData, value, approvalData } = routeStarted.result;
      if (approvalData) {
        const { approvalTokenAddress, allowanceTarget, minimumApprovalAmount } = approvalData;
        await approve({ allowanceTarget, minimumApprovalAmount, approvalTokenAddress });
      }
      await executeTx(txTarget, value, txData);
    }
  };

  return (
    <>
      {address ? (
        <div className="bg-app-dark-surface3 min-h-[560px] relative mx-auto mt-12 w-full max-w-lg rounded-xl bg-socket-layers-1 px-6 py-6 shadow-card sm:border sm:border-neutral-800" aria-label="Swap Card Container">
          {selectedTokenType ? (
            <TokenFilter onSelect={setSelectedToken} tokens={selectedTokenType === "from" ? fromTokens : toTokens} setIsSelection={setSelectedTokenType} aria-label="Token Filter" />
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between" aria-label="Swap Card Header">
                <span className="text-xl font-semibold leading-8 text-socket-primary sm:text-2xl" aria-label="Transfer Label">Transfer</span>
                <div className="flex items-center gap-2" aria-label="Header Buttons">
                  <Button variant="secondary" className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2" aria-label="Refresh Button">
                    <Image src="/icons/refresh.svg" alt="Refresh" width={18} height={18} aria-label="Refresh Icon" />
                  </Button>
                  <Button variant="secondary" className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2" aria-label="Settings Button">
                    <Image src="/icons/settings.svg" alt="Settings" width={18} height={18} aria-label="Settings Icon" />
                  </Button>
                </div>
              </div>
              <FromTokenSelection changeNetwork={changeNetwork} aria-label="From Token Selection" />
              <Button variant="secondary" className="rounded-full ml-[40%] absolute mt-[-6] h-11 !w-11 !p-0" aria-label="Swap Icon Button">
                <Image className="rotate-90" src="/icons/arrow-up.svg" alt="Swap Icon" width={18} height={18} aria-label="Swap Icon" />
              </Button>
              <ToTokenSelection changeNetwork={changeNetwork} aria-label="To Token Selection" />
              <EnableRefuel aria-label="Enable Refuel Section" />
              <BridgeRoutes aria-label="Bridge Routes Section" />
              <Button className="w-56 my-4 flex items-center gap-2 bg-neutral-800 text-app-gray-50 rounded-full !p-0 max-h-9 shadow-md hover:bg-neutral-700 transition-all" aria-label="Add Recipient Address Button">
                <span className="flex items-center justify-center w-5 h-5 bg-amber-300 text-black font-bold rounded-full" aria-label="Add Icon">+</span>
                <span className="text-sm font-medium" aria-label="Add Recipient Address Text">Add Recipient Address</span>
              </Button>
              {balanceError ? (
                <Button variant="primary" className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all" disabled={true} aria-label={balanceError}>{balanceError}</Button>
              ) : chainError ? (
                <Button variant="primary" className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all" onClick={() => switchChain?.({ chainId: selectedFromChain?.chainId || 1 })} aria-label="Review Route Button">{chainError}</Button>
              ) : (
                <Button variant="primary" className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-md transition-all" disabled={!selectedFromChain || !selectedToChain || !fromAmount || !selectedFromToken || !selectedToToken || fetchingQuote || !selectedRoute} onClick={startTx} aria-label="Review Route Button">Review Route</Button>
              )}
            </>
          )}
        </div>
      ) : (
        <Loader aria-label="Loading Tokens" />
      )}
    </>
  );
};

export default SwapCard;