const { ObjectId } = require("mongodb");

class UserSavedWordService {
  constructor(client) {
    this.saved = client.db().collection("userSavedWord");
  }

  async saveWord(username, word) {
    const result = await this.saved.updateOne(
      { tendangnhap: username },
      { $addToSet: { savedWords: word } },
      { upsert: true }
    );
    return result;
  }

  async getSavedWords(username) {
    const doc = await this.saved.findOne({ tendangnhap: username });
    return doc?.savedWords || [];
  }

  async deleteWord(username, word) {
    const result = await this.saved.updateOne(
      { tendangnhap: username },
      { $pull: { savedWords: word } }
    );
    return result;
  }

  async deleteUser(username) {
    try {
      console.log("Đang xóa user:", username);
      const deleted = await this.saved.findOneAndDelete({
        tendangnhap: username,
      });
      console.log("Kết quả xóa:", deleted);
      return deleted;
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
      throw new Error("Lỗi khi xóa người dùng");
    }
  }
}

module.exports = UserSavedWordService;
