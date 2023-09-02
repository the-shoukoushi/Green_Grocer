// loginserver.js

const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

require("./db/conn");
app.use(require("./router/authlogin"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Login Server is Running at Port No ${PORT}`);
});
