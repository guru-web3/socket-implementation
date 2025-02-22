import { NextRequest, NextResponse } from 'next/server'
import redisClient from '@/lib/redis';
import { BLOCK_EXPLORER_URL, EChain } from "@/app/services/common-utils/chainUtils";
const DEFAULT_REDIS_PREFIX = "REDIS_SMART_WALLET";
  
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  
  try {
    const address = searchParams.get('address');
    const chainId = searchParams.get('chainId');
    const useCache = false;

    // Validation
    if (!address || !chainId) {
      return NextResponse.json(
        { success: false, message: 'Missing address or chainId' },
        { status: 400 }
      );
    }

    const redisKey = `${DEFAULT_REDIS_PREFIX}:transactions:${chainId}:${address}:${searchParams.toString()}`;

    // Try to return cached data first
    if (useCache) {
      try {
        const cachedData = await redisClient.get(redisKey);
        if (cachedData) {
          return NextResponse.json(
            { success: true, data: JSON.parse(cachedData), cachedData:true },
            { status: 200 }
          );
        }
      } catch (e) {
        console.log('Redis cache read failed:', e);
      }
    }

    // Fetch pending transactions from Redis
    const pendingTxKeys = await redisClient.keys(`tx:${chainId}:${address}:*`);
    const pendingTransactions = (await Promise.all(
      pendingTxKeys.map(async (key) => {
        try {
          const tx = await redisClient.get(key);
          return tx ? JSON.parse(tx) : null;
        } catch (e) {
          console.log('Failed to parse Redis transaction:', e);
          return null;
        }
      })
    )).filter(Boolean);

    // Generate block explorer URLs
    const urls = [
      `${BLOCK_EXPLORER_URL[Number(chainId) as EChain]}?module=account&action=txlist&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API}`,
      `${BLOCK_EXPLORER_URL[Number(chainId) as EChain]}?module=account&action=tokentx&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API}`,
      `${BLOCK_EXPLORER_URL[Number(chainId) as EChain]}?module=account&action=tokennfttx&address=${address}&sort=desc&apikey=${process.env.ETHERSCAN_API}`
    ];

    // Fetch blockchain transactions
     
    const [blockchainResults] = await Promise.all([
      Promise.allSettled(urls.map(url => fetch(url).then(res => res.json()))),
    ]);

    // Process blockchain transactions
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const chainTransactions = blockchainResults.reduce((acc: any[], result) => {
      if (result.status === 'fulfilled' && result.value.status === '1') {
        return [...acc, ...result.value.result];
      }
      return acc;
    }, []);

    // Merge and deduplicate transactions
    const allTransactions = [
      ...pendingTransactions,
      ...chainTransactions.map((tx: any) => ({
        ...tx,
        type: tx.input === '0x' ? 'ETH' : 'ERC20',
        timestamp: new Date(parseInt(tx.timeStamp) * 1000),
        status: tx.txreceipt_status === '1' ? 'confirmed' : 'confirmed'
      })),
    ].filter((tx, index, self) =>
      index === self.findIndex(t => t.hash === tx.hash)
    );

    // Apply filters
    const days = Number(searchParams.get('days')) || 360;
    const typeFilter = searchParams.get('type') || 'all';
    const cutoff = Date.now() - (days * 86400 * 1000);

    const filtered = allTransactions
      .filter(tx => new Date(tx.timestamp).getTime() > cutoff)
      .filter(tx => typeFilter === 'all' || tx.type === typeFilter)
      .sort((a, b) => b.timeStamp - a.timeStamp);
    const REDIS_TIMEOUT = 600; // 10 minutes in seconds

    // Cache results if requested
    if (useCache) {
      try {
        await redisClient.setEx(
          redisKey,
          REDIS_TIMEOUT,
          JSON.stringify(filtered)
        );
      } catch (e) {
        console.error('Redis cache write failed:', e);
      }
    }

    return NextResponse.json(
      { success: true, data: filtered },
      { status: 200 }
    );

  } catch (e) {
    console.error('Transaction fetch error:', e);
    return NextResponse.json(
      { success: false, message: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  
  try {
    const txData = await req.json();
    
    // Validate required fields
    if (!txData.hash || !txData.chainId || !txData.type) {
      return NextResponse.json(
        { error: 'Missing required transaction fields' },
        { status: 400 }
      );
    }

    // Store transaction with 10 minute expiry
    await redisClient.setEx(
      `tx:${txData.chainId}:${txData.from}:${txData.hash}`,
      600, // 10 minutes in seconds
      JSON.stringify({
        ...txData,
        status: 'pending',
        timestamp: new Date().toISOString()
      })
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json(
      { error: 'Failed to cache transaction' },
      { status: 500 }
    );
  }
}
