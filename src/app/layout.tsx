"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/templates/NavBar";
import Footer from "./components/templates/Footer";
import ZustandProvider from "../context/ZustandProvider";
import { ToastProvider } from "@/context/ToastContex";
import { defaultWagmiConfig } from "./services/common-utils/rainbowKitUtils";

const queryClient = new QueryClient();
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
