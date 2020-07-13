const mongoose = require("mongoose");

const bloggerSchema = new mongoose.Schema(
  {
    name: String,
    like: Number,
    article: Number,
    read: Number,
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
);

// blogger 为表名称
module.exports = mongoose.model("blogger", bloggerSchema, "blogger");
