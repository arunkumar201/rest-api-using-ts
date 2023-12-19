import { NextFunction, Response } from "express";

import { ERROR_MESSAGES } from "./messages";
import { IAuthRequest } from "middleware/auth/auth.middleware";
import { IUserDocument } from "models/user.model";
import passport from "passport";

// auth.middleware.ts

export const passportAuth = (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	passport.authenticate(
		"jwt",
		{ session: false },
		(err: Error, user: IUserDocument) => {
			if (err) {
				return res
					.status(500)
					.json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
			}

			if (!user) {
				return res
					.status(401)
					.json({ message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS });
			}

			req.user = user;
			next();
		}
	)(req, res, next);
};
