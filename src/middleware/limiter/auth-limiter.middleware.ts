import RedisStore from "rate-limit-redis";
import rateLimit from "express-rate-limit";
import { redisInstance } from "../../cache/redis";

const client = redisInstance.getClient();

const ONE_MINUTE = 60 * 1000;
export const authLimiter = rateLimit({
	windowMs: 5 * ONE_MINUTE, // 15 minutes
	max: 20,
	standardHeaders: true,
	message:"Too many requests, please try again later",
	legacyHeaders: false,
	store: new RedisStore({
		// @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
		sendCommand: (...args: string[]) => client.sendCommand(...args),
	}),
});
