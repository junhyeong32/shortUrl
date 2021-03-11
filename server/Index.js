const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const shortUrlRouter = require("./routes/shortUrl");
require("dotenv").config();
const port = process.env.PORT || 3011;

app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/routes", shortUrlRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
