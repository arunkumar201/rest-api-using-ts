import { Request, Response } from "express";

import fs from 'fs'

export const getTextFile = async (req: Request,res: Response) => {
	try {
		const readStream = fs.createReadStream('./sample.txt','utf-8')
	readStream.on("data",(chunk) => {
		 res.write(chunk)
	})
		readStream.on("end",() => { 
			res.end();
		})
	} catch (error) {
		console.log("Error While Reading File",error)
		res.send({error:"Error While Reading File"})
	}
}
