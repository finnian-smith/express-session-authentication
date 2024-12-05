import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import pg from "pg";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db connection string
const pgPool = new pg.Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

// session middleware
app.use(
  session({
    store: new (pgSession(session))({
      pool: pgPool,
    }),
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  if (!req.session.viewCount) req.session.viewCount = 1;
  else req.session.viewCount++;
  res.send(`You have visited this page ${req.session.viewCount} times`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Express app listening on PORT", PORT);
});
