const emailChecker = require("../utils/emailChecker");

module.exports = function (req, res, next) {
  const { name, email, password } = req.body;

  if (!emailChecker(email)) {
    return res.status(401).send("Invalid email");
  }

  if (req.path == "/login") {
    if (password === null || undefined) {
      return res.status(401).json({ message: "Missing Credentials" });
    }
  } else if (req.path == "/register") {
    if (![email, password, name].every(String)) {
      return res.status(401).json({ message: "Missing Credentials" });
    }
  }

  next();
};
