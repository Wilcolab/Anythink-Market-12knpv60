const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

/**
 * GET /
 * Retrieves all comments from the database
 * @returns {Array} Array of comment objects
 * @returns {Object} Error object if retrieval fails
 */
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /
 * Creates a new comment
 * @param {Object} req.body - Request body
 * @param {String} req.body.text - Comment text content
 * @param {String} req.body.author - Comment author name
 * @returns {Object} Created comment object with 201 status
 * @returns {Object} Error object with 400 status if creation fails
 */
router.post("/", async (req, res) => {
  try {
    const { text, author } = req.body;
    const newComment = new Comment({ text, author });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE /:id
 * Deletes a comment by its ID
 * @param {String} req.params.id - Comment ID to delete
 * @returns {Object} Success message if deletion succeeds
 * @returns {Object} 404 error if comment not found
 * @returns {Object} 500 error if deletion fails
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});