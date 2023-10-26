import { DB_NAME, MONGODB_URI, PORT } from "./constants/index";

import { ConnectOptions } from "mongoose";
import Database from "./db/database";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/crud.route";

dotenv.config();

//Database Instace 
const db = new Database(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: DB_NAME,
} as ConnectOptions);

//Connect with DATABASE
db.connect().catch((err: unknown) =>
	console.error("Error connecting to database:", err)
);

const app = express();

//middlewares 
app.use(cors({credentials: true}));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use(router);


app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
});
