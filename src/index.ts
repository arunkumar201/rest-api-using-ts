import { DB_NAME, MONGODB_URI, PORT } from "./constants/index";
import express, { Request, Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/crud.route";

dotenv.config();

//Database Instance
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

//getting server status
app.get("/server-status", (req: Request, res: Response) => {
	res.status(200).json({
		message: "Server is up running! ",
	});
});

//middlewares
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

//Routes
app.use(userRoutes);

app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
});
