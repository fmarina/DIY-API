require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    res
      .status(400)
      .send({ message: "Username and password fields are required" });
    return;
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    password: hashPassword,
  });
  user
    .save(user)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username.trim() || !password.trim()) {
    res
      .status(400)
      .send({ message: "Username and password fields are required" });
    return;
  }

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send("Username or Password is incorrect");
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("The password is incorrect");
  const token = jwt.sign({ _id: user._id }, `${process.env.TOKEN_SECRET}`);
  res.header("auth-token", token).send(token);
};

module.exports = {
  register,
  login,
};
