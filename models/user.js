const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ types: Schema.Types.ObjectId, ref: 'user' }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length
    })

const User = model('user', userSchema);
module.exports = User;