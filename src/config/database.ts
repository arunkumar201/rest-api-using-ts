import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();
mongoose.set("strictQuery", false);

class Database {
	private uri: string;
	private options: ConnectOptions;
	private connection: Mongoose;

	/**
	 * Constructor for the class.
	 *
	 * @param {string} uri - The URI parameter.
	 * @param {ConnectOptions} options - The options parameter.
	 */
	constructor(uri: string, options: ConnectOptions) {
		this.uri = uri;
		this.options = options;
	}

	/**
	 * Connects to the database.
	 *
	 * @return {Promise<Mongoose>} The connected Mongoose instance.
	 */
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

	/**
	 * Disconnects from the database.
	 *
	 * @return {Promise<void>} Promise that resolves when the disconnection is successful.
	 */
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
