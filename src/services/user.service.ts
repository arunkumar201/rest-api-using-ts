import { IUser } from "types/user.types";
import User from "../models/user.model";

export const getUserDetails = async (email: string) => {
	try {
		const user = await User.findOne({ email });

		if (user) {
			return user;
		} else {
			return null;
		}
	} catch (error) {
		console.error(`Error while getting user by email: ${error}`);
		return null;
	}
};


export const getAllUsers = async () => {
	try {
		const users = await User.find();
		if (!users) {
			return null;
		}
		return users;
	} catch (error: unknown) {
		console.log("can't find users");
		return null;
	}
};
export const createUser = async (user: IUser) => {
	try {
		const newUser = new User(user);
		const isExist = await User.exists({ email: user.email });
		if (isExist) {
			return "User already exists";
		}
		await newUser.save();
		return "user created successfully";
	} catch (error) {
		console.log("Erorr While Creating User Error", error);
		return null;
	}
};

export const deleteUser = async (email: string) => {
	try {
		await User.findOneAndDelete({ email });
		return `User with email ${email}  deleted successfully`;
	} catch (error) {
		console.log(`Erorr While Deleting user With Email ${email} Error ${error}`);
		return null;
	}
};

export const updateUser = async (user: IUser) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ email: user.email.toLocaleLowerCase() },
			{ $set: { fullName: user.fullName } }
		);
		if (updatedUser) {
			return `User with email ${user.email} updated successfully`;
		} else {
			return null;
		}
	} catch (error) {
		console.log(`Error While Updating user With Email ${user.email}: ${error}`);
		return null;
	}
};
