"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";

const WrapEthCard = dynamic(() =>
  import("@/app/components/templates/WrapEth").then((module) => module.default),
  { ssr: false }
);

const Activity = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="p-4 flex flex-col h-full w-full flex-1">
        {address && <WrapEthCard />}
      </div>
    </>
  );
};

export default Activity;
