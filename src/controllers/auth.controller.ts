import { authentication, randomHash } from "./../helper/auth";
import {
	createUser,
	getUserByEmail,
	getUserByUserName,
} from "./user.controller";

import express from "express";

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, userName } = req.body;
		if (!email || !password || !userName) {
			return res.sendStatus(400);
		}
		const isUserExist =
			(await getUserByEmail(email)) && (await getUserByUserName(userName));
		if (isUserExist) {
			return res.status(201).json({
				message: "User already exists",
			});
		}
		const salt: string = randomHash();
		const newUser: any = {
			email,
			userName,
			authentication: {
				salt: salt,
				password: authentication(salt, password),
			},
		};
		try {
			const user = await createUser(newUser);
			return res.status(201).json({ message: "User created successfully" });
		} catch (error) {
			return res.status(500).json({ message: "Error creating user" });
		}
	} catch (err: unknown) {
		return res.send({ message: "Something went wrong", status: 400 });
	}
};
