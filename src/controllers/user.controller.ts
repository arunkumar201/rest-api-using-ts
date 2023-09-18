import { IUser } from "types/user.types";
import userModel from "./../models/user.model";

//get methods
export const getUsers = async (): Promise<IUser[] | null> => {
	try {
		const users = await userModel.find();
		if (!users) {
			return null;
		}
		return users;
	} catch (e: unknown) {
		console.log("Error is Occurred in getUsers", e);
	}
};
export const getUserByUserName = async (
	userName: string
): Promise<IUser | null> => {
	try {
		const user = await userModel.findOne({ userName });
		if (!user) {
			return null;
		}
		return user;
	} catch (e: unknown) {
		console.log("Error is Occurred in getUserByUserName", e);
	}
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return null;
		}
		return user;
	} catch (e: unknown) {
		console.log("Error is Occurred in getUserByEmail", e);
	}
};

export const getUserBySessionToken = async (
	sessionToken: string
): Promise<IUser | null> => {
	try {
		const user = await userModel.findOne({
			"authentication.sessionToken": sessionToken,
		});
		if (!user) {
			return null;
		}
		return user;
	} catch (e: unknown) {
		console.log("Error is Occurred in getUserBySessionToken", e);
	}
};
//Post Methods
export const createUser = async (user: Record<string, IUser>) => {
	// <!--check if User Exist or not-->
	const userName: any = user.userName;
	const email: any = user.email;
	const isExist = await userModel.findOne({
		email: { $eq: email },
		userName: { $eq: userName },
	});
	const newUser = new userModel(user);
	await newUser.save();
	if (newUser.isNew && isExist) {
		throw new Error("User already exists");
	}
	return true;
	
};
//update Methods (PATH)
// <!-- delete User By UserName -->
export const deleteUserByUserName = async (
	userName: string
): Promise<boolean> => {
	try {
		await userModel.findOneAndDelete({ userName });
		return true;
	} catch (e: unknown) {
		console.log("Something went wrong,can't delete user");
	}
	return false;
};

export const updateUserByUserName = async (
	userName: string,
	updatedData: Partial<IUser>
): Promise<boolean> => {
	try {
		const result = await userModel.findOneAndUpdate({ userName }, updatedData);

		if (result) {
			return true;
		} else {
			console.log("User not found.");
		}
	} catch (e: unknown) {
		console.log("Something went wrong, can't update user.");
	}
	return false;
};
