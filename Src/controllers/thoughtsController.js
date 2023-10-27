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
};
