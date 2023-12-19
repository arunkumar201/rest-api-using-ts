import { NextFunction, Request, Response } from "express";

export interface IAuthRequest extends Request {
	userId: number;
}

export const requireUserAuth = async (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	console.log("User Auth middleware runs");
	req.userId = 1;
	next();
};
