import {
	create,
	get,
	getUser,
	remove,
	update,
} from "../controllers/user.controller";
import express, { Request, Response } from "express";

import { authLimiter } from "../middleware/limiter/auth-limiter.middleware";

const userRoutes = express.Router();


//GET APIS COLLECTIONS
userRoutes.get("/", (req: Request, res: Response) => {
	res.send({ message: "Welcome to the Rest Api with ts" });
});

userRoutes.get("/users", authLimiter, get);

userRoutes.get("/users/:email", getUser);

//post
userRoutes.post("/create-user", authLimiter, create);
//delete
userRoutes.delete("/delete-user", authLimiter, remove);
//put
userRoutes.put("/update-user", authLimiter, update);

export default userRoutes;
