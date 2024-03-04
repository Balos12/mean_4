require("dotenv/config");
require("./db");
const express = require("express");
const app = express();
require("./config")(app);
require("./routes")(app)

module.exports = app;