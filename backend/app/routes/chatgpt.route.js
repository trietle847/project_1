const express = require("express");
const chatgpt = require("../controller/chatgpt.controller")

const router = express.Router();

router.route("/generate-vocabulary")
    .post(chatgpt.generateVocabulary)

module.exports = router;