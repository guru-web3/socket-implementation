"use client";
import WrapEthCard from "@/app/components/templates/WrapEth";
import React from "react";
import { useAccount } from "wagmi";

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
