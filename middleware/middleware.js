require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuthorized = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      if (token) {
        const payload = await jwt.verify(token, `${process.env.TOKEN_SECRET}`);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "Token verification failed" });
        }
      } else {
        res.status(400).json({ error: "Wrong Authorization header" });
      }
    } else {
      res.status(400).json({ error: "No Authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  isAuthorized,
};
