var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({name:"Tina Home"})
});

module.exports = router;
