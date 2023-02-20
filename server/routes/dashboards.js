const router = require("express").Router();
const authGuard = require("../middleware/authGuard");
const Pool = require("../database/db");
const { getUserData } = require("../database/queryFunctions");

router.get("/", authGuard, async (req, res) => {
  try {
    const userData = await getUserData(req.user);
    res.json({ userData });
  } catch (error) {
    console.log(error.message);
    res.statusCode(500).send("Internal Server Error");
  }
});

module.exports = router;
