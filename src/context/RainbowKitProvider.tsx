"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultWagmiConfig } from "@/app/services/common-utils/rainbowKitUtils";
import { sepolia } from "viem/chains";
import { ToastProvider } from "./ToastContex";
import ZustandProvider from "./ZustandProvider";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ToastProvider>
      <WagmiProvider config={defaultWagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={sepolia.id}>
            <ZustandProvider>{children}</ZustandProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ToastProvider>
  );
}
