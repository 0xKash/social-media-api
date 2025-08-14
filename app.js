require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRouter");

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
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);
app.use(passport.session());
app.use(passport.initialize());

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
