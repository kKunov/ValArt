var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/galleriNamesInFolder', function(req, res) {
    fs.readdir(path.join(__dirname, "../public/images/gal", req.query.galleryName), function(err, files) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else{
            res.json(files);
        }
    });
});

module.exports = router;