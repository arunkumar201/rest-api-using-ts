import express, { Request, Response } from 'express'

import { getUsers } from '../controllers/user.controller';

const router = express.Router(); 


//GET APIS COLLECTIONS
router.get("/",(req: Request,res: Response) => {	
	res.send({ message: "Welcome to the Rest Api with ts" }).send(201);
	
});

router.get("/users", getUsers);





export default router;
