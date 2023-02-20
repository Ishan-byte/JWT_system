const router = require("express").Router();
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { userChecker } = require("../database/queryFunctions");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if the user-email already exits or not
    const { userIsAvailable, userData } = userChecker(email);

    // In case the user email already exists in the database
    if (userIsAvailable) {
      return res.status(409).send("User already exists");
    }

    // Creating Salt for encrypting password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(10);

    // Generating a salt encrypted password
    const encryptedpassword = await bcrypt.hash(password, salt);

    // Inserting a new user into the database
    const newUser = await pool.query(
      "INSERT INTO users (username, useremail, userpassword) VALUES ($1, $2, $3) RETURNING  *",
      [name, email, encryptedpassword]
    );

    // JWT generator
    const token = jwtGenerator(newUser.rows[0].user_id);

    // Returning JWT as the response
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    //Destructuring Request Body
    const { email, password } = req.body;

    // Checking user exists or not
    const { userIsAvailable, userData } = await userChecker(email);

    // In the case if user does not exists
    if (!userIsAvailable) {
      return res.status(401).json("Incorrect Password or Email");
    }

    // Comparing the input password and database password
    const validateUserPassword = await bcrypt.compare(
      password,
      userData.userpassword
    );

    // In case the input password is incorrect
    if (!validateUserPassword) {
      return res.status(401).json("Incorrect Password");
    }

    // JWT generator
    const token = jwtGenerator(userData.user_id);

    // Returning JWT as the response
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
