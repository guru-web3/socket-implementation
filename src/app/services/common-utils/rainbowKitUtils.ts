'use client';

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, mainnet, polygon, optimism, polygonAmoy, arbitrumSepolia, arbitrum } from "wagmi/chains";
import {
  rainbowWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";

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
          metaMaskWallet,
          walletConnectWallet,
        ],
      },
    ],
  });
  