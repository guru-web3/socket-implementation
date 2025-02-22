"use client";

import { useVisibleAssets } from "@/app/composibles/useAssetsBalance";
import useUserStore from "@/store/userStore";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const TokenList = dynamic(() =>
  import("@/app/components/organisms/TokenList").then((module) => module.default),
  { ssr: false }
);

const Wallet = () => {
  const { address } = useAccount();
  const { nonZeroAssets, visibleAssets } = useVisibleAssets();
  const { setAddress } = useUserStore();

  useEffect(() => {
    if (address) {
      setAddress(address);
    }
  }, [address, setAddress, visibleAssets, nonZeroAssets]);
  return (
    <>
      <div className="bg-[#171721] min-h-[560px] relative mx-auto mt-12 w-full max-w-lg rounded-xl bg-socket-layers-1 px-6 py-6 shadow-card sm:border sm:border-neutral-800">
        {address && <TokenList />}
      </div>
    </>
  );
};

export default Wallet;
