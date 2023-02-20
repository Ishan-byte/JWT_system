const jwt = require("jsonwebtoken");
require("dotenv").config;

module.exports = function (req, res, next) {
  // Destructuring jwt token from request
  const token = req.header("token");

  // if token is not available
  if (!token) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  try {
    // verify token with the secret token_key
    const verify = jwt.verify(token, process.env.TOKEN);

    // save the user id in the req body
    req.user = verify.user;

    next();
  } catch (error) {
    //   in case the token is invalid
    return res.status(401).send({ message: "Token is invalid" });
  }
};
