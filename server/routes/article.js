const router = require("koa-router")();
const article = require("../models/article");
const comment = require("../models/comment");
const blogger = require("../models/blogger");
const edit = require("../models/edit");
const archive = require("../models/archive");
const tags = require("../models/tags");

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

// 更新文章
router.post("/updateArticle", async (ctx) => {
  const { id, content, title, tagNames } = ctx.request.body;
  await article
    .updateMany({ id }, { title, content, tagNames }, { multi: true }, (err, res) => {
      if (res.n != 0 && res.nModified != 0) {
        archive.updateMany({ id }, { title, tagNames }, { multi: true }, (err, res) => {});
        ctx.body = {
          code: 200,
          success: true,
          msg: "更新成功",
        };
      } else {
        new article({
          id,
          title,
          content,
          commentNum: 0,
          likeNum: 0,
          tagNames,
        }).save();
        new archive({
          id,
          title,
          commentNum: 0,
          likeNum: 0,
          readNum: 0,
          tagNames,
        }).save();
        blogger.updateOne({ $inc: { article: 1 } }, () => {});
        ctx.body = {
          code: 404,
          success: false,
          msg: "新增成功",
        };
      }
    })
    .then(() => {
      const tagArr = tagNames.split(",");
      tags.find((err, data) => {
        const arr3 = data.map((item) => item.name);
        tagArr.map((name) => {
          if (!arr3.includes(name)) {
            new tags({
              name,
              status: true,
            }).save();
          }
        });
      });
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
    } else {
      ctx.body = {
        code: 404,
        success: false,
        msg: "点赞失败",
      };
    }
  });
  await blogger.updateOne({ $inc: { like: 1 } });
  await archive.updateOne({ id }, { $inc: { likeNum: 1 } });
});
// 获取评论
router.get("/getComment", async (ctx) => {
  const articleId = ctx.query.articleId;
  const pageIndex = ctx.query.pageIndex;
  const pageSize = ctx.query.pageSize;
  let pageTotal = 0;
  // 获取页码数
  await comment.find({ articleId }, (err, Data2) => {
    if (!err) {
      pageTotal = Data2.length > pageSize ? Math.ceil(Data2.length / pageSize) : 1;
    }
  });
  await comment
    .find({ articleId })
    .skip((pageIndex - 1) * pageSize)
    .limit(parseInt(pageSize))
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
  await article.updateOne({ id: articleId }, { $inc: { commentNum: 1 } });
  await archive.updateOne({ id: articleId }, { $inc: { commentNum: 1 } });
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
