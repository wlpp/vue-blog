const router = require("koa-router")();
const article = require("../models/article");
// 新增文章
router.post("/addArticle", async (ctx) => {
  const { id, content, title } = ctx.request.body;
  await article.findOne({ id }).then((result) => {
    if (!result) {
      console.log(1111);
      new article({
        id,
        title,
        content,
        commentNum: 0,
        likeNum: 0,
      }).save();
      ctx.body = {
        code: 200,
        success: true,
        msg: "新增文章成功",
      };
    }
  });
});
// 更新文章
router.post("/updateArticle", async (ctx) => {
  const { id, content, title } = ctx.request.body;
  await article.updateMany({ id }, { title, content }, { multi: true }, (err, res) => {
    if (res.n != 0) {
      ctx.body = {
        code: 200,
        success: true,
        msg: "更新成功",
      };
    } else {
      ctx.body = {
        code: 404,
        success: false,
        msg: "该ID文章不存在，更新失败",
      };
    }
  });
});

// 获取文章
router.get("/getArticle", async (ctx) => {
  const id = ctx.query.id;
  await article.findOne({ id }, (err, data) => {
    if (!err) {
      ctx.body = {
        code: 200,
        data: data || [],
        success: true,
      };
    } else {
      ctx.body = {
        code: 404,
        success: false,
      };
    }
  });
});
module.exports = router;
