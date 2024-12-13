import { Router } from "express";
import passport from "passport";
import {
  adminRouteGet,
  homepageGet,
  loginFailureGet,
  loginGet,
  loginRegister,
  loginSuccessGet,
  logoutGet,
  protectedRouteGet,
  registerGet,
} from "../controllers/expressController.js";
import { isAuth, isAdmin } from "../middleware/authMiddleware.js";

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

expressRouter.get("/admin-route", isAdmin, adminRouteGet);

expressRouter.get("/logout", logoutGet);

expressRouter.get("/login-success", loginSuccessGet);

expressRouter.get("/login-failure", loginFailureGet);

export default expressRouter;
