import { IUser } from "types/user.types";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({
	fullName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	authentication: {
		password: {
			type: String,
			required: true,
			select: false,
		},
		salt: {
			required: true,
			type: String,
			select: false,
		},
		sessionToken: {
			type: String,
			required: true,
			select: false,
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const userModel = mongoose.model('users',userSchema);
export default userModel;
