import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { JwtPayload, VerifyCallback } from "jsonwebtoken";

import User from "../models/user.model";
import passport from "passport";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new Strategy(options, (payload: JwtPayload, done: VerifyCallback) => {
    User.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, undefined);
        }
      })
      .catch((err) => {
        return done(null, err);
      });
  })
);

export default passport;
