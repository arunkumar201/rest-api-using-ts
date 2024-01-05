import { NextFunction, Request, Response } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserDetails,
	updateUser,
} from "../services/user.service";

import { ERROR_MESSAGES } from "../utils/messages";
import { IAuthRequest } from "middleware/auth/auth.middleware";
import { IUser } from "types/user.types";
import bcrypt from "bcrypt";
import { generateJWTToken } from "../utils/generateJWTToken";

//get methods
export const get = async (
	req: IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await getAllUsers();
		if (users) {
			res.status(201).json({ users: users });
		}
	} catch (err: unknown) {
		console.log("Error is Occurred in getUsers", err);
		next(err);
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.debug("🚀 ~ file: user.controller.ts:28 ~ getUser ~ email:");
		const { email } = req.params;
		const users = await getUserDetails(email);
		if (users) {
			res.status(201).json({ users: users });
		} else {
			return res.status(404).json({ message: "user not found" });
		}
	} catch (err: unknown) {
		console.log("Error is Occurred in getUsers", err);
		next(err);
	}
};

// Post Methods
export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { fullName, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);
		const userData: IUser = {
			fullName,
			password: hashedPassword,
			email: email.toLowerCase(),
		};

		const result = await createUser(userData);

		res.status(201).json({ data: result });
	} catch (error) {
		console.log(`error while creating user: ${error}`);
		next(error);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			message: `${ERROR_MESSAGES.MISSING_PARAMETERS},Please provide email and password`,
		});
	}
	try {
		const isExistingUser = await getUserDetails(email);
		if (!isExistingUser) {
			return res.status(200).json({
				message: ERROR_MESSAGES.USER_NOT_FOUND,
			});
		}
		const isPasswordMatched = await bcrypt.compare(
			password,
			isExistingUser.password
		);
		if (!isPasswordMatched) {
			return res.status(200).json({
				message: ERROR_MESSAGES.INVALID_PASSWORD,
			});
		}
		const token = generateJWTToken(email, isExistingUser.fullName);
		delete isExistingUser.password;
		return res.status(200).json({
			message: "User logged in successfully",
			data: { user: isExistingUser, token },
		});
	} catch (error) {
		console.log(`error while creating user: ${error}`);
		return res
			.status(500)
			.json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
	}
};

//PUT method
export const update = async (
	req: Request & IAuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email: currentEmail } = req;

		const { email, fullName } = req.body;

		if (!email || !fullName) {
			return res
				.status(200)
				.json({ message: ERROR_MESSAGES.MISSING_PARAMETERS });
		}

		//Check the new email is unique or not
		const isEmailTaken = await getUserDetails(email);
		if (!isEmailTaken) {
			res.status(200).json({ message: ERROR_MESSAGES.EMAIL_ALREADY_TAKEN });
		}

		const result = await updateUser({ email, fullName });

		if (result) {
			return res.status(200).json({ message: "User updated successfully" });
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error(`Error while updating user: ${error}`);
		return res.status(500).json({ message: "Internal server error" });
	}
};

// DELETE method
export const remove = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body;

		const deletedUser = await deleteUser(email);

		if (deletedUser) {
			return res
				.status(200)
				.json({ message: "User deleted successfully", user: deletedUser });
		} else {
			return res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		console.error(`Error while deleting user: ${error}`);
		return res.status(500).json({ message: "Internal server error" });
	}
};
