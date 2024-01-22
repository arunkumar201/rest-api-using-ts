import * as process from "process";

import dotenv from "dotenv";

dotenv.config({});

class Config {
	public DATABASE_URI: string | undefined;
	public PORT: string | undefined;
	// public JWT_TOKEN: string | undefined;
	// public TOKEN_EXPIRES_IN_HOURS: string | undefined;
	// public NODE_ENV: string | undefined;
	public SECRET: string | undefined;
	// public CLIENT_URL: string | undefined;
	public REDIS_HOST: string | undefined;
	public ADMIN_EMAIL: string | undefined;
	public DB_NAME:string | undefined

	private readonly DEFAULT_DATABASE_URI = "mongodb://127.0.0.1:27017";

	constructor() {
		this.DATABASE_URI = process.env.DATABASE_URI || this.DEFAULT_DATABASE_URI;
		this.PORT = process.env.PORT || "5000";
		// this.JWT_TOKEN = process.env.JWT_TOKEN;
		// this.TOKEN_EXPIRES_IN_HOURS = process.env.TOKEN_EXPIRES_IN_HOURS;
		// this.NODE_ENV = process.env.NODE_ENV;
		// this.CLIENT_URL = process.env.CLIENT_URL;
		this.REDIS_HOST = process.env.REDIS_HOST || "redis://localhost:6379";
		this.ADMIN_EMAIL = process.env.ADMIN_EMAIL;
		this.SECRET = process.env.SECRET;
		this.DB_NAME = process.env.DB_NAME || "test-api-ts";
	}

	public validateConfig(): void {
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined.`);
			}
		}
	}
}

export const config: Config = new Config();
