const { MongoClient } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
const UserService = require("../services/users.service");
const ApiError = require("../app-error");

exports.create = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const doc = await userService.createUser(req.body);
    return res.send(doc);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi thêm người dùng: ${error.message}`));
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const doc = await userService.getAllUser();
    return res.send(doc)
  } catch (error) {
    return next(new ApiError(500, ` Lỗi khi lấy người dùng: ${error}`))
  }
}

exports.deleteUserByID = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const result = await userService.deleteUser(req.params.id);

    if (!result) {
      return next(new ApiError(404, "không tìm người dùng để xóa"));
    }

    return res.send({ message: "Xóa thành công" });
  } catch (error) {
    return next(new ApiError(500, ` Lỗi khi xóa người dùng: ${error}`));
  }
}

exports.getUserByUsername = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const doc = await userService.getUserByUsername(req.params.tendangnhap);

    return res.send(doc)
  } catch (error) {
    return next(new ApiError(500, ` Lỗi khi lấy người dùng: ${error}`));
  }
}
