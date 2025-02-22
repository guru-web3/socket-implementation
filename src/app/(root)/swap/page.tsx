"use client";
import SwapCard from "@/app/components/templates/SwapCard";
import React from "react";
import { useAccount } from "wagmi";

const Swap = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="p-4 flex flex-col h-full w-full flex-1">
        {address && <SwapCard />}
      </div>
    </>
  );
};

export default Swap;
