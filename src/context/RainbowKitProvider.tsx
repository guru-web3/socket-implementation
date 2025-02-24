"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultWagmiConfig } from "@/app/services/common-utils/rainbowKitUtils";
import { sepolia } from "viem/chains";
import { ToastProvider } from "./ToastContex";
import ZustandProvider from "./ZustandProvider";
import { AuthProvider } from "./AuthProvider";
import Footer from "@/app/components/templates/Footer";
import NavBar from "@/app/components/templates/NavBar";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    // toast provider for conveying messages to users
    <ToastProvider>
      {/* wagmi and rainbow kit provider for wallet login */}
      <WagmiProvider config={defaultWagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={sepolia.id}>
            {/* state management provider - zustand */}
            <ZustandProvider>
              <NavBar />
              {/* Handle unauthorized routes */}
              <AuthProvider>{children}</AuthProvider>
              <Footer />
            </ZustandProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ToastProvider>
  );
}
