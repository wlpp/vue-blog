const mongoose = require("mongoose");

// userSchema为表名称
const tagsSchema = new mongoose.Schema(
  {
    name: String,
    status: Boolean,
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
module.exports = mongoose.model("Tags", tagsSchema);
