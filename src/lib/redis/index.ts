// 'use server';
import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient>;

if (process.env.KV_URL) {
  // Vercel KV configuration (TLS required)
  redisClient = createClient({
    url: process.env.KV_URL,
  });
  await redisClient.connect();
} else {
  // Self-hosted Redis configuration
  if (!process.env.REDIS_HOSTNAME || !process.env.REDIS_PORT) {
    throw new Error("Redis environment variables not set");
  }
  redisClient = createClient({
    url: `redis://${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`,
    socket: {
      tls: process.env.REDIS_TLS === "true", // Enable TLS if required
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });
  await redisClient.connect();
}

// Error handling
redisClient.on("error", (err) => console.error("Redis Client Error:", err));

export default redisClient;
