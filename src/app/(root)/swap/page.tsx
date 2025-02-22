"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";

const SwapCard = dynamic(() =>
  import("@/app/components/templates/SwapCard").then((module) => module.default),
);

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
