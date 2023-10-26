import User from "../models/user.model";

export const getAllUsers = async () => {
  try {
	  const users = await User.find();
	  if (!users) {
		  return null;
	  }
	  return users;
	  
  } catch (error:unknown) {
	  console.log("can't find users")
	  return null;
  }
}
