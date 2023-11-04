const { Thoughts } = require("../models");
const { User } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thoughts.findOne({
                _id: req.params.thoughtsId,
            });
            res.json(thoughts);

            if (!thoughts) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID!" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);

            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.updateOne(
                { _id: req.params.thoughtsId },
                { $set: req.body },
                { new: true }
            );
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thoughts.findOneAndDelete({
                _id: req.params.thoughtsId,
            });
            if (!deletedThought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID!" });
            }
            res.json({ message: "Thought deleted successfully!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtsId;

            const update = await Thoughts.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );

            if (!update) {
                return res.status(400).send({
                    message: "Thought not found",
                });
            } else {
                res.status(200).send(update);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "An error occurred",
                error: error.message,
            });
        }
    },

    async removeReaction(req, res) {
        try {
            const { thoughtsId, reactionId } = req.params;

            const thought = await Thoughts.findOneAndUpdate(
                { _id: thoughtsId },
                { $pull: { reactions: { _id: reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: "Thought not found or reaction not found",
                });
            }

            return res.json({ message: "Reaction removed", thought });
        } catch (err) {
            return res
                .status(500)
                .json({
                    message: "Error removing reaction",
                    error: err.message,
                });
        }
    },
};
