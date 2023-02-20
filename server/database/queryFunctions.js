const pool = require("../database/db");

const TABLE_NAME = "USERS";

async function userChecker(email) {
  const tmp = await pool.query(
    `SELECT * FROM ${TABLE_NAME} WHERE useremail = $1`,
    [email]
  );

  if (tmp.rows.length !== 0) {
    return { userIsAvailable: true, userData: tmp.rows[0] };
  } else {
    return { userIsAvailable: false, userData: [] };
  }
}

async function getUserData(userId) {
  const tmp = await pool.query(
    `SELECT * FROM ${TABLE_NAME} WHERE user_id =$1`,
    [userId]
  );
  return tmp.rows[0];
}

module.exports = { userChecker, getUserData };
