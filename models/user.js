const { Schema, model } = require('mongoose');

var validEmail = function (e) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(e)
}


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trime: true,
            validate: [validEmail, "please fill a valid email address"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
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