import { ENVConfig } from "./config/env.config";
ENVConfig.validateConfig();
import { defaultErrorHandler } from "./middleware/error/defaultError.middleware";
import express,{ NextFunction,Request,Response } from "express";

import { ConnectOptions } from "mongoose";
import Database from "./config/database";
import { PORT } from "./constants/index";
import bodyParser from "body-parser";
import cors from "cors";
import learningRoute from "./routes/learning.route";
import { limiter } from "./middleware/limiter/rateLimiter.middleware";
import passport from "passport";
import passportAuth from "./config/passport.config";
import status from 'express-status-monitor'
import userRoutes from "./routes/crud.route";
import { httpResponse } from "../src/utils/httpResponse";
import { httpError } from "./utils/httpError.ts";
import WebSocket,{ WebSocketServer } from 'ws';
import apiRoutes from "./routes/api.route";
import { customEventEmitter,MyEventEmitter,requestEmitter } from "./learning/event-emitter";

function onSocketError(err: unknown) {
	console.error(err);
}
const app = express();

app.disable("x-powered-by")

app.use(limiter);
app.use(status())
app.use(passport.initialize());
passportAuth.initialize();

//Database Instance
const db = new Database(ENVConfig.DATABASE_URI!,{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: ENVConfig.DB_NAME,
} as ConnectOptions);

//Connect with DATABASE
db.connect().catch((err: unknown) =>
	console.error("Error connecting to database:",err)
);


app.use(cors({
	credentials: true,
}));
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);


app.use('*',(req: Request,_res: Response,next: NextFunction) => {
	console.log("Request Path:",req.path);
	requestEmitter.emit("request-received",req,"Hello from server");
	requestEmitter.emit("error","Request received error");
	customEventEmitter.emitCustomEvent("Custom Event emitted from server");
	next();
})
app.get("/event-emit",(req: Request,res: Response) => {
	console.log(req.originalUrl);
	console.log("Event Emitter triggered");
	MyEventEmitter.emit("event-emitted","Event emitted from server");
	res.send("Event Emitter triggered");
})

//getting server status
app.get("/server-status",async (req: Request,res: Response,next: NextFunction) => {
	// res.status(200).json({
	// 	message: "Server is up running! ",
	// });
	try {
		httpResponse(req,res,200,"Server is up running!",{
			status: "running"
		});
	} catch (err) {
		console.error(`error while getting server status: ${JSON.stringify(err)}`);
		httpError(next,err,req,500);
	}
});

app.use('/api',apiRoutes);

//middlewares
// const allowedOrigins = ['example1.com', 'example3.com'];
// app.use(
//   cors({
//     origin: (origin, next) => {
//       if (allowedOrigins.includes(origin)) {
//         next(null, true);
//       } else {
//         next(new Error(`${origin} not allowed`));
//       }
//     },
//   }),
// );


//Routes
app.use(userRoutes);
app.use('/learning',learningRoute)

app.use(defaultErrorHandler)

// app.use(async (err: Error,req: Request,res: Response,next: NextFunction) => {
// 	handler.handleError(err,res,next)
// });

const server = app.listen(PORT,() => {
	console.log(`express server is running on port ${PORT}`);
	console.log(`http://localhost:${PORT}`);
	console.log(`http://localhost:${PORT}/server-status`);
});


//create WebSocket Server 

//new ws server  running on port 8080
// const wss = new WebSocketServer({
//   port: 8080,
// });

//we can create a new websocket server  using http server 
const wss = new WebSocketServer({ server });
wss.on('connection',function connection(ws,req) {
	const ip = req.socket.remoteAddress;

	console.log('Client connected',ip);

	ws.on('error',(ws: WebSocket,err: Error) => {
		console.log('Client Disconnected',ip);
		console.log(err);
		ws.close();
	});

	ws.on('message',function message(data,isBinary) {
		//send message to all clients connected to the websocket server
		wss.clients.forEach(function each(client) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(data,{ binary: isBinary });
			}
		});

		console.log('received: %s',data);
		ws.send('Hey we received your message');
	});
});

server.on('upgrade',function upgrade(request,socket,head) {
	socket.on('error',onSocketError);

	socket.on('data',function (data) {
		try {
			const message = data.toString('utf8');
			console.log('Received message:',message);
		} catch (err) {
			console.error('Error processing data:',err);
			console.log('Raw data:',data);
		}
	});

	wss.handleUpgrade(request,socket,head,function done(ws) {
		wss.emit('connection',ws,request);
	});
});
