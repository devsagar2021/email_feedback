import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import keys from "../config/getKeys";
import mongoose from "mongoose";

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User already exists");
        done(null, existingUser);
        return;
      }

      console.log("--Creating new user--");
      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        displayPicURL: profile.photos?.[0].value,
        email: profile.emails?.[0].value,
      }).save();

      done(null, user);
      console.log("--Profile created--");
    }
  )
);
