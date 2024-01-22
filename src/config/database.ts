import mongoose, { ConnectOptions, Mongoose } from "mongoose";

import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);

class Database {
	private uri: string;
	private options: ConnectOptions;
	private connection: Mongoose;

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
			return;
		} catch (error) {
			throw error;
		}
	}

	async disconnect(): Promise<void> {
		try {
			await this.connection.disconnect();
			console.log(
				`Disconnected from database: ${this.connection.connection.db.databaseName}`
			);
		} catch (error) {
			throw error;
		}
	}
}

export default Database;
