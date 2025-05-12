const { MongoClient } = require("mongodb");
const DictionaryService = require("../services/dictionary.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../app-error");

exports.create = async (req, res, next) => {
  if (!req.body?.word) {
    return next(new ApiError(400, "không được để trống"));
  }

  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const doc = await dictionaryService.createWord(req.body);
    return res.send(doc);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi thêm từ: ${error.message}`));
  }
};

exports.find = async (req, res, next) => {
  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const words = await dictionaryService.find(req.params.word);
    if (!words || words.length === 0) {
      return next(new ApiError(404, "Không tìm thấy từ"));
    }

    return res.send(words);
  } catch (error) {
    return next(new ApiError(500, ` Lỗi khi tìm từ: ${error}`));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const word = req.query.word;
    const result = await dictionaryService.findAll(word);
    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(500, `Không thể lấy danh sách từ: ${error.message}`)
    );
  }
};

exports.update = (req, res) => {
  res.send({ message: "update" });
};

exports.delete = async (req, res, next) => {
  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const result = await dictionaryService.delete(req.params.word);

    if (!result) {
      return next(new ApiError(404, "không tìm thấy từ để xóa"));
    }

    return res.send({ message: "Xóa thành công" });
  } catch (error) {}
};

exports.deleteAll = (req, res) => {
  res.send({ message: "delete all" });
};

exports.deleteRelatedWord = async (req, res, next) => {
  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const result = await dictionaryService.deleteRelatedWord(req.params.word);

    if (!result) {
      return next(new ApiError(404, "không tìm thấy từ để xóa"));
    }

    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi xóa từ: ${error.message}`));
  }
}
