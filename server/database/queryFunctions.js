const pool = require("../database/db");

async function userChecker(email) {
  const tmp = await pool.query("SELECT * FROM USERS WHERE useremail = $1", [
    email,
  ]);

  if (tmp.rows.length !== 0) {
    return { userIsAvailable: true, userData: tmp.rows[0] };
  } else {
    return { userIsAvailable: false, userData: [] };
  }
}

module.exports = { userChecker };
