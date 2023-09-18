import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { register } from "./controllers/auth.controller";
import userRouter from './../src/routes/user.route'

const router = express.Router(); 

dotenv.config();

const port = process.env.PORT || 8000;
const db = new Database(process.env.MONGODB_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: "rest-apis-ts",
} as ConnectOptions);
db.connect().catch((err: unknown) =>
	console.error("Error connecting to database:", err)
);
const app = express();
app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());
const server = http.createServer(app);
router.post("/user", register);


server.listen(port, () => {
	console.log(`express server is running on port ${port}`);
});
