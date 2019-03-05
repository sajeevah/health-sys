'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config/database');
var Event = require('../models/event');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

var HeartRate = require('../models/heartrate');

require('../models/comment');

router.get('/event/:eventid', function(req, res, next) {
  
  		var eventid = req.params.eventid;

		HeartRate.find( { event : eventid } , function(err,event){
			if(err)
				console.log("Erorr getting posts");
			res.send(event);
		})
});

router.post('/events/:id', function(req, res, next) {

    var newHeartrateModel = new HeartRate(req.body);
    const eventId = req.params.id;
    newHeartrateModel.save().then(function(heartrate) {

        Event.findByIdAndUpdate(eventId, {$push: {"heartrates": heartrate._id}}).then(function(eventDB){
            res.json(heartrate);
        }).catch(function(err){
            console.error(err);
            res.sendStatus(500);
        });

    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    });
});

router.post('/upload/event/:id', upload.single('heartrate'), function(req, res) {

    fs.readFile(req.file.path, 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj[0].name);
        const eventId = req.params.id;
        var heartrates = [];
        for(var x = 0; x < obj.length; x++){

            var newHeartrateModel = new HeartRate(obj[x]);
            newHeartrateModel.save().then(function(heartrate) {

                Event.findByIdAndUpdate(eventId, {$push: {"heartrates": heartrate._id}}).then(function(eventDB){
                    //res.json(heartrate);
                    heartrates.push(heartrate);

                    if(heartrates.length == obj.length){
                        res.json(heartrates);
                    }

                }).catch(function(err){
                    console.error(err);
                    //res.sendStatus(500);
                });

            }).catch(function(err){
                console.error(err);
                //res.sendStatus(500);
            });
        }
    });

});

router.put('/:id', function(req, res, next) {

    const updateHeartrate = req.body;
    delete updateHeartrate._id;
    const HeartrateId = req.params.id;
    HeartRate.findByIdAndUpdate(HeartrateId, {$set: updateHeartrate}).then(function(HeartrateDb) {
        updateHeartrate._id = req.params.id;
        res.json(updateHeartrate);
    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    })

});

router.delete('/:id', function(req, res, next) {

    HeartRate.findByIdAndRemove(req.params.id).then(function(heartrate){
        res.json(heartrate);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    })

});

module.exports = router;
