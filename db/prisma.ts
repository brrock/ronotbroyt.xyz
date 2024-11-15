// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import { PrismaExtensionRedis } from "prisma-extension-redis";

const redisUrl = process.env.REDIS_URL || "a";

const redisOptions: Redis.RedisOptions = {
  maxRetriesPerRequest: 3,
  retryStrategy(times: number) {
    if (times > 3) {
      console.error("Redis connection failed after multiple attempts");
      return null; // stops retrying
    }
    return Math.min(times * 200, 3000); // time between retries
  },
  tls: {
    rejectUnauthorized: false,
  },
};

let redis: Redis;

try {
  redis = new Redis(redisUrl, redisOptions);

  redis.on("connect", () => {
    console.log("Redis client is connecting...");
  });

  redis.on("ready", () => {
    console.log("Redis client is connected and ready");
  });

  redis.on("error", (error) => {
    console.error("Redis error:", error);
  });

  redis.on("close", () => {
    console.log("Redis connection closed");
  });

  redis.on("reconnecting", () => {
    console.log("Redis client is reconnecting...");
  });
} catch (error) {
  console.error("Failed to initialize Redis:", error);
  process.exit(1);
}

const cache = {
  ttl: 30,
  stale: 20,
  storage: {
    type: "redis",
    options: {
      client: redis,
      invalidation: { referencesTTL: 60 },
    },
  },
};

const auto = {
  ttl: 30,
};

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(
    PrismaExtensionRedis({ auto, cache, redis }),
  );
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = global.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;
