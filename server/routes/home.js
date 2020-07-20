const router = require("koa-router")();
const archive = require("../models/archive");
const tags = require("../models/tags");
const blogger = require("../models/blogger");
// const reader = require("../models/reader");

// 文章列表
router.get("/archive", async (ctx) => {
  const tagNames = eval("/^.*" + ctx.query.tagNames + ".*$/");
  const title = eval("/^.*" + ctx.query.title + ".*$/");
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  let pageTotal = 0;
  await archive
    .find({ tagNames, title })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageIndex * pageSize)
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
  await blogger.updateOne({ $inc: { read: 1 / 2 } }, (err, res) => {
    if (res.n != 0) {
      ctx.body = {
        code: 200,
        success: true,
        msg: "订阅成功",
      };
    } else {
      ctx.body = {
        code: 404,
        success: false,
        msg: "订阅失败",
      };
    }
  });
});

// 信息确认
// router.post("/addReader", async (ctx) => {
// console.log(ctx.request.body);
// const { name, email } = ctx.request.body;
// //先查找是否存在该数据,返回true为存在,false为不存在
// // console.log(name,email);
// console.log(111111111);
// await reader
//   .findOne({
//     name,
//   })
//   .then((result) => {
//     if (result) {
//       ctx.body = {
//         success: false,
//         msg: "已存在相同昵称",
//       };
//     } else {
//       new reader({
//         name,
//         email,
//       }).save();
//       ctx.body = {
//         success: true,
//         msg: "信息确认成功",
//       };
//       // ctx.session.isRead = true;
//     }
//   });
// });
module.exports = router;
