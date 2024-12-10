import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../db/queries.js";
import { validatePassword } from "../lib/passwordUtils.js";

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username or password." });
    }

    const isValid = validatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

// serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});
