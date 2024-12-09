import { Router } from "express";
import passport from "passport";
import {
  homepageGet,
  loginFailureGet,
  loginGet,
  loginPost,
  loginRegister,
  loginSuccessGet,
  logoutGet,
  protectedRouteGet,
  registerGet,
} from "../controllers/expressController.js";

const expressRouter = Router();

// POST routes
expressRouter.post("/login", loginPost);

expressRouter.post("/register", loginRegister);

// GET routes
expressRouter.get("/", homepageGet);

expressRouter.get("/login", loginGet);

expressRouter.get("/register", registerGet);

expressRouter.get("/protected-route", protectedRouteGet);

expressRouter.get("/logout", logoutGet);

expressRouter.get("/login-success", loginSuccessGet);

expressRouter.get("/login-failure", loginFailureGet);

export default expressRouter;
