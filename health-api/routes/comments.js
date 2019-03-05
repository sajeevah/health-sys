var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Comment = require('../models/comment');
var Event = require('../models/event');
require('../models/heartrate');

router.get('/event/:eventid', function(req, res, next) {

    Comment.find({event : req.params.eventid}).populate('event').populate('user').exec().then(function(comments) {
        res.json(comments);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});


router.get('/', function(req, res, next) {

    Comment.find().populate('event').populate('user').exec().then(function(comments) {
        res.json(comments);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});

router.get('/:id', function(req, res, next) {

    const commentId = req.params.id;
    Comment.findById(commentId).exec().then(function(comments) {
        res.json(comments);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    });
});

router.post('/events/:id', function(req, res, next) {

    var newCommentModel = new Comment(req.body);
    const eventId = req.params.id;
    newCommentModel.save().then(function(comment) {

        Event.findByIdAndUpdate(eventId, {$push: {"comments": comment._id}}).then(function(eventDB){
            res.json(comment);
        }).catch(function(err){
            console.error(err);
            res.sendStatus(500);
        });

    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    });


});


router.put('/:id', function(req, res, next) {

    const updateComment = req.body;
    delete updateComment._id;
    const CommentId = req.params.id;
    Comment.findByIdAndUpdate(CommentId, {$set: updateComment}).then(function(CommentDb) {
        updateComment._id = req.params.id;
        res.json(updateComment);
    }).catch(function(err){
        console.error(err);
        res.sendStatus(500);
    })


});

router.delete('/:id', function(req, res, next) {

    Comment.findByIdAndRemove(req.params.id).then(function(comment){
        res.json(comment);
    }).catch(function(err) {
        console.error(err);
        res.sendStatus(500);
    })

});

module.exports = router;
