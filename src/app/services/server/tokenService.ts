import { Client } from "viem";

import { EthereumSepolia, PolygonAmoy, ArbitrumSepolia, arbitrumClient, arbitrumSepoliaClient, baseClient, ethClient, optimismClient, polygonAmoyClient, polygonClient, sepoliaClient, MAINNET } from "../common-utils/chainUtils";
import { ReadBalanceCheckerReturnType, readMultipleOwnersTokensBalance, readNativeBalance } from "./balanceScanner";
import { TokenDetails } from "@/app/constants/asset.interface";


export interface TokenFetchAPI {
  getTokensByOwners: (
    owner: string[],
    newtorks: string[],
  ) => Promise<Record<string, TokenDetails>>;
}

export class TokensServices {
  clients: Record<string, Client> = {
    [MAINNET]: ethClient,
    base: baseClient,
    arbitrum: arbitrumClient,
    optimism: optimismClient,
    polygon: polygonClient,
    // testnet clients
    [EthereumSepolia.id as unknown as string]: sepoliaClient,
    [PolygonAmoy.id as unknown as string]: polygonAmoyClient,
    [ArbitrumSepolia.id as unknown as string]: arbitrumSepoliaClient,
  };

  fetchAPI: TokenFetchAPI;

  constructor(fetchAPI: TokenFetchAPI) {
    this.fetchAPI = fetchAPI;
  }

  async detectTokens(owner: string[], networks: string[]) {
    try {
      // get from simpleHash or etherscan
      const result = await this.fetchAPI.getTokensByOwners(owner, networks);
      // add to db if not present
      return result;
    } catch (error) {
      console.error(
        error,
        "unable to fetch token balances using single call balance address",
      );
    }
  }

  async getTokensBalances(owners: string[], tokenContracts: string[]) {
    try {
      const resultMap: Record<string, ReadBalanceCheckerReturnType> = {};

      const networks: string[] = [];
      tokenContracts.forEach((contract) => {
        const network = contract.split(".")[0];
        if (!networks.includes(network)) {
          networks.push(network);
        }
      });
      // get from contract
      const resultPromises = networks.map(async (network) => {
        // add default contracts list
        // const networkContractMap = TokenContractMap[network] || {};
        let contractList: string[] = [];

        let nativeCheck = false;
        tokenContracts.forEach((contract) => {
          const [contractNetwork, contractAddress] = contract.split(".");
          if (contractNetwork === network) {
            contractList.push(contractAddress);
          }
        });
        contractList = contractList.filter((contract) => {
          if (contract === "0x0") {
            nativeCheck = true;
            return false;
          } else {
            return true;
          }
        });

        const client = this.clients[network];
        if (client) {
          resultMap[network] = {};
          try {
            const balance = await readMultipleOwnersTokensBalance({
              client,
              batchOwnerAddress: owners,
              tokensContractAddress: contractList,
              network,
            });
            resultMap[network] = balance;
          } catch (error) {
            console.error("error while getting token balance", error)
            owners.forEach((owner) => {
              resultMap[network][owner] = {};
            });
          }
          try {
            if (nativeCheck) {
              const balance = await readNativeBalance({
                client,
                ownersAddress: owners,
                network,
              });
              owners.forEach((owner) => {
                resultMap[network][owner] = {
                  ...resultMap[network][owner],
                  ...balance[owner],
                };
              });
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          resultMap[network] = {};
        }
      });

      await Promise.all(resultPromises);
      return resultMap;
    } catch (error) {
      console.log(error);
      console.error(
        error,
        "unable to fetch token balances using single call balance address",
      );
    }
  }
}


export const SIMPLEHASH = "simplehash";
export const CRYPTOCOMPARE = "cryptocompare";
