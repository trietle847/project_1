const express = require("express");
const dictionary = require("../controller/dictionary.controller");

const router = express.Router();

router.route("/:word")
    .get(dictionary.find) // tìm chính xác 1 từ 
    .delete(dictionary.delete)
    .put(dictionary.update)

router.route("/")
    .delete(dictionary.deleteAll)
    .post(dictionary.create)
    .get(dictionary.findAll) // lấy tất cả các từ có chứa 1 ký tự trong nó

router.route("/related-words/:word")
    .delete(dictionary.deleteRelatedWord)
    
module.exports = router;