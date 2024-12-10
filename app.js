import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import dotenv from "dotenv";
import { pool } from "./db/pool.js";
import expressRouter from "./routes/expressRouter.js";
import "./config/passport.js";

// load environment variables
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session middleware
const pgSession = connectPgSimple(session);
const sessionStore = new pgSession({ pool: pool, tableName: "session" });

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// router
app.use("/", expressRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Express app listening on PORT", PORT);
});
