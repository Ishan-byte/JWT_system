const express = require("express");
const cors = require("cors");

// Configs
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//Router
app.use("/auth", require("./routes/jwtAuth"));

app.listen(5000, () => {
  console.log("Server is running");
});
