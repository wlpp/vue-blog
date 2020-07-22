const mongoose = require("mongoose");

// readerSchema为表名称
const readerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

// userSchema为表名称
module.exports = mongoose.model("Reader", readerSchema);
