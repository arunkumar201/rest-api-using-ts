import Redis, { RedisOptions } from "ioredis";

import { ENVConfig as config } from "../config/env.config";

class RedisClient {
	private static instance: RedisClient;
	private redis: Redis;

	/**
	 * Constructor for creating a new instance of the class.
	 *
	 * @param {RedisOptions} options - options for the Redis connection
	 */
	private constructor(options: RedisOptions) {
		this.redis = new Redis(options);
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
	host: config.REDIS_HOST,
	password: config.REDIS_PASSWORD,
	username: config.REDIS_USERNAME,
	port: Number(config.REDIS_PORT),

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
	enableTLSForSentinelMode: true,
};

export const redisInstance = RedisClient.getInstance(redisOptions);

const redis = redisInstance.getClient();
redis
	.connect()
	.then(() => {
		console.log("connection established");
	})
	.catch((err) => {
		console.log("connection failed", err);
	});

redis.on("error", (err) => {
	console.error(
		`[ERROR] ${new Date().toLocaleString()} - Error occurred in Redis connection: ${err}`
	);
});

redis.on("connect", () => {
	console.log(
		`[INFO] ${new Date().toLocaleString()} - Connected to Redis server`
	);
});

redis.on("close", () => {
	console.log(
		`[INFO] ${new Date().toLocaleString()} - Redis connection closed`
	);
});

redis.on("connecting", () => {
	console.log(
		`[INFO] ${new Date().toLocaleString()} - Attempting to connect to Redis server`
	);
});

redis.on("ready", () => {
	console.log(
		`[INFO] ${new Date().toLocaleString()} - Redis client is ready to receive commands`
	);
});
