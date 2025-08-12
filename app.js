require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session");
const { isAuth } = require("./lib/authMiddleware");
const { test } = require("./controllers/authController");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRouter");

require("./config/passport")(passport);

// app setup
const app = express();

const allowedOrigins = [
  "https://social-media-frontend-seven-umber.vercel.app", // Production
  "http://localhost:3000", // Development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.set(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.session());
app.use(passport.initialize());

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
