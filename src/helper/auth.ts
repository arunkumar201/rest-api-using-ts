import crypto from "crypto";

export const randomHash = () => crypto.randomBytes(128).toString("base64");

export const authentication = (salt: string, password: string) => {
	return crypto
		.createHmac("sha256", [salt, password].join("/"))
		.update(process.env.SECRET || "234")
		.digest("hex");
};
