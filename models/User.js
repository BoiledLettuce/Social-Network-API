const { Schema, model } = require('mongoose');
const mom = require('moment');
const userSchema = new Schema({ //maybe capitalize UserSchema
    username:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        isEmail: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);
module.exports = User;