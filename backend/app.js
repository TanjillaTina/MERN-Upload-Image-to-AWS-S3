const express = require("express");
const bodyParser = require("body-parser");
var indexRouter = require("./routes/indexRouter");
var uploadRouter = require("./routes/uploadRouter");
var keys = require("./keys/config");

/////////mongodb config starts
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//connect to mongodb
mongoose
  .connect(keys.db_url)
  .then(() => {
    console.log("Database Connencted");
  })
  .catch(() => {
    console.log("connection failed");
  });

/////////mongodb config ends

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Bearer, secret_token, auth"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.listen(3000, () => console.log("listening on port 3000"));
