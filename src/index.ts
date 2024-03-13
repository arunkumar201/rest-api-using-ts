import { defaultErrorHandler, handler } from "./middleware/error/defaultError.middleware";
import express, { NextFunction, Request, Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import { ENVConfig } from "./config/env.config";
import { PORT } from "./constants/index";
import bodyParser from "body-parser";
import cors from "cors";
import learningRoute from "./routes/learning.route";
import { limiter } from "./middleware/limiter/rateLimiter.middleware";
import passport from "passport";
import passportAuth from "./config/passport.config";
import status from 'express-status-monitor'
import userRoutes from "./routes/crud.route";

const app = express();
app.use(limiter);
app.use(status())
app.use(passport.initialize());
passportAuth.initialize();

//Database Instance
const db = new Database(ENVConfig.DATABASE_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: ENVConfig.DB_NAME,
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
app.use('/learning',learningRoute)


// eslint-disable-next-line @typescript-eslint/no-unused-varsx
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
    handler.handleError(err,res,next)
});
app.use(defaultErrorHandler)

x => {
	console.log(`express server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
	console.log(`http://localhost:${PORT}/server-status`);
});
