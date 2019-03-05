'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config/database');
var Event = require('../models/event');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');


var GpsLocation = require('../models/gpslocation');


router.get('/event/:eventid', function(req, res, next) {

    GpsLocation.find({event : req.params.eventid}).exec().then(function(gpsLocation) {
        res.json(gpsLocation);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});

router.post('/upload/event/:id', upload.single('geojson'), function(req, res) {

    fs.readFile(req.file.path, 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        const eventId = req.params.id;
        var userId = req.body.userId;
        var gpsLocation = {
            event : eventId,
            user : userId,
            geoJson : obj
        };

        var newGpsLocationModel = new GpsLocation(gpsLocation);

        newGpsLocationModel.save().then(function(GpsLocation) {
            res.json(GpsLocation);
        }).catch(function(err){
            console.error(err);
            res.sendStatus(500);
        });

    });

});

module.exports = router;