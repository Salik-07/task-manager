const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
