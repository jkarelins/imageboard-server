const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);
const bodyParser = require("body-parser");
const parserMiddleware = bodyParser.json();
const imageRoute = require("./models/router");
const loginRoute = require("./auth/router");

app.use(parserMiddleware);
app.use("/image", imageRoute);
app.use(loginRoute);

app.listen(port, () =>
  console.log(`ImageBoard app listening on port ${port}!`)
);
