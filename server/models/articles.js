const mongoose = require("mongoose");

// userSchema为表名称
const articlesSchema = new mongoose.Schema(
  {
    cid:Number,
    title: String,
    commentNum: String,
    likeNum: Number,
    readNum: Number,
    tagNames: String,
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
module.exports = mongoose.model("Articles", articlesSchema);
