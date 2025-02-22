import { NextRequest, NextResponse } from "next/server";
import redisClient from "@/lib/redis";

import { TokensServices } from "@/app/services/server/tokenService";
import { SimpleHash } from "@/app/services/server/simplehash";
import { z } from "zod";

export const TokenBalancesQuerySchema = z.object({
    address: z.array(z.string()),
    tokenContracts: z.array(z.string()),
});

// for start set to 60secs
const REDIS_TIMEOUT = 60;

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    // assume only 1 address for now
    const { address, tokenContracts } = TokenBalancesQuerySchema.parse(reqBody);

    const concattokenContracts = tokenContracts.join(",");
    const redisKey = `token:${address[0]}:${concattokenContracts.length}`;

    try {
      const value = await redisClient.get(redisKey);
      if (value)
        return NextResponse.json({
          data: JSON.parse(value),
          success: true,
        });
    } catch (error) {
      console.error(error, "redis get failed");
    }

    // use simpleHash
    const simpleHashAPI = new SimpleHash();
    const tokens = await new TokensServices(simpleHashAPI).getTokensBalances(
      address,
      tokenContracts,
    );

    try {
      await redisClient.setEx(redisKey, REDIS_TIMEOUT, JSON.stringify(tokens));
    } catch (error) {
      console.error(error, "redis set failed");
    }

    return NextResponse.json({ data: tokens, success: true });
  } catch (e: unknown) {
    console.error("error occured in `/nfts`", (e as Error).stack);
    return NextResponse.json(
      {
        success: false,
        error: (e as Error).message,
      },
      { status: 500 },
    );
  }
}
