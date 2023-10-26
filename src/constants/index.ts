import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
export const DB_NAME = process.env.DB_NAME || "test-api-ts";
export const PORT = process.env.PORT || 8000;
