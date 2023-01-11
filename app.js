require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.json());

app.use("/", productRoutes);

app.use("/v1/health", (req, res) => {
  res.send("Hello world! This is a public endpoint!");
});

app.use("/auth", authRoutes);

const mongoDB = process.env.DATABASE_URL;

mongoose.connect(mongoDB);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Successfully connected to database");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
