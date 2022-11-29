const mongoose = require('mongoose')
const { Schema, model } = require('mongoose');


const reactionSchema = new Schema({
    reactionId: {
        ObjectId: mongoose.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: getDate,
    },
})

function getDate(unixDate) {
    let date = unixDate.toLocaleDateString('en-US')
    return date
}

module.exports = reactionSchema;