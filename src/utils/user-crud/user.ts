import User from "models/user.model";

/**
 * Retrieves a user based on their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @return {Promise<Object | null>} An object containing a success message and the user data if found, or null if not found.
 */
export const getUser = async (email: string): Promise<object | null> => {
	try {
		const user = await User.findOne({ email });
		if (user) {
			return {
				message: "User Found successfully",
				data: user,
			};
		}
		return null;
	} catch (error) {
		console.log(`Error while getting user: ${error}`);
		return null;
	}
};
