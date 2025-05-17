const { ObjectID } = require("mongodb");


class CommentService {
  constructor(client) {
    this.comment = client.db().collection("comments");
  }

  async createComment(payload) {
    const result = await this.comment.insertOne(payload);
    return result;
  }

  async getAll() {
    return await this.comment.find({}).toArray();
  }

  async getByID(id) {
    return await this.comment.findOne({ id: id });
  }

  async getByParentID(id) {
    return await this.comment.findOne({ parentId: id });
  }

  async delete(id) {
    return await this.comment.deleteOne({ id: id });
  }
}

module.exports = CommentService;