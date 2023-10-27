const { Schema, model, Types } = require("mongoose");
const ThoughtsSchema = require("./Thoughts"); 

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"], // regex for email validation (cant be duplicated emails)
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: "Thoughts",
            },
        ],
        friends: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual for friendCount
UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

module.exports = model("User", UserSchema);
