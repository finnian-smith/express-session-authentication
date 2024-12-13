import { Router } from "express";
import passport from "passport";
import {
  homepageGet,
  loginFailureGet,
  loginGet,
  loginRegister,
  loginSuccessGet,
  logoutGet,
  protectedRouteGet,
  registerGet,
} from "../controllers/expressController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const expressRouter = Router();

// POST routes
expressRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

expressRouter.post("/register", loginRegister);

// GET routes
expressRouter.get("/", homepageGet);

expressRouter.get("/login", loginGet);

expressRouter.get("/register", registerGet);

expressRouter.get("/protected-route", isAuth, protectedRouteGet);

expressRouter.get("/logout", logoutGet);

expressRouter.get("/login-success", loginSuccessGet);

expressRouter.get("/login-failure", loginFailureGet);

export default expressRouter;
