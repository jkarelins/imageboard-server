const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
// const db = require("./db");
const Image = require("./models/model");
const imageRoute = require("./models/router");

app.use("/image", imageRoute);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`ImageBoard app listening on port ${port}!`)
);
