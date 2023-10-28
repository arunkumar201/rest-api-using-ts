import { IUser } from 'types/user.types';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<IUser>({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique:true
	}
},{
	timestamps:true
});

const User = mongoose.model('users',userSchema);
export default User;
