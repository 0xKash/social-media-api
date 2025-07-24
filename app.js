require("dotenv").config();

// imports
const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

// app setup
const app = express();

app.use(cors());
app.use(express.json());
app.set(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

// errrorHandler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err);
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
  console.log(`Listening on PORT: ${port}`);
});
