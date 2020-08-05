const mongoose = require("mongoose");

// userSchema为表名称
const archiveSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    commentNum: Number,
    likeNum: Number,
    readNum: Number,
    tagNames: String,
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
module.exports = mongoose.model("archive", archiveSchema, "archive");
