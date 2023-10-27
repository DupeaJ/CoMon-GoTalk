const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

router
    .route("/:thoughtsId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;
