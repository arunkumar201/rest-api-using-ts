import { DB_NAME, MONGODB_URI, PORT } from "./constants/index";
import express, { Request, Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { logger } from "./middleware/logger/logger.middleware";
import passport from "passport";
import passportAuth from "../src/config/passport.config";
import userRoutes from "./routes/crud.route";

const app = express();
app.use(passport.initialize());
passportAuth.initialize();

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
app.use(logger);

//Routes
app.get("/getIp", (req: Request, res: Response) => {
	console.log("object");
	res.status(200).json({
		ip: req.ip.toString(),
	});
});
app.use(userRoutes);

app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
});
