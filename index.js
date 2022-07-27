const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

app.get("/", (req, res) => {
  res.send("Hey");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
