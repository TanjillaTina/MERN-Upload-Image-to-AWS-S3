var express = require("express");
var router = express.Router();
const { uuid } = require("uuidv4");
const AWS = require("aws-sdk");
const keys = require("../keys/config");

router.get("/", function (req, res, next) {
  res.send({ name: "Img Upload" });
});

const s3 = new AWS.S3({
  accessKeyId: keys.aws.s3ImageBktAccessKeyId,
  secretAccessKey: keys.aws.s3ImageBktScrtAccessKey,
  region: keys.aws.region,
});
router.get("/getPresignedUrl/:userId/:imgType", (req, res, next) => {
  const imgId = uuid();
  const key = `${req.params.userId}/${imgId}.${req.params.imgType}`;

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: keys.aws.bucketName,
      ContentType: `image/${req.params.imgType}`,
      Key: key,
      Expires: 3000,
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
