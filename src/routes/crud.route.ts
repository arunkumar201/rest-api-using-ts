import { create, get, getUser, remove, update } from "../controllers/user.controller";
import express, { Request, Response } from "express";

const userRoutes = express.Router();

//GET APIS COLLECTIONS
userRoutes.get("/",(req: Request,res: Response) => {
	res.send({ message: "Welcome to the Rest Api with ts" });

});

userRoutes.get("/users", get);
userRoutes.get("/users/:email", getUser);

//post
userRoutes.post("/create-user", create);

//put
userRoutes.delete("/delete-user", remove);

//delete
userRoutes.put("/update-user", update);

export default userRoutes;
