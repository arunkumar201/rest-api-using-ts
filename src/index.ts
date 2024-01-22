import express, { Request, Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import { PORT } from "./constants/index";
import bodyParser from "body-parser";
import { config } from "../src/config/env.config";
import cors from "cors";
import { limiter } from "./middleware/limiter/rateLimiter.middleware";
import passport from "passport";
import passportAuth from "../src/config/passport.config";
import userRoutes from "./routes/crud.route";

const app = express();
app.use(limiter);
app.use(passport.initialize());
passportAuth.initialize();


//Database Instance
const db = new Database(config.DATABASE_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: config.DB_NAME,
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

//Routes
app.use(userRoutes);

app.listen(PORT, () => {
	console.log(`express server is running on port ${PORT}`);
});
