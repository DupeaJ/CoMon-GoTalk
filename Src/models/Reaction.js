const mongoose = require("mongoose");

const ReactionSchema = new mongoose.Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = ReactionSchema;
