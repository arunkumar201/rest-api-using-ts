import express, { Request, Response } from "express";
import { getTextFile, readFileUsingStream, writeFileUsingStream } from "../controllers/learning.controller";

const learningRoute = express.Router(); 

//GET APIS COLLECTIONS
learningRoute.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to the Rest Api with ts- Learning" });
});

learningRoute.get("/get-txt-file",getTextFile);

learningRoute.post('/write-stream',writeFileUsingStream)
learningRoute.get('/read-stream',readFileUsingStream)
export default learningRoute;
