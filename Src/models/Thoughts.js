const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const ReactionSchema = require('./Reaction')

const ThoughtsSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Virtual for reactionCount
ThoughtsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

module.exports = model("Thoughts", ThoughtsSchema);
