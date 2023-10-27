const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createNewUser,
    updateUserById,
    deleteUserById,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createNewUser);

router
    .route("/:userId")
    .get(getSingleUser)
    .put(updateUserById)
    .delete(deleteUserById);

module.exports = router;
