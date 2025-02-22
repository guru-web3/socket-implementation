"use client";
import React, { useEffect, useState } from "react";
import { formatUnits } from "viem";
import Image from "next/image";

import useSwapTransactionStore from "@/store/swapTransactionStore";
import useSwapStore from "@/store/swapStore";

interface RouteDetails {
  estimateOutput: number;
  estimateTokenOutput: string;
  estimateGasFee: number;
  routeId: string;
  serviceTime?: number;
  providerDetails: {
    name: string;
    displayName: string;
    icon: string;
    securityScore?: number;
    robustnessScore?: number;
  } | null;
  name: string;
}

const BridgeRoutes = () => {
  const {selectedToToken} = useSwapStore();
  const { routes, setToAmount, selectedRoute, setSelectedRoute } = useSwapTransactionStore();
  const [quickestRoute, setQuickestRoute] = useState<RouteDetails | null>(null);
  const [bestReturnRoute, setBestReturnRoute] = useState<RouteDetails | null>(null);

  // Extract protocol details from routes
  const findProtocolDetails = () => {
    if (routes?.length) {
      return routes?.map((route) => {
        const estimateOutput = route.outputValueInUsd || 0;
        const estimateTokenOutput = formatUnits(BigInt(route.toAmount || "0"), selectedToToken?.decimals || 18);
        const estimateGasFee = route.totalGasFeesInUsd || 0;
        let providerDetails = null;

        route?.userTxs?.forEach((tx) => {
          if(!tx.steps || !tx.steps.length) return [];
          tx.steps.forEach((step) => {
            if (step.type === "bridge") {
              providerDetails = step.protocol as {
                name: string;
                displayName: string;
                icon: string;
                securityScore?: number;
                robustnessScore?: number;
              };
            }
          });
        });

        return {
          estimateOutput,
          estimateGasFee,
          providerDetails,
          routeId: route.routeId,
          serviceTime: route.serviceTime,
          name: route.usedBridgeNames?.join(", ") || "Unknown",
          estimateTokenOutput,
        };
      });
    }
    return [];
  };

  // Find quickest and fastest routes
  const findQuickestAndFastestRoutes = (details: RouteDetails[]) => {
    if (details.length === 0) {
      setQuickestRoute(null);
      setBestReturnRoute(null);
      return;
    };

    if(details.length === 1){
      setToAmount(+details[0].estimateTokenOutput);
      setQuickestRoute(details[0]); // Quickest route based on time
      setBestReturnRoute(null); // Fastest route based on output
      routes?.find((route) => {
        if (route.routeId === details[0].routeId) {
          setSelectedRoute(route);
        }
      });
      return;
    }
    // Sort by service time to find the quickest route
    const sortedByTime = [...details].sort(
      (a, b) =>
        (a.serviceTime || 0) - (b.serviceTime || 0)
    );

    // Sort by output value to find the fastest in terms of output
    const sortedByOutput = [...details].sort(
      (a, b) => b.estimateOutput - a.estimateOutput
    );

    setQuickestRoute(sortedByTime[0]); // Quickest route based on time
    setBestReturnRoute(sortedByOutput[0]); // Fastest route based on output
    setToAmount((+sortedByOutput[0].estimateTokenOutput));
    routes?.find((route) => {
      if (route.routeId === sortedByOutput[0].routeId) {
        setSelectedRoute(route);
      }
    });
  };

  useEffect(() => {
    const result = findProtocolDetails();
    findQuickestAndFastestRoutes(result);
  }, [routes]);

  return (
    <>
      {/* Bridge Routes */}
      {routes && routes.length > 0 && (
        <div className="bg-[#171721] mt-4 rounded-lg shadow-md w-full max-w-lg mx-auto" aria-label="Bridge Routes Container">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 px-4" aria-label="Bridge Routes Header">
            <h3 className="text-app-gray-50 text-lg font-semibold" aria-label="Select Bridge Route">
              Select Bridge Route
            </h3>
            <button className="text-primaryPurple text-sm hover:text-purple-400 transition" aria-label={`View all ${routes.length} Routes`}>
              View all {routes.length} Routes →
            </button>
          </div>
    
          {/* Best Return Route */}
          {bestReturnRoute && (
            <div
              className={`p-4 rounded-lg border border-purple-400 bg-socket-layers-2 hover:bg-[#252534] transition`}
              onClick={() => {
                const selectedRoute = routes?.find((route) => route.routeId === bestReturnRoute.routeId);
                if (selectedRoute) {
                  setSelectedRoute(selectedRoute);
                }
              }}
              aria-label="Best Return Route"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      bestReturnRoute.providerDetails?.icon ||
                      "/icons/placeholder.svg"
                    }
                    alt={bestReturnRoute.providerDetails?.displayName || "Bridge"}
                    width={32}
                    height={32}
                    className="rounded-full"
                    aria-label="Best Return Route Icon"
                  />
                  <div>
                    <p className="text-app-gray-50 font-medium flex items-center gap-2" aria-label="Best Return Route Name">
                      {bestReturnRoute.name}{" "}
                      <span className="text-app-gray-300 text-sm" aria-label="Best Return Route Service Time">
                        ~ {bestReturnRoute.serviceTime}
                      </span>
                    </p>
                    <p className="text-app-gray-300 text-sm" aria-label="Best Return Route Estimation">
                      Est. Output:{" "}
                      <span className="text-app-gray-50 font-medium" aria-label="Best Return Route Estimated Output">
                        {Number(bestReturnRoute.estimateTokenOutput).toFixed(3)} {selectedToToken?.symbol}
                      </span>{" "}
                      · Gas Fees:{" "}
                      <span className="text-app-gray-50 font-medium" aria-label="Best Return Route Gas Fees">
                        ${Number(bestReturnRoute.estimateGasFee).toFixed(3)}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="px-2 py-[2px] text-xs font-semibold rounded-md bg-[#16A34A] text-white" aria-label="Best Return Badge">
                  BEST RETURN
                </span>
              </div>
            </div>
          )}
    
          {/* Quickest Route */}
          {quickestRoute && (
            <div
              className={`p-4 rounded-lg border border-transparent bg-socket-layers-2 hover:bg-[#252534] transition`}
              onClick={() => {
                const selectedRoute = routes?.find((route) => route.routeId === quickestRoute.routeId);
                if (selectedRoute) {
                  setSelectedRoute(selectedRoute);
                }
              }}
              aria-label="Quickest Route"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      quickestRoute.providerDetails?.icon ||
                      "/icons/placeholder.svg"
                    }
                    alt={quickestRoute.providerDetails?.displayName || "Bridge"}
                    width={32}
                    height={32}
                    className="rounded-full"
                    aria-label="Quickest Route Icon"
                  />
                  <div>
                    <p className="text-app-gray-50 font-medium flex items-center gap-2" aria-label="Quickest Route Name">
                      {quickestRoute.name}{" "}
                      <span className="text-app-gray-300 text-sm" aria-label="Quickest Route Service Time">
                        ~ {quickestRoute.serviceTime}
                      </span>
                    </p>
                    <p className="text-app-gray-300 text-sm" aria-label="Quickest Route Estimation">
                      Est. Output:{" "}
                      <span className="text-app-gray-50 font-medium" aria-label="Quickest Route Estimated Output">
                        {Number(quickestRoute.estimateTokenOutput).toFixed(3)} {selectedToToken?.symbol}
                      </span>{" "}
                      · Gas Fees:{" "}
                      <span className="text-app-gray-50 font-medium" aria-label="Quickest Route Gas Fees">
                        ${Number(quickestRoute.estimateGasFee).toFixed(3)}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="px-2 py-[2px] text-xs font-semibold rounded-md bg-[#1E50FF] text-white" aria-label="Fastest Badge">
                  FASTEST
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BridgeRoutes;
