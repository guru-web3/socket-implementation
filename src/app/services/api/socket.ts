import { HttpClient } from "../http/httpClient";
import { TokenListParams, TokenListResponse, ChainsResponse, UserBalanceParams, UserBalanceResponse, QuoteParams, QuoteResponse, StartRouteParams, StartRouteResponse, PrepareNextTxParams, PrepareNextTxResponse } from "./socket.interface";

export async function getFromTokenList(
  params: TokenListParams
): Promise<TokenListResponse> {
  return HttpClient<TokenListResponse>(
    "https://api.socket.tech/v2/token-lists/from-token-list",
    {
      params: {
        ...params,
        isShortList: params.isShortList ?? true,
      },
    }
  );
}

export async function getToTokenList(
  params: TokenListParams
): Promise<TokenListResponse> {
  return HttpClient<TokenListResponse>(
    "https://api.socket.tech/v2/token-lists/to-token-list",
    {
      params: {
        ...params,
        isShortList: params.isShortList ?? true,
      },
    }
  );
}

export async function getSupportedChains(): Promise<ChainsResponse> {
  return HttpClient<ChainsResponse>(
    "https://api.socket.tech/v2/supported/chains"
  );
}

export async function getUserBalances(
  params: UserBalanceParams,
): Promise<UserBalanceResponse> {
  return HttpClient<UserBalanceResponse>(
    "https://api.socket.tech/v2/balances",
    {
      params: {
        ...params,
        isShortList: params.isShortList ?? true,
      },
    }
  );
}


export async function getQuote(params: QuoteParams): Promise<QuoteResponse> {
  const API_URL = "https://api.socket.tech/v2/quote";

  const queryParams = new URLSearchParams(
    Object.entries({
      ...params,
      singleTxOnly: params.singleTxOnly?.toString(),
      bridgeWithGas: params.bridgeWithGas?.toString(),
      sort: params.sort || "output",
      defaultSwapSlippage:
        params.defaultSwapSlippage?.toString() || "0.5",
      isContractCall:
        params.isContractCall?.toString() || "false",
      showAutoRoutes:
        params.showAutoRoutes?.toString() || "false",
    }).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  );

  try {
    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_SOCKET_API_KEY!,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch quote. Status code ${response.status}`
      );
    }

    const data = (await response.json()) as QuoteResponse;

    if (!data.success) {
      throw new Error("API returned an unsuccessful response.");
    }

    return data; // Return the full response
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error; // Re-throw error for handling in the component
  }
}

export async function startRoute(
  startRouteBody: StartRouteParams
): Promise<StartRouteResponse> {
  return HttpClient<StartRouteResponse>("https://api.socket.tech/v2/route/start", {
    method: "POST",
    headers: {
      "API-Key": process.env.NEXT_PUBLIC_SOCKET_API_KEY!,
    },
    body: startRouteBody,
  });
}

export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    type: "function",
  },
];

export async function prepareNextTx(
  params: PrepareNextTxParams
): Promise<PrepareNextTxResponse> {
  return HttpClient<PrepareNextTxResponse>(
    "https://api.socket.tech/v2/route/prepare",
    {
      method: "GET",
      params: {
        ...params,
        userTxIndex: params.userTxIndex.toString(),
      },
    }
  );
}

interface BuildNextTxParams {
  activeRouteId: string;
}

interface BuildNextTxResponse {
  success: boolean;
  transactionData?: any; // Replace with actual transaction data structure if known
  message?: string;
}

export async function buildNextTx(
  params: BuildNextTxParams
): Promise<BuildNextTxResponse> {
  return HttpClient<BuildNextTxResponse>(
    "https://api.socket.tech/v2/route/build-next-tx",
    {
      method: "GET",
      params: {
        ...params,
      },
    }
  );
}
