var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET home page. */

router.get("/", (req, res) => {
  res.render('setDocument')
});

module.exports = router;