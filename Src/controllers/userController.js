const { User, Thoughts } = require("../models");

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate("thoughts");
            console.log(users);
            res.json(users);
        } catch (err) {
            console.error(err);
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

            if (user.thoughts.length) {
                await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            }

            return res.json({
                message: "User and associated thoughts deleted!",
            });
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Error deleting user", error: err.message });
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);

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
    async removeFriend(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const friendIndex = user.friends.indexOf(req.params.friendId);

            if (friendIndex !== -1) {
                user.friends.splice(friendIndex, 1);
                await user.save();
                res.status(200).send({
                    message: "Friend removed successfully!",
                });
            } else {
                res.status(404).send({ message: "Friend not found!" });
            }
        } catch (error) {
            res.status(500).send(error);
        }
    },
};
