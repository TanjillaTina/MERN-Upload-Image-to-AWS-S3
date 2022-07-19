var express = require("express");
var router = express.Router();
const Para = require("../models/para");
router.get("/", function (req, res, next) {
  res.send({ name: "Tina Home" });
});
router.post("/save-para", (req, res, next) => {
  const np = new Para({
    imgUrl: req.body.imgUrl,
    title: req.body.title,
  });
  np.save()
    .then((result) => {
      res.status(200).json({
        success: true,
        error: "Added Paragraph!!",
      });
    })
    .catch((error) => {
      res.status(404).json({
        success: false,
        error: "Failed to Add Paragraph!! Try Again!!",
      });
    });
});
router.get("/all-para", (req, res, next) => {
  Para.find({})
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          imagess: result,
        });
      } else {
        return res.status(404).json({
          success: false,
          error: "No Imgae is Found",
        });
      }
    })
    .catch((error) => {
      return res.status(404).json({
        success: false,
        error: "Internal Server Error!!! Try Again",
      });
    });
});
module.exports = router;
