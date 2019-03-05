'use strict';

var express = require('express');
var router = express.Router();
var config = require('../config/database');
var mongoose = require('mongoose');
var Event = require('../models/event');

router.get('/', function(req, res, next) {

    Event.find().populate('user').populate('comments').populate('heartrates').exec().then(function(events) {
        res.json(events);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});

router.get('/publish', function(req, res, next) {

    Event.find({publish: true}).populate('user').populate('comments').populate('heartrates').exec().then(function(events) {
        res.json(events);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});

// get event by id
router.get('/:id', function(req, res, next) {

    Event.findById(req.params.id).exec().then(function(event) {
        res.json(event);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});


router.get('/user/:userid', function(req, res, next) {
  
  		var userid = req.params.userid;

    	Event.find({user : userid}).exec().then(function(events) {
        	res.json(events);
    	}).catch(function(err) {
        	console.error(err);
        	res.sendStatus(500);
    	});
});

router.post('/user/:id', function(req, res, next) {

    var newEventModel = new Event(req.body);

    const userId = req.params.id;

    newEventModel.user = userId;

    newEventModel.save().then(function(event) {
        res.json(event);
    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    });


});

router.put('/:id', function(req, res, next) {

    const updateEvent = req.body;
    delete updateEvent._id;
    const EventId = req.params.id;
    Event.findByIdAndUpdate(EventId, {$set: updateEvent}).then(function(EventDb) {
        updateEvent._id = req.params.id;
        res.json(updateEvent);
    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    })


});

module.exports = router;
