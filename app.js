require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session");
const { isAuth } = require("./lib/authMiddleware");

require("./config/passport")(passport);

// app setup
const app = express();

app.use(cors());
app.use(express.json());
app.set(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use("/auth", authRouter);
app.get("/", isAuth, (req, res) => res.json(req.user));
app.get("/test", isAuth, (req, res) =>
  res.send(`Yes, you are ${req.user.username}`)
);

// errrorHandler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on PORT: ${port}`);
});
