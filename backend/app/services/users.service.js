const { ObjectId, ReturnDocument } = require("mongodb");

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

    Object.keys(user).forEach((key) => {
      if (user[key] === undefined || user[key] === null) {
        delete user[key];
      }
    });
    
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
      throw new Error("Lỗi khi xóa người dùng");
    }
  }

  async getUserByUsername(tendangnhap) {
    try {
      const existUser = await this.User.findOne({
        tendangnhap: tendangnhap,
      });

      if (existUser) return existUser;
      else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      throw new Error("lỗi khi tìm người dùng", error);
    }
  }

  async updateUser(id,payload) {
    try {
      const updateData = this.extractUserData(payload);
      const result = await this.User.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: "after" }
      )
     
      return result;
    } catch (error) {
      console.error("Chi tiết lỗi khi cập nhật:", error);
      throw new Error("Lỗi khi cập nhật: " + error.message);
    }
  }

  async getUserById(id) {
    try {
      const existUser = await this.User.findOne({
        _id: new ObjectId(id),
      });

      if (existUser) return existUser;
      else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      throw new Error(`loi khi tim ${error}`);
    }
  }
}

module.exports = userService;
