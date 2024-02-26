import { APP_EVENTS_TYPE } from "../constants";
import { EventEmitter } from "node:stream";

export const userEventEmitter = new EventEmitter();

userEventEmitter.on(APP_EVENTS_TYPE.NEW_USER_CREATED, (user: unknown) => {
	//here we can perform any kind of business logic
	console.log("new user created", user);
});
