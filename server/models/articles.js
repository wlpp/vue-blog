const mongoose = require("mongoose");

// userSchema为表名称
const articleSchema = new mongoose.Schema(
  {
    commentNum: String,
    contents: String,
    id: Number,
    likeNum: Number,
    readNum: Number,
    tagNames: String,
    title: String,
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

// billSchema为表名称
module.exports = mongoose.model("article", articleSchema,"article");
