import {
	create,
	get,
	getUser,
	login,
	remove,
	update,
} from "../controllers/user.controller";
import express, { Request, Response } from "express";

import { DecodeToken } from "../utils/decodeToken";
import { requireAdminAuth } from "../middleware/auth/admin.auth.middleware";

const userCrudRoutes = express.Router();

//GET APIS COLLECTIONS
userCrudRoutes.get("/", (req: Request, res: Response) => {
	res.send({ message: "Welcome to the Rest Api with ts" });
});

userCrudRoutes.get("/getUsers", DecodeToken, requireAdminAuth, get);
userCrudRoutes.get("/getUsers/:email", DecodeToken, requireAdminAuth, getUser);

//post
userCrudRoutes.post("/create-user", create);
userCrudRoutes.post("/signup", create);

//Login Route after SignUp
userCrudRoutes.post("/login", login);
//put
userCrudRoutes.delete("/delete-user", DecodeToken, requireAdminAuth, remove);

//delete
userCrudRoutes.put("/update-user", DecodeToken,update);

export default userCrudRoutes;
