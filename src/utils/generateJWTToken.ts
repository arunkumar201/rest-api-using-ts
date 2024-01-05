import jwt from "jsonwebtoken";

/**
 * Generates a JWT token using the given email and name.
 *
 * @param {string} email - The email of the user.
 * @param {string} name - The name of the user.
 * @return {string} The generated JWT token.
 */
export const generateJWTToken = (email: string, name: string): string => {
	const secretKey = process.env.SECRET ?? "xyz";
	const token = jwt.sign({ email: email, name: name }, secretKey, {
		expiresIn: "5h",
	});
	return token;
};
