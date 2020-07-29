const router = require("koa-router")();
const article = require("../models/article");
const comment = require("../models/comment");
const blogger = require("../models/blogger");
const edit = require("../models/edit");

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

// 新增文章
router.post("/addArticle", async (ctx) => {
  const { id, content, title } = ctx.request.body;
  await article.findOne({ id }).then((result) => {
    if (!result) {
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
    if (res.n != 0 && res.nModified != 0) {
      ctx.body = {
        code: 200,
        success: true,
        msg: "保存成功",
      };
    } else {
      new article({
        id,
        title,
        content,
        commentNum: 0,
        likeNum: 0,
      }).save();
      ctx.body = {
        code: 404,
        success: false,
        msg: "新增成功",
      };
    }
  });
});

// 喜欢文章
router.post("/likeArticle", async (ctx) => {
  const { id } = ctx.request.body;
  await article.updateOne({ id }, { $inc: { likeNum: 1 / 2 } }, (err, res) => {
    if (res.n != 0) {
      ctx.body = {
        code: 200,
        success: true,
        msg: "点赞成功",
      };
      // blogger.updateOne({ $inc: { read: 1 / 2 } })
    } else {
      ctx.body = {
        code: 404,
        success: false,
        msg: "点赞失败",
      };
    }
  });
  await blogger.updateOne({ $inc: { like: 1 / 2 } });
});

// 获取评论
router.get("/getComment", async (ctx) => {
  const articleId = ctx.query.articleId;
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  let pageTotal = 0;
  // 获取总数量
  await comment.find({ articleId }, (err, Data2) => {
    if (!err) {
      pageTotal = Data2.length > pageSize ? Math.ceil(Data2.length / pageSize) : 1;
    }
  });
  await comment
    .find({ articleId })
    .skip((pageIndex - 1) * pageSize)
    .limit(pageIndex * pageSize)
    .then((data) => {
      ctx.body = {
        code: 200,
        message: "success",
        data,
        pageTotal,
      };
    });
});

// 新增评论
router.post("/addComment", async (ctx) => {
  const { articleId, guestName, commentText, replyGuest, replyText } = ctx.request.body;
  await new comment({
    articleId,
    guestName,
    commentText,
    replyGuest,
    replyText,
  }).save();
  await article.updateOne({ id: articleId }, { $inc: { commentNum: 1 / 2 } });
  if (!replyGuest) {
    ctx.body = {
      code: 200,
      msg: "评论成功",
      success: true,
    };
  } else {
    ctx.body = {
      code: 200,
      msg: "回复成功",
      success: true,
    };
  }
});

// 编辑
router.get("/verifyEdit", async (ctx) => {
  const editVal = ctx.query.editVal;
  await edit.findOne({ editVal }, (err, data) => {
    if (!err) {
      ctx.body = {
        code: 200,
        success: true,
        data,
      };
    }
  });
});
module.exports = router;
