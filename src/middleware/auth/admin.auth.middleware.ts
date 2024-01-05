import { NextFunction, Request, Response } from "express";

import { ERROR_MESSAGES } from "../../utils//messages";

export interface IAuthRequest extends Request {
	email?: string;
	isAdminAuth?: boolean;
}

export const requireAdminAuth = async (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.email !== process.env.ADMIN_EMAIL) {
		return res.status(200).json({
			message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
			description: "ONLY ACCESSIBLE BY ADMIN",
		});
	}

	req.isAdminAuth = true;
	next();
};
