import { NextFunction, Request, Response } from "express";
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserDetails,
	updateUser,
} from "../services/user.service";

import { IAuthRequest } from "middleware/auth/auth.middleware";
import { IUser } from "types/user.types";
import expressAsyncHandler from "express-async-handler";

//get methods
export const get = expressAsyncHandler(
	async (req: IAuthRequest, res: Response, next: NextFunction) => {
		try {
			const users = await getAllUsers();
			if (users) {
				res.status(201).json({ users: users });
			}
		} catch (err: unknown) {
			console.log("Error is Occurred in getUsers", err);
			next(err);
		}
	}
);

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

//Post Methods
export const create = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { fullName, email } = req.body;
		const userData: IUser = {
			fullName,
			email: email.toLowerCase(),
		};
		const result = await createUser(userData);

		res.json({ data: result }).status(201);
	} catch (error) {
		console.log(`error while creating user: ${error}`);
		next(error);
	}
};

//PUT method
export const update = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, fullName } = req.body;

		const data = {
			email,
			fullName,
		};

		const result = await updateUser(data);

		if (result) {
			return res
				.status(200)
				.json({ message: "User updated successfully", user: result });
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
