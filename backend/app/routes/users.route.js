const express = require("express");
const user = require("../controller/users.controller")
const authMiddleware = require("../middlewares/auth.middleware"); 

const router = express.Router();

router.route("/")
    .post(user.create)
    .get(user.getAllUser)

router.route("/login")
    .post( user.login)

router.route("/me")
    .get(authMiddleware, user.getMe)

router.route("/:id")
    .delete(user.deleteUserByID)
    .put(user.update)
    .get(user.getUserById)

router.route("/name/:tendangnhap")
    .get(user.getUserByUsername)


module.exports = router;
