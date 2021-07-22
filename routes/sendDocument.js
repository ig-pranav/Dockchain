var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('sendDocument', { title: 'Express' });
  });

  
  module.exports = router;