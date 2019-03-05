'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose event model
var eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    publish: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['not start', 'running', 'pause', 'completed']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    heartrates: [{
        type: Schema.Types.ObjectId,
        ref: 'Heartrate'
    }]
});


var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
