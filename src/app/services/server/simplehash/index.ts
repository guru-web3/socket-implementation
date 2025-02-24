import {
  EthereumSepolia,
  getSimpleHashApiKey,
  AMOY,
  ARBITRUM_MAINNET,
  ARBITRUM_SEPOLIA,
  AVALANCHE_MAINNET,
  BSC_MAINNET,
  CELO_MAINNET,
  GOERLI,
  MAINNET,
  MATIC,
  OPTIMISM_MAINNET,
  OPTIMISM_SEPOLIA,
} from "@/app/services/common-utils/chainUtils";

const SIMPLEHASH_MAP: Record<string, string> = {
  [MAINNET]: "ethereum",
  [MATIC]: "polygon",
  [BSC_MAINNET]: "bsc",
  [ARBITRUM_MAINNET]: "arbitrum",
  [OPTIMISM_MAINNET]: "optimism",
  [CELO_MAINNET]: "celo",
  [AVALANCHE_MAINNET]: "avalanche",

  // Testnets
  [GOERLI]: "ethereum-georli",
  [EthereumSepolia.id]: "ethereum-sepolia",
  [ARBITRUM_SEPOLIA]: "arbitrum-sepolia",
  [OPTIMISM_SEPOLIA]: "optimism-sepolia",
  [AMOY]: "polygon-amoy",
};

// TODO: investigate spam score
export class SimpleHash {
  constructor() {}

  convertNetworksToSimpleHash(networks: string[]) {
    const result: string[] = [];
    networks.forEach((network) => {
      if (SIMPLEHASH_MAP[network]) {
        result.push(SIMPLEHASH_MAP[network]);
      } else {
        console.error(`Network ${network} not supported by SimpleHash`);
      }
    });
    return result;
  }

  // https://api.simplehash.com/api/v0/fungibles/balances?chains={chains}&wallet_addresses={wallet_addresses}
  async getTokensByOwners(owner: string[], networks: string[]) {
    const toNetworks = this.convertNetworksToSimpleHash(networks);

    const response = await fetch(
      `https://api.simplehash.com/api/v0/fungibles/balances?chains=${toNetworks.join(",")}&wallet_addresses=${owner.join(",")}`,
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "X-API-KEY": getSimpleHashApiKey(),
        },
      },
    );
    const result = await response.json();
    return result;
  }
}
