const mongoose = require("mongoose");

// userSchema为表名称
const tagsSchema = new mongoose.Schema(
  {
    cid: Number,
    name: String,
    stat: Boolean,
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
module.exports = mongoose.model("Tags", tagsSchema);
