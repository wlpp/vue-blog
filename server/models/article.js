const mongoose = require("mongoose");

// userSchema为表名称
const articleSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    content: String,
    tagNames: String,
    commentNum: Number,
    likeNum: Number,
    readNum: Number,
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
module.exports = mongoose.model("article", articleSchema,"article");
