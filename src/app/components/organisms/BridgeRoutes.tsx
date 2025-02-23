"use client";
import React, { useEffect, useState } from "react";
import { formatUnits } from "viem";
import Image from "next/image";

import useSwapTransactionStore from "@/store/swapTransactionStore";
import useSwapStore from "@/store/swapStore";
import { Loader } from "../molecules/Loader";

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
  const { selectedToToken } = useSwapStore();
  const {
    setToAmount,
    setSelectedRoute,
    routes,
    selectedRoute,
    fetchingQuote,
  } = useSwapTransactionStore();
  const [quickestRoute, setQuickestRoute] = useState<RouteDetails | null>(null);
  const [bestReturnRoute, setBestReturnRoute] = useState<RouteDetails | null>(
    null
  );

  // Extract protocol details from routes
  const extractProtocolDetails = () => {
    if (!routes?.length) return [];

    return routes.map((route) => {
      const estimateOutput = route.outputValueInUsd || 0;
      const estimateTokenOutput = formatUnits(
        BigInt(route.toAmount || "0"),
        selectedToToken?.decimals || 18
      );
      const estimateGasFee = route.totalGasFeesInUsd || 0;

      const providerDetails =
        route.userTxs
          ?.flatMap((tx) => tx.steps)
          .find((step) => step.type === "bridge")?.protocol || null;

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
  };

  useEffect(() => {
    if (!selectedRoute && bestReturnRoute) {
      const defaultSelectedRoute = routes?.find(
        (route) => route.routeId === bestReturnRoute?.routeId
      );
      if (defaultSelectedRoute) setSelectedRoute(defaultSelectedRoute);
    }
  }, [selectedRoute]);
  // Find quickest and best-return routes
  const findOptimalRoutes = (details: RouteDetails[]) => {
    if (!details.length || !routes?.length) {
      setQuickestRoute(null);
      setBestReturnRoute(null);
      return;
    }

    // Sort by service time (quickest)
    const sortedByTime = [...details].sort(
      (a, b) => (a.serviceTime || Infinity) - (b.serviceTime || Infinity)
    );

    // Sort by output value (best return)
    const sortedByOutput = [...details].sort(
      (a, b) => b.estimateOutput - a.estimateOutput
    );

    setQuickestRoute(sortedByTime[0]);
    setBestReturnRoute(sortedByOutput[0]);

    // Set default selection to best return route
    setToAmount(+sortedByOutput[0].estimateTokenOutput);
    const defaultSelectedRoute = routes?.find(
      (route) => route.routeId === sortedByOutput[0].routeId
    );
    if (defaultSelectedRoute) setSelectedRoute(defaultSelectedRoute);
  };

  useEffect(() => {
    const protocolDetails = extractProtocolDetails();
    findOptimalRoutes(protocolDetails);
  }, [routes]);

  // Render a single route card
  const renderRouteCard = (
    route: RouteDetails,
    badgeText: string,
    badgeColor: string
  ) => (
    <div
      className={`p-4 rounded-lg border ${
        selectedRoute?.routeId === route.routeId
          ? "border-purple-400"
          : "border-transparent"
      } bg-socket-layers-2 hover:bg-app-dark-surface4 transition`}
      onClick={() => {
        const selected = routes?.find((r) => r.routeId === route.routeId);
        if (selected) setSelectedRoute(selected);
      }}
      aria-label={`${badgeText} Route`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={route.providerDetails?.icon || "/icons/placeholder.svg"}
            alt={route.providerDetails?.displayName || "Bridge"}
            width={32}
            height={32}
            className="rounded-full"
            aria-label={`${badgeText} Route Icon`}
          />
          <div>
            <p className="text-app-gray-50 font-medium flex items-center gap-2">
              {route.name}{" "}
              <span className="text-app-gray-300 text-sm">
                ~ {route.serviceTime} mins
              </span>
            </p>
            <p className="text-app-gray-300 text-sm">
              Est. Output:{" "}
              <span className="text-app-gray-50 font-medium">
                {Number(route.estimateTokenOutput).toFixed(3)}{" "}
                {selectedToToken?.symbol}
              </span>{" "}
              · Gas Fees:{" "}
              <span className="text-app-gray-50 font-medium">
                ${Number(route.estimateGasFee).toFixed(3)}
              </span>
            </p>
          </div>
        </div>
        <span
          className={`px-2 py-[2px] text-xs font-semibold rounded-md ${badgeColor}`}
          aria-label={`${badgeText} Badge`}
        >
          {badgeText}
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* Bridge Routes */}
      {fetchingQuote ? (
        <div className="py-8">
          <Loader size="lg" aria-label="Loading Tokens" text="Fetching Routes" />
        </div>
      ) : (
        <>
          {routes && routes.length > 0 && (
            <div
              className="bg-app-dark-surface3 mt-4 rounded-lg shadow-md w-full max-w-lg mx-auto"
              aria-label="Bridge Routes Container"
            >
              {/* Header */}
              <div
                className="flex justify-between items-center mb-4 px-4"
                aria-label="Bridge Routes Header"
              >
                <h3 className="text-app-gray-50 text-lg font-semibold">
                  Select Bridge Route
                </h3>
                <button
                  className="text-primaryPurple text-sm hover:text-purple-400 transition"
                  aria-label={`View all ${routes.length} Routes`}
                >
                  View all {routes.length} Routes →
                </button>
              </div>

              {/* Best Return Route */}
              {bestReturnRoute &&
                renderRouteCard(bestReturnRoute, "BEST RETURN", "bg-green-600")}

              {/* Quickest Route */}
              {quickestRoute &&
                renderRouteCard(quickestRoute, "FASTEST", "bg-indigo-600")}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BridgeRoutes;
