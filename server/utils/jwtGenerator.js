const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(userId) {
  const payload = {
    user: userId,
  };

  console.log(process.env.TOKEN);

  return jwt.sign(payload, process.env.TOKEN, { expiresIn: 60 * 60 });
}

module.exports = jwtGenerator;
