require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRouter");
const pgSession = require("connect-pg-simple");
const { Pool } = require("pg");

require("./config/passport")(passport);

// app setup
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // development
      "https://social-media-frontend-nine-mocha.vercel.app", // production
    ],
    credentials: true,
  })
);

app.use(express.json());
app.set(express.urlencoded({ extended: true }));

app.set("trust proxy", 1); // Trust vercel proxy

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: new pgSession({
      pool: pgPool,
      tableName: "session",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

console.log("NODE_ENV:", process.env.NODE_ENV);

// Routers
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

// errrorHandler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on PORT: ${port}`);
});

module.exports = app;
