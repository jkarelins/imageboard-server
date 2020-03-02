const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
const parserMiddleware = bodyParser.json();
const Image = require("./models/model");
const imageRoute = require("./models/router");

app.use(corsMiddleware);
app.use(parserMiddleware);
app.use("/image", imageRoute);

app.listen(port, () =>
  console.log(`ImageBoard app listening on port ${port}!`)
);
