import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ERROR_MESSAGES } from "./messages";
import { IAuthRequest } from "middleware/auth/auth.middleware";

export const DecodeToken = async (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers?.authorization;
	const token = authHeader?.split(" ")[1];
	if (!token) {
		return res.status(400).json({ message: ERROR_MESSAGES.MISSING_PARAMETERS });
	}
	try {
		const decode: JwtPayload = jwt.verify(
			token,
			process.env.SECRET ?? "123"
		) as JwtPayload;
		if (!decode || !decode.id) {
			throw new Error("Invalid token structure");
		}

		req.userId = decode.id;
		next();
	} catch (error) {
		console.error("Error decoding token:", error);
		res.status(401).json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
	}
};
