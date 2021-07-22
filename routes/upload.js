var express = require('express');
var router = express.Router();
var ipfsAPI  = require('ipfs-api');

router.post('/', function (req, res, next) {
    typeOfDocument = req.body.typeOfDocument;
    docId = req.body.docId;
    fileBytes = req.files.certificate.data;

    console.log("typeOfDocument", typeOfDocument);
    console.log("docId", docId);
    console.log("fileBytes", fileBytes);

    const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' });
    
    ipfs.files.add(fileBytes, function (err, file) {
        if (err) throw err;
        ifpsHash = file[0].hash;
        console.log("ipfs hash", ifpsHash);
        DocVerify.methods.setDocument(typeOfDocument, docId, ifpsHash).send({ from: account, gas : 6000000 }).then(function(result){
        res.send(file);
        })

        
    });

    res.render('setDocumentDetails',{ title: this.typeOfDocument, title1: this.docId});
});

module.exports = router;
