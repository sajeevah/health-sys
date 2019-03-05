'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: {
        type: String
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

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;