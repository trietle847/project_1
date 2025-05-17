const express = require("express");
const commentController = require("../controller/comments.controller")
const authMiddleware = require("../middlewares/auth.middleware");  

const router = express.Router();

router.route("/create")
    .post(authMiddleware, commentController.create);

router.route("/getAll")
    .get(authMiddleware,commentController.getAllComments)

router.route("/delete/:id")
    .delete(authMiddleware,commentController.deleteComment)

router.route("/getComment/:id")
    .get(authMiddleware, commentController.getCommentByID);

module.exports = router;