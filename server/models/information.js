const mongoose = require("mongoose");

// userSchema为表名称
const informationSchema = new mongoose.Schema(
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

// informationSchema 为表名称
module.exports = mongoose.model("Information", informationSchema);
