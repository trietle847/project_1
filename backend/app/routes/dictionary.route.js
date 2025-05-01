const express = require("express");
const dictionary = require("../controller/dictionary.controller");

const router = express.Router();

router.route("/:word")
    .get(dictionary.find)
    .delete(dictionary.delete)
    .put(dictionary.update)

router.route("/")
    .delete(dictionary.deleteAll)
    .post(dictionary.create)
    .get(dictionary.findAll)

router.route("/related-words/:word")
    .delete(dictionary.deleteRelatedWord)
    
module.exports = router;