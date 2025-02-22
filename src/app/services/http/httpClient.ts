type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HttpClientConfig {
  method?: HttpMethod;
  params?: Record<string, string | number | boolean>;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  body?: Record<string, any>; // Add body support for POST/PUT requests
  headers?: HeadersInit;
}

export async function HttpClient<T>(
  url: string,
  config: HttpClientConfig = { method: "GET" }
): Promise<T> {
  try {
    const { method = "GET", params, body, headers } = config;

    // Construct query string for GET requests
    const queryParams = new URLSearchParams();
    if (params && method === "GET") {
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, String(value));
      });
    }

    const apiUrl = params && method === "GET" ? `${url}?${queryParams}` : url;

    const response = await fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.NEXT_PUBLIC_SOCKET_API_KEY!,
        ...headers,
      },
      body: method !== "GET" && body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`API call failed: ${error}`);
    throw error;
  }
}
