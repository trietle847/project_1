const { MongoClient } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../app-error");
const UserSavedWordService = require("../services/userSavedWord.service");

exports.saveWord = async (req, res, next) => {
  try {
    const username = req.user.tendangnhap;
    const { word } = req.body;

    const userSavedService = new UserSavedWordService(MongoDB.client);

    const result = await userSavedService.saveWord(username, word);
    res.status(200).json({ message: "Lưu từ thành công", result });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi lưu: ${error}`));
  }
};

exports.getSavedWords = async (req, res, next) => {
  try {
    const userSavedService = new UserSavedWordService(MongoDB.client);

    const username = req.user.tendangnhap;
    const saved = await userSavedService.getSavedWords(username);
    res.send(saved);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi lấy: ${error}`));
  }
};

exports.deleteSavedWord = async(req, res, next) => {
  try {
    const userSavedService = new UserSavedWordService(MongoDB.client);

    const username = req.user.tendangnhap;
    const word = req.query.word;
    const result = await userSavedService.deleteWord(username,word);

    res.send({message:"xóa thành công", result})
  } catch (error) {
    next(new ApiError(500, `Lỗi khi xóa từ ${error}`))
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userSavedService = new UserSavedWordService(MongoDB.client);
    console.log(req.params.tendangnhap)
    const result = await userSavedService.deleteUser(req.params.tendangnhap);

    if (!result) {
      return next(new ApiError(404, "không tìm người dùng để xóa"));
    }

    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    return next(new ApiError(500, ` Lỗi khi xóa người dùng: ${error}`));
  }
};
