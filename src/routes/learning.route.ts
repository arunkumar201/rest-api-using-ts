import express, { Request, Response } from "express";

import { getTextFile } from "../controllers/learning.controller";

const learningRoute = express.Router(); 

//GET APIS COLLECTIONS
learningRoute.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to the Rest Api with ts- Learning" });
});

learningRoute.get("/get-txt-file",getTextFile);
export default learningRoute;
