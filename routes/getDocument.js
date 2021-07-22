var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function (req, res, next) {
  data = req.query;
  console.log(data);
  DocVerify.methods.getDocument(data.typeOfDocument, data.docId)
      .call({  gas: 6000000 }).then((val) => {
          console.log(val);
          // val._age = web3.utils.toBN(val._age).toString();
          res.render("getDocument", {myData : val});
      })
});

module.exports = router;
