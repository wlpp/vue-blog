const router = require("koa-router")();
const archive = require("../models/archive");
const tags = require("../models/tags");
const blogger = require("../models/blogger");
const reader = require("../models/reader");
// const reader = require("../models/reader");

// 文章列表
router.get("/archive", async (ctx) => {
  const tagNames = eval("/^.*" + ctx.query.tagNames + ".*$/");
  const title = eval("/^.*" + ctx.query.title + ".*$/");
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  // // 获取页码数
  await archive.find({ tagNames, title }, (err, Data2) => {
    if (!err) {
      pageTotal = Data2.length > pageSize ? Math.ceil(Data2.length / pageSize) : 1;
    }
  });
  await archive 
    .find({ tagNames, title })
    .skip((pageIndex - 1) * pageSize)
    .limit(parseInt(pageSize))
    .then((Data) => {
      ctx.body = {
        Code: 200,
        message: "success",
        Data,
        pageTotal,
      };
    });
});
// 标签列表
router.get("/tags", async (ctx) => {
  await tags.find((err, Data) => {
    if (!err) {
      ctx.body = {
        Code: 200,
        message: "success",
        Data,
      };
    } else {
      ctx.body = {
        message: "不存在该数据,查询失败",
      };
    }
  });
});
// 博主信息
router.get("/blogger", async (ctx) => {
  await blogger.find((err, Data) => {
    if (!err) {
      ctx.body = {
        code: 200,
        message: "success",
        Data,
      };
    } else {
      ctx.body = {
        message: "不存在该数据,查询失败",
      };
    }
  });
});

// 订阅博主
router.post("/updateRead", async (ctx) => {
  const { name, email } = ctx.request.body;
  await blogger.updateOne({ $inc: { read: 1 / 2 } }, (err, res) => {
    if (res.n != 0) {
      ctx.body = {
        code: 200,
        success: true,
        msg: "信息填写成功",
      };
    } else {
      ctx.body = {
        code: 404,
        success: false,
        msg: "信息填写失败",
      };
    }
  });
  await new reader({
    name,
    email,
  }).save();
});

module.exports = router;
