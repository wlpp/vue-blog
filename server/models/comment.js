const mongoose = require("mongoose");

// userSchema为表名称
const commentSchema = new mongoose.Schema(
  {
    articleId: Number,
    guestName: String,
    commentText: String,
    replyGuest: String,
    replyText: String,
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

// billSchema为表名称
module.exports = mongoose.model("comment", commentSchema, "comment");
