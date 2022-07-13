const express = require('express')

////////////////////////////
var indexRouter = require("./routes/indexRouter");
var uploadRouter=require("./routes/uploadRouter");
////////////////////////////
// const { uploadFile, getFileStream } = require('./s3')


const app = express();
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
app.use("/upload",uploadRouter);
app.listen(3000, () => console.log("listening on port 3000"))