"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider, http } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet, polygon, optimism, polygonAmoy, arbitrumSepolia, arbitrum } from "wagmi/chains";
import { rainbowWeb3AuthConnector } from "@/context/RainbowWeb3authConnector";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/templates/NavBar";
import Footer from "./components/templates/Footer";
import ZustandProvider from "../context/ZustandProvider";
import { ToastProvider } from "@/context/ToastContex";

const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const defaultWagmiConfig = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "04309ed1007e77d1f119b85205bb779d",
  chains: [sepolia, mainnet, polygon, optimism, polygonAmoy, arbitrumSepolia, arbitrum],
  transports: {
    [sepolia.id]: http(
      "https://sepolia.infura.io/v3/84afdf720535440ca2457d5e38875563"
    ),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [polygonAmoy.id]: http(),
    [arbitrumSepolia.id]: http(),
    [arbitrum.id]: http(),
  },
  wallets: [
    {
      groupName: "Suggested",
      wallets: [
        rainbowWallet,
        rainbowWeb3AuthConnector,
        metaMaskWallet,
        walletConnectWallet,
      ],
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[#1c1c28] text-white">
          <ToastProvider>
            <WagmiProvider config={defaultWagmiConfig}>
              <QueryClientProvider client={queryClient}>
                <RainbowKitProvider initialChain={sepolia.id}>
                  <ZustandProvider>
                    <NavBar />
                    {children}
                    <Footer />
                  </ZustandProvider>
                </RainbowKitProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </ToastProvider>
        </div>
      </body>
    </html>
  );
}
