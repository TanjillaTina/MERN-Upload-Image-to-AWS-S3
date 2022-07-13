var express = require("express");
var router = express.Router();
const { uuid } = require("uuidv4");
const AWS = require("aws-sdk");
const keys = require("../keys/config");
const s3 = new AWS.S3({
  accessKeyId: keys.aws.s3ImageBktAccessKeyId,
  secretAccessKey: keys.aws.s3ImageBktScrtAccessKey,
});
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({ name: "Img Upload" });
});
router.get("/getPresignedPicUrl", (req, res, next) => {
  const userId = uuid();
  const key = `${userId}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: keys.aws.bucketName,
      ContentType: "image/jpeg",
      Key: key,
    },
    (err, url) => {
      res.send({
        key: key,
        url: url,
      });
    }
  );
});

module.exports = router;
