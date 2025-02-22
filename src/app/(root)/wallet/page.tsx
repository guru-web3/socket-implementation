"use client";

import TokenList from "@/app/components/organisms/TokenList";
import { useVisibleAssets } from "@/app/composibles/useAssetsBalance";
import useUserStore from "@/store/userStore";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

const Wallet = () => {
  const { address } = useAccount();
  const { nonZeroAssets, visibleAssets } = useVisibleAssets();
  const { setAddress } = useUserStore();

  useEffect(() => {
    if (address) {
      setAddress(address);
    }
  }, [visibleAssets, nonZeroAssets]);
  return (
    <>
      <div className="bg-[#171721] min-h-[560px] relative mx-auto mt-12 w-full max-w-lg rounded-xl bg-socket-layers-1 px-6 py-6 shadow-card sm:border sm:border-neutral-800">
        {address && <TokenList />}
      </div>
    </>
  );
};

export default Wallet;
