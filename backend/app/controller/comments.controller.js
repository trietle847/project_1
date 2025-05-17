const CommentService = require("../services/comments.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../app-error");

exports.create = async (req, res, next) => {
  try {
    const commentService = new CommentService(MongoDB.client);

    const newComment = {
      userID: req.user.id,
      username: req.user.tendangnhap,
      content: req.body.content,
      parentId: req.body.parentId || 0,
      createdAt: new Date(),
    };

    const comment = await commentService.createComment(newComment);
    return res.send({
      message: "Bình luận được thêm",
      comment,
    });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi tạo bình luận : ${error}`));
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const commentService = new CommentService(MongoDB.client);
    const comments = await commentService.getAll();
    return res.send(comments);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi lấy bình luận : ${error}`));
  }
};

exports.getCommentByID = async (req, res, next) => {
  try {
    const commentService = new CommentService(MongoDB.client);
    const result = await commentService.getByID(req.params._id);

    if (!result) {
      return next(new ApiError(404, "Không tồn tại bình luận"));
    }

    const comment = await commentService.getByID(req.params._id);
    return res.send(comment);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi xóa bình luận : ${error}`));
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentService = new CommentService(MongoDB.client);
    const result = await commentService.getByID(req.params._id);

    if (!result) {
        return next(new ApiError(404, "Không tồn tại bình luận"));
    }

    await commentService.delete(req.params._id);
    return res.send("Xóa thành công")
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi xóa bình luận : ${error}`));
  }
};
