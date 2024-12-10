import dotenv from "dotenv";
import { genPassword } from "../lib/passwordUtils.js";
import db from "../db/queries.js";

dotenv.config();

// POST routes
export const loginRegister = async (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  await db.createUser(req.body.username, hash, salt);

  res.redirect("/login");
};

// GET routes
export const homepageGet = async (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
};

export const loginGet = async (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

export const registerGet = async (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

  res.send(form);
};

export const protectedRouteGet = async (req, res, next) => {
  // develop middleware logic for isAuthenticated
  if (req.isAuthenticated()) {
    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );
  } else {
    res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
    );
  }
};

export const logoutGet = async (req, res, next) => {
  req.logout();
  res.redirect("/protected-route");
};

export const loginSuccessGet = async (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  );
};

export const loginFailureGet = async (req, res, next) => {
  res.send("You entered the wrong password.");
};
