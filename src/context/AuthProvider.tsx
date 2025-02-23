"use client";

import React from "react";
import ConnectWallet from "@/app/components/molecules/ConnectWallet";
import { useAccount } from "wagmi";

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ? (
        children
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-app-dark-surface3">
          <div className="flex flex-col justify-center items-center bg-app-dark-surface2 max-w-md w-full p-6 rounded-xl shadow-md border border-neutral-800 text-center">
            <h2 className="text-app-gray-50 text-xl font-semibold mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-app-gray-400 text-sm mb-6">
              To access the application, please connect your Web3 wallet.
            </p>
            <ConnectWallet />
          </div>
        </div>
      )}
    </>
  );
};
