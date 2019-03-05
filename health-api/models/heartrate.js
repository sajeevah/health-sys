'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeartrateSchema = new Schema({
    heartrate: {
        type: Number,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Heartrate = mongoose.model('Heartrate', HeartrateSchema);

module.exports = Heartrate;