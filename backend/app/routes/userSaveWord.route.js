const express = require("express");
const userSaved = require("../controller/userSaveWord.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/")
    .get(authMiddleware, userSaved.getSavedWords)
    .post(authMiddleware, userSaved.saveWord);

router.route("/")
    .delete(authMiddleware,userSaved.deleteSavedWord)

router.route("/:tendangnhap")
    .delete(userSaved.deleteUser)

module.exports = router;
