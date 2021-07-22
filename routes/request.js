var express = require('express');
var router = express.Router();
const requestdata = require('../model/requestModel');

router.get('/', function(req, res){
    requestdata.find()
    .then(function(data){
        res.render("request",{  data });
    })
})

router.get('/send', function(req,res){
    var item = {
      email:req.param('email'),
      documentType:req.param('documentType'),
      docId:req.param('docId'),
      image:req.param('image')
    }
    console.log(item);
    const data = new requestdata(item);
    data.save();
    res.send('Request Confirmed. After Uploaded to Blockchain you will be notified by the Registered Email address... ')
  })

  router.post('/delete',function(req,res){
    requestdata.findByIdAndDelete(req.body.del,function(err, data){
        console.log(data);
    })
    res.redirect('/request');
})

  module.exports = router;
