const express = require("express");
const user = require("../controller/users.controller")

const router = express.Router();

router.route("/")
    .post(user.create)
    .get(user.getAllUser)


router.route("/:id")
    .delete(user.deleteUserByID)

router.route("/:tendangnhap")
    .get(user.getUserByUsername)


module.exports = router;
