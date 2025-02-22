"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useAccount } from "wagmi";

const ActivityFeed = dynamic(() =>
  import("@/app/components/templates/ActivityFeed").then((module) => module.default),
);

const Activity = () => {
  const { address } = useAccount();

  return (
    <>
      <div className="p-4 flex flex-col h-full w-full flex-1">
        {address && <ActivityFeed />}
      </div>
    </>
  );
};

export default Activity;
