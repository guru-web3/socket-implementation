"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import Button from "../atoms/Button";
import {
  getFromTokenList,
  getQuote,
  getSupportedChains,
  getToTokenList,
  getUserBalances,
  startRoute,
} from "@/app/services/api/socket";
import { parseUnits } from "viem";

import useSwapStore from "@/store/swapStore";
import useSwapTransactionStore from "@/store/swapTransactionStore";
import { useBungeeTx, useMakeApprovalTx } from "@/app/composibles/useApproval";
import { Token } from "@/app/services/api/socket.interface";

import TokenFilter from "../organisms/TokenFilter";
import FromTokenSelection from "../organisms/FromToken";
import ToTokenSelection from "../organisms/ToToken";
import EnableRefuel from "../organisms/EnableRefuel";
import BridgeRoutes from "../organisms/BridgeRoutes";

const SwapCard = () => {
  const { address } = useAccount();
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const {
    supportedChains,
    fromTokens,
    toTokens,
    selectedFromChain,
    selectedFromToken,
    selectedToToken,
    selectedToChain,
    selectedTokenType,
    userBalance,
    setSupportedChains,
    setFromTokens,
    setToTokens,
    setSelectedFromChain,
    setSelectedToChain,
    setSelectedToToken,
    setSelectedFromToken,
    setSelectedTokenType,
    setUserBalance,
  } = useSwapStore();
  const {
    approve,
  } = useMakeApprovalTx();
  const {
    executeTx,
  } = useBungeeTx();

  const { fromAmount, setRoutes, selectedRoute } =
    useSwapTransactionStore();

  const fetchBalance = async () => {
    if (address) {
      const balance = await getUserBalances({
        userAddress: address,
      });
      setUserBalance(balance.result || []);
    }
  };

  const fetchInitData = async () => {
    try {
      const [supportedChainsResult, toTokenResult, fromTokenResult] =
        await Promise.all([
          getSupportedChains(),
          getToTokenList({
            toChainId: 137,
            fromChainId: 42161,
          }),
          getFromTokenList({
            toChainId: 137,
            fromChainId: 42161,
          }),
        ]);

      if (supportedChainsResult) {
        setSupportedChains(supportedChainsResult.result);
        setSelectedFromChain(supportedChainsResult.result[0]);
        setSelectedToChain(supportedChainsResult.result[1]);
      }
      if (fromTokenResult) setFromTokens(fromTokenResult.result);
      if (toTokenResult) setToTokens(toTokenResult.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateRoutes = async () => {
    // calculate routes
    if (
      selectedFromChain &&
      selectedToChain &&
      fromAmount &&
      selectedFromToken &&
      selectedToToken
    ) {
      setFetchingQuote(true);
      const bigIntFromAmount = parseUnits(fromAmount.toString(), selectedFromToken.decimals);
      const routeResult = await getQuote({
        fromChainId: selectedFromChain.chainId,
        toChainId: selectedToChain.chainId,

        fromTokenAddress: selectedFromToken?.address || "",
        toTokenAddress: selectedToToken?.address || "",

        fromAmount: bigIntFromAmount,
        userAddress: address || "",

        sort: "output",
        defaultSwapSlippage: 0.5,
        isContractCall: false,
        showAutoRoutes: false,

        singleTxOnly: true,
        bridgeWithGas: false,
      });
      setRoutes(routeResult.result?.routes || []);
      setFetchingQuote(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchBalance();
      // in future make this cached from redis and fetch from backend server
      await fetchInitData();
    };
    init();
  }, []);

  const changeNetwork = (chainId: string, option: "from" | "to") => {
    const newSelectedChain = supportedChains?.find(
      (supportedChain) => supportedChain.chainId === parseInt(chainId, 10)
    );
    if (newSelectedChain) {
      if (option === "from") {
        setSelectedFromChain(newSelectedChain);
      } else if (option === "to") {
        setSelectedToChain(newSelectedChain);
      }
    }
  };

  useEffect(() => {
    // update from tokens
    const updateToken = async () => {
      if (selectedFromChain && selectedToChain) {
        const result = await getFromTokenList({
          toChainId: selectedToChain.chainId,
          fromChainId: selectedFromChain.chainId,
        });
        const updatedTokens = result.result.map((token) => {
          const balance =
            userBalance?.find((balance) => balance.address === token.address)
              ?.amount || 0;
          return { ...token, balance };
        });
        const sortedTokens = updatedTokens.sort(
          (a, b) => (b.balance || 0) - (a.balance || 0)
        );

        setFromTokens(sortedTokens);
      }
    };
    updateToken();
  }, [selectedFromChain]);

  useEffect(() => {
    calculateRoutes();
    if (fromAmount) console.log({ fromAmount });
  }, [
    selectedToToken,
    selectedFromToken,
    fromAmount,
    selectedFromChain,
    selectedToChain,
  ]);

  useEffect(() => {
    // update to tokens
    const updateToken = async () => {
      if (selectedFromChain && selectedToChain) {
        const result = await getToTokenList({
          toChainId: selectedToChain.chainId,
          fromChainId: selectedFromChain.chainId,
        });
        const updatedTokens = result.result.map((token) => {
          const balance =
            userBalance?.find((balance) => balance.address === token.address)
              ?.amount || 0;
          return { ...token, balance };
        });
        const sortedTokens = updatedTokens.sort(
          (a, b) => (b.balance || 0) - (a.balance || 0)
        );

        if (result) setToTokens(sortedTokens);
      }
    };
    updateToken();
  }, [selectedToChain]);

  const setSelectedToken = (token: Token) => {
    if (selectedTokenType === "from") {
      setSelectedFromToken(token);
    } else if (selectedTokenType === "to") {
      setSelectedToToken(token);
    }
  };
  const startTx = async () => {
    if (
      selectedFromChain &&
      selectedToChain &&
      fromAmount &&
      selectedFromToken &&
      selectedToToken
    ) {
      // const bigIntFromAmount = parseUnits(fromAmount.toString(), selectedFromToken.decimals);
  
      const routeStarted = await startRoute({
        fromChainId: selectedFromChain?.chainId || 0,
        toChainId: selectedToChain?.chainId || 0,
        fromTokenAddress: selectedFromToken?.address || "",
        toTokenAddress: selectedToToken?.address || "",
        includeFirstTxDetails: true,
        route: selectedRoute,

        userAddress: address || "",
        fromAssetAddress: selectedFromToken?.address || "",
        toAssetAddress: selectedToToken?.address || "",
      });
      // Relevant data from response of /route/start
      // const activeRouteId = routeStarted.result.activeRouteId;
      // const userTxIndex = routeStarted.result.userTxIndex;
      const txTarget = routeStarted.result.txTarget;
      const txData = routeStarted.result.txData;
      const value = routeStarted.result.value;

      if (routeStarted.result.approvalData == null) {
        console.log("Approval is needed", routeStarted.result.approvalData);
        // Params for approval
        const approvalTokenAddress =
          routeStarted.result.approvalData.approvalTokenAddress;
        const allowanceTarget = routeStarted.result.approvalData.allowanceTarget;
        const minimumApprovalAmount =
          routeStarted.result.approvalData.minimumApprovalAmount;
        
        const txHash = await approve({
          allowanceTarget,
          minimumApprovalAmount,
          approvalTokenAddress,
        });
        console.log("Approval txHash", txHash);
      } else {
        console.log("Approval not needed");
      }
      await executeTx(txTarget, value, txData);
    }
  }

  return (
    <div className="bg-[#171721] min-h-[560px] relative mx-auto mt-12 w-full max-w-lg rounded-xl bg-socket-layers-1 px-6 py-6 shadow-card sm:border sm:border-neutral-800" aria-label="Swap Card Container">
      {selectedTokenType ? (
        <TokenFilter
          onSelect={setSelectedToken}
          tokens={
            selectedTokenType === "from"
              ? fromTokens
              : selectedTokenType === "to"
              ? toTokens
              : []
          }
          setIsSelection={setSelectedTokenType}
          aria-label="Token Filter"
        />
      ) : (
        <>
          {/* Header */}
          <div className="mb-3 flex items-center justify-between" aria-label="Swap Card Header">
            <span className="text-xl font-semibold leading-8 text-socket-primary sm:text-2xl" aria-label="Transfer Label">
              Transfer
            </span>
            <div className="flex items-center gap-2" aria-label="Header Buttons">
              <Button
                variant="secondary"
                className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2"
                aria-label="Refresh Button"
              >
                <Image
                  src="/icons/refresh.svg"
                  alt="Refresh"
                  width={18}
                  height={18}
                  aria-label="Refresh Icon"
                />
              </Button>
              <Button
                variant="secondary"
                className="h-10 !w-10 !p-0 flex items-center justify-center rounded-full border border-neutral-800 text-socket-icon-primary hover:bg-socket-layers-2"
                aria-label="Settings Button"
              >
                <Image
                  src="/icons/settings.svg"
                  alt="Settings"
                  width={18}
                  height={18}
                  aria-label="Settings Icon"
                />
              </Button>
            </div>
          </div>
    
          {/* From Section */}
          <FromTokenSelection changeNetwork={changeNetwork} aria-label="From Token Selection" />
    
          {/* Swap Icon */}
          <Button
            variant="secondary"
            className="rounded-full ml-[40%] absolute mt-[-6] h-11 !w-11 !p-0"
            aria-label="Swap Icon Button"
          >
            <Image
              className="rotate-90"
              src="/icons/arrow-up.svg"
              alt="Swap Icon"
              width={18}
              height={18}
              aria-label="Swap Icon"
            />
          </Button>
    
          {/* To Section */}
          <ToTokenSelection changeNetwork={changeNetwork} aria-label="To Token Selection" />
    
          {/* Enable Section */}
          <EnableRefuel aria-label="Enable Refuel Section" />
    
          {/* Bridge Routes */}
          {!fetchingQuote && <BridgeRoutes aria-label="Bridge Routes Section" />}
    
          {/* Add Recipient Address Button */}
          <Button className="w-56 my-4 flex items-center gap-2 bg-[#2C2C2C] text-app-gray-50 rounded-full !p-0 max-h-9 shadow-md hover:bg-[#3A3A3A] transition-all" aria-label="Add Recipient Address Button">
            <span className="flex items-center justify-center w-5 h-5 bg-[#FBC94A] text-black font-bold rounded-full" aria-label="Add Icon">
              +
            </span>
            <span className="text-sm font-medium" aria-label="Add Recipient Address Text">Add Recipient Address</span>
          </Button>
    
          {/* Review Route Button */}
          <Button
            variant="primary"
            className="w-full h-[54px] px-6 py-3 bg-app-primary-500 disabled:bg-[#374151] text-white text-base font-semibold rounded-lg shadow-md transition-all"
            disabled={!(
              selectedFromChain &&
              selectedToChain &&
              fromAmount &&
              selectedFromToken &&
              selectedToToken && !fetchingQuote
            )}
            onClick={startTx}
            aria-label="Review Route Button"
          >
            Review Route
          </Button>
        </>
      )}
    </div>
  );
};

export default SwapCard;
