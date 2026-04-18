const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// GET /api/comments - Retrieve all comments
router.get('/', async (req, res) => {
    try {
        // Fetch all comments from the database
        const comments = await Comment.find();
        // Send the comments as JSON response
        res.json(comments);
    } catch (err) {
        // Handle errors by sending a 500 status with error message
        res.status(500).json({ error: err.message });
    }
});

