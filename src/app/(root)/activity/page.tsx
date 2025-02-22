"use client";
import ActivityFeed from "@/app/components/templates/ActivityFeed";
import React from "react";
import { useAccount } from "wagmi";

const Activity = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="p-4 flex flex-col h-full w-full flex-1">
        {address && <ActivityFeed safeAddress={address} />}
      </div>
    </>
  );
};

export default Activity;
