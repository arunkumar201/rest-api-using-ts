import mongoose, { ConnectOptions, Mongoose } from "mongoose";

import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);

class Database {
	private uri: string;
	private options: ConnectOptions;
	private connection: Mongoose | undefined;

	constructor(uri: string, options: ConnectOptions) {
		this.uri = uri;
		this.options = options;
	}

	async connect(): Promise<Mongoose> {
		try {
			this.connection = await mongoose.connect(this.uri, this.options);
			console.log(
				`Connected to database: ${this.connection.connection.db.databaseName}`
			);
			return this.connection;
		} catch (error) {
			throw error;
		}
	}

	async disconnect(): Promise<void> {
		if (this.connection) {
			try {
				await this.connection.disconnect();
				console.log(
					`Disconnected from database: ${this.connection?.connection?.db?.databaseName}`
				);
			} catch (error) {
				throw error;
			}
		}
	}
}

export default Database;
