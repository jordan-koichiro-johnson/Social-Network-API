const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: getDate,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'post'
    }]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })


function getDate(unixDate) {
    let date = unixDate.toLocaleDateString('en-US')
    return date
}

const Thought = model('thought', thoughtSchema);
module.exports = Thought;