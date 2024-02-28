import { Request, Response } from "express";

import { getFileText } from "../learning/stream";

export const getTextFile = async (req: Request,res: Response) => {
	try {
		const file = getFileText();
	res.send({message:file})	
	} catch (error) {
		console.log("Error While Reading File",error)
		res.send({error:"Error While Reading File"})
	}
}
