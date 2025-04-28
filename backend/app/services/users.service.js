const { ObjectId } = require("mongodb");

class userService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      hoten: payload.hoten,
      tendangnhap: payload.tendangnhap,
      password: payload.password,
      email: payload.email,
      sdt: payload.sdt,
    };

    return user;
  }

  async createUser(payload) {
    const User = this.extractUserData(payload);

    const exitUser = await this.User.findOne({
      tendangnhap: User.tendangnhap,
    });

    if (exitUser) {
      throw new Error("Người dùng đã tồn tại.");
    }

    const result = await this.User.insertOne(User);
    return result;
  }

  async getAllUser() {
    const cursor = this.User.find({});
    return await cursor.toArray();
  }

  async deleteUser(id) {
    try {
      return await this.User.findOneAndDelete({
        _id: new ObjectId(id),
      });
    } catch (error) {
      throw new Error("Lỗi khi xóa người dùng")
    }
  }

  async getUserByUsername(tendangnhap) {
    try {
      const existUser = await this.User.findOne({
        tendangnhap: tendangnhap,
      });

      if (existUser)
        return existUser
      else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      throw new Error("lỗi khi tìm người dùng", error);
    }
  }
}

module.exports = userService;
