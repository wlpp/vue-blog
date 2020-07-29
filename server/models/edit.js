const mongoose = require("mongoose");

const editSchema = new mongoose.Schema(
  {
    editVal: String,
  },
  {
    // 获取数据创建/更新时间
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

// blogger 为表名称
module.exports = mongoose.model("edit", editSchema, "edit");
