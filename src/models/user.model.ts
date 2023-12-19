import { Document, Schema, model } from "mongoose";

import { IUser } from "types/user.types";

export interface IUserDocument extends Document, IUser {}

const userSchema = new Schema<IUser>(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model<IUserDocument>("users", userSchema);

export default UserModel;
