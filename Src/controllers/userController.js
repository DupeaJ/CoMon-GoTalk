const { User, Thoughts } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get singe user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select(
                "-__v"
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID!" });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create a new user
    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update a user by id
    async updateUserById(req, res) {
        try {
            const userId = req.params.userId;

            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $set: req.body },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //delete a user and thoughts
    async deleteUserById(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "No user with that ID!" });
            }
            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User and associated thoughts deleted!" });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};