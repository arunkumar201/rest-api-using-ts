import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import passport from 'passport'

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET,
};

passport.use(
	new Strategy(options, (payload: JwtPayload, done: Function) => {
		User.findById(payload.id)
			.then((user) => {
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			})
			.catch((err) => {
				return done(err, false);
			});
	})
);

export default passport;
