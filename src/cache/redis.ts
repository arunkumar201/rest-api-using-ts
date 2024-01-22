import Redis, { RedisOptions } from "ioredis";

import { config } from "../config/env.config";

class RedisClient {
	private static instance: RedisClient;
	private redis: Redis;

	/**
	 * Constructor for creating a new instance of the class.
	 *
	 * @param {RedisOptions} options - options for the Redis connection
	 */
	private constructor(options: RedisOptions) {
		this.redis = new Redis(config.REDIS_HOST,options);
	}

	/**
	 * Returns the singleton instance of the RedisClient, creating it if it does not exist.
	 *
	 * @param {RedisOptions} options - the options for creating the RedisClient instance
	 * @return {RedisClient} the singleton instance of the RedisClient
	 */
	public static getInstance(options: RedisOptions): RedisClient {
		if (!this.instance) {
			this.instance = new RedisClient(options);
		}
		return this.instance;
	}

	/**
	 * Get the client.
	 *
	 * @return {Redis} The Redis client
	 */
	public getClient(): Redis {
		return this.redis;
	}
}

// singleton Redis instance
const redisOptions: RedisOptions = {
	// Enable auto pipelining
	enableAutoPipelining: true,
	// Retry strategy: backoff
	retryStrategy: (times) => Math.min(times * 50, 2000),
	// Connect timeout
	connectTimeout: 5000,
	// Max retries per request
	maxRetriesPerRequest: 3,
	// Show friendly error stack
	showFriendlyErrorStack: true,
	// Lazy connect
	lazyConnect: true,
};

export const redisInstance = RedisClient.getInstance(redisOptions);
