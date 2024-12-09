import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { pool } from "../db/pool.js";
import crypto from "crypto";

// TODO: passport.use();
