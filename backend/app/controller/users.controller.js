const { MongoClient } = require("mongodb");
const MongoDB = require("../utils/mongodb.util");
const UserService = require("../services/users.service");
const ApiError = require("../app-error");

const jwt = require("jsonwebtoken");
const SECRET_KEY = "trietle1234";

exports.create = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const doc = await userService.createUser(req.body);
    
    const token = jwt.sign(
      {
        id: doc._id,
        tendangnhap: doc.tendangnhap,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "Tạo người dùng thành công",
      user: doc,
      token: token,
     });
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

exports.login = async (req, res, next) => {
  try {
    const { tendangnhap, password } = req.body;
    const userService = new UserService(MongoDB.client);
    const user = await userService.getUserByUsername(tendangnhap);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Sai thông tin đăng nhập" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        tendangnhap: user.tendangnhap,
        // role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ 
      token,
      message: "Đăng nhập thành công",
     });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi đăng nhập: ${error}`));
  }
};
