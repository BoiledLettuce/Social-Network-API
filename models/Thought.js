const { Schema, model, Types } = require('mongoose');
const mom = require('moment');
const reactionSchema = new Schema({ //maybe capitalize ReactionSchema
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => mom(createdAtVal).format('llll') //https://devhints.io/moment
    },
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 255
    }
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
const thoughtSchema = new Schema({
    thoughtContent: {
        type: String,
        required: true,
        maxLength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => mom(createdAtVal).format('llll')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);
module.exports = Thought;