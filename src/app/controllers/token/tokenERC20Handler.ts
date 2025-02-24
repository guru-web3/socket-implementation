import { PublicClient } from "viem";

import { erc20Abi } from "./erc20abi";

import {
  chainIdToNetworkKey,
  chainIdToViemChain,
  getNetworkImageUrl,
  getPublicClient,
} from "@/app/services/common-utils/chainUtils";
import {
  AssetIdType,
  TAssetInfoWithBalance,
} from "@/app/constants/asset.interface";

export interface ITokenOptions {
  address: AssetIdType;
  name?: string;
  chainId: string | number;
  symbol?: string;
  decimals?: number;
}

export class TokenHandler {
  public address: AssetIdType;

  public symbol: string | undefined;

  public decimals: number | undefined;

  public name: string | undefined;

  public publicClient: PublicClient;

  public chainId: number;

  constructor({ address, symbol, decimals, name, chainId }: ITokenOptions) {
    this.address = address;

    this.symbol = symbol;
    this.decimals = decimals;
    this.name = name;

    this.publicClient = getPublicClient(chainId);
    this.chainId = Number(chainId);
  }

  public readERC20 = async <T>(
    functionName: string,
    args?: unknown[],
  ): Promise<T> => {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: erc20Abi,
      functionName,
      args,
    });
    return result as T;
  };

  public async getSymbol(): Promise<string> {
    if (!this.symbol || this.symbol === "ERC20")
      this.symbol = await this.readERC20<string>("symbol");
    return this.symbol;
  }

  public async getDecimals(): Promise<number> {
    try {
      if (!this.decimals) {
        const _decimals = await this.readERC20<bigint>("decimals");
        this.decimals = Number(_decimals.toString());
      }
      return this.decimals;
    } catch (error) {
      console.warn(`Could not get decimals for token ${this.address}`, error);
      return 0;
    }
  }

  public async getName(): Promise<string> {
    if (!this.name) this.name = await this.readERC20<string>("name");
    return this.name;
  }

  public async getUserBalance(userAddress: AssetIdType): Promise<string> {
    if (!this.decimals) await this.getDecimals();
    const balance: bigint = await this.readERC20<bigint>("balanceOf", [
      userAddress,
    ]);
    return balance.toString();
  }

  public async toAssetInfo(
    account: AssetIdType,
  ): Promise<TAssetInfoWithBalance> {
    const networkKey = chainIdToNetworkKey(this.chainId);
    const network = chainIdToViemChain(this.chainId);
    const [name, symbol, decimals, balance] = await Promise.all([
      this.getName(),
      this.getSymbol(),
      this.getDecimals(),
      this.getUserBalance(account),
    ]);
    return {
      assetId: `${networkKey}.${this.address}`,
      symbol,
      decimals,
      name,
      balance,
      address: this.address,
      chainId: this.chainId,
      network: network.name,
      networkImage: getNetworkImageUrl(this.chainId),
    };
  }
}
