import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import keys from "../config/getKeys";
import mongoose from 'mongoose';

const User = mongoose.model('users');

passport.serializeUser(( user, done ) => {
  // @ts-ignore
  done(null, user.id);
});

passport.deserializeUser(( id, done ) => {
  User.findById(id)
    .then((user: typeof User) => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
    },
    (_accessToken, _refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            console.log('User already exists');
            done(null, existingUser);
            return;
          }

          console.log('Creating new user:', profile);
          new User({
            googleId: profile.id,
            displayName: profile.displayName,
            displayPicURL: profile.photos?.[0].value,
          }).save()
            .then((user: typeof User) => {
              done(null, user)
              console.log('--Profile created--');
            });
        });
    }
  )
);
