const router = require("express").Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

router
    .route("/:thoughtsId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router.route("/:thoughtsId/reactions").post(addReaction);
router.route("/:thoughtsId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
