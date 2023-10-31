const { Thoughts } = require("../models");

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughtsData = await Thoughts.find();
            res.json(thoughtsData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const singleThought = await Thoughts.findOne({
                _id: req.params.thoughtsId,
            }).select("-__v");
            if (!singleThought) {
                return res
                    .status(404)
                    .json({ message: "No thought with that ID!" });
            }
            res.json(singleThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = await Thoughts.create(req.body);
            res.json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.updateOne(
                { _id: req.params.thoughtsId },
                req.body
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
    // async addReaction(req, res) {
    //     try {
    //         const addedReaction = await Thoughts.updateOne(
    //             { _id: req.params.thoughtsId },
    //             req.body
    //         );
    //         res.json(addedReaction);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // },
    async addReaction(req, res) {
        try {
            const thought = await Thoughts.findById(req.params.userId);
            const post = await post.findOneAndUpdate(
                { _id: req.body.postId },
                { $addToSet: { reaction: reaction._id } },
                { new: true }
            );
            if (!user.friends.includes(req.params.friendId)) {
                user.friends.push(req.params.friendId);
                await user.save();
                res.status(200).send({ message: "Friend added successfully!" });
            } else {
                res.status(400).send({ message: "Already friends!" });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete(
                { _id: req.params.thoughtsId },
                req.body
            );
            res.json(addedReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
