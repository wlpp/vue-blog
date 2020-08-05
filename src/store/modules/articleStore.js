import articleApi from "@/api/articleApi";
import Vue from "vue";
export default {
  namespaced: true,
  state: {
    bodyHtml: "",
    paramsId: "",
    menuList: [],
    commnetList: [],
    load: true,
    articleData: {},
    likeInfo: [],
    clickLike: false,
    pageIndex: 1,
    pageSize: 5,
    pageTotal: 0,
    replyGuest: "",
    replyText: "",
    showEdit: false,
    showUpload: false,
    disabled: true,
    title: "",
    tagNames: "",
  },
  getters: {},
  mutations: {
    initLikeArticle(state) {
      if (localStorage.getItem("likeInfo")) {
        state.likeInfo = JSON.parse(localStorage.getItem("likeInfo"));
        state.likeInfo.includes(state.paramsId) && (state.clickLike = true);
      }
    },
    // 编辑模式
    enterEdit(state) {
      const edit = location.hash.slice(location.hash.indexOf("?") + 1);
      edit === "edit" && state.disabled ? (state.showEdit = true) : (state.showEdit = false);
    },
    setClickLike(state) {
      state.clickLike = false;
    },
    setShowUpload(state) {
      state.showUpload = !state.showUpload;
    },
    setReplyInfo(state, reply) {
      state.replyGuest = reply.replyGuest;
      state.replyText = reply.replyText;
    },
    setUploadValue(state, payload) {
      switch (payload.type) {
        case 0:
          state.title = payload.e.target.value;
          break;
        case 1:
          state.tagNames = payload.e.target.value;
          break;
      }
    },
  },
  actions: {
    // 上传文章
    uploadArticle({ state, dispatch }) {
      const content = sessionStorage.getItem(state.paramsId);
      if (!state.title || state.title === "") {
        Vue.prototype.$message("标题不能为空");
        return;
      }
      if (!state.tagNames || state.tagNames === "") {
        Vue.prototype.$message("标签不能为空");
        return;
      }
      const params = {
        id: state.paramsId,
        title: state.title,
        tagNames: state.tagNames,
        content,
      };
      articleApi.updateArticle(params).then((res) => {
        Vue.prototype.$message(res.data.msg);
        state.showUpload = false;
        dispatch("getArticle", state.paramsId);
      });
    },
    // 获取文章信息
    getArticle({ state, commit }, id) {
      state.load = true;
      state.paramsId = id;
      commit("initLikeArticle");
      articleApi
        .getArticle({ id })
        .then((res) => {
          state.load = false;
          if (res.data.code === 200) {
            state.bodyHtml = res.data.data.content;
            state.articleData = res.data.data;
            state.title = res.data.data.title;
            state.tagNames = res.data.data.tagNames;
            state.menuList = [];
          } else {
            state.bodyHtml = "";
          }
        })
        .then(() => {
          const timer = setTimeout(() => {
            // 获取目录
            Vue.prototype.$nextTick(() => {
              document.querySelectorAll(".mce-content-body h2").forEach((item, index) => {
                item.setAttribute("id", "menu_" + index);
                state.menuList.push({ menuId: "menu_" + index, menuText: item.innerText, offsetTop: item.offsetTop });
              });
            });

            // 设置编辑模式
            sessionStorage.getItem("disabled") !== null && (state.disabled = false);
            commit("enterEdit");
            (!state.disabled && sessionStorage.getItem(state.paramsId)) && (state.bodyHtml = sessionStorage.getItem(state.paramsId));
            clearTimeout(timer)
          }, 300);
        })
        .catch((err) => {
          state.load = false;
          console.log(err, "getArticle");
        });
    },
    // 点赞文章
    likeArticle({ state, dispatch }) {
      if (state.clickLike) return;
      articleApi
        .likeArticle({ id: state.paramsId })
        .then((res) => {
          if (res.data.code === 200) {
            state.clickLike = true;
            state.likeInfo.push(state.paramsId);
            localStorage.setItem("likeInfo", JSON.stringify(state.likeInfo));
            dispatch("getArticle", state.paramsId);
          }
        })
        .catch((err) => {
          console.log(err, "likeArticle");
        });
    },
    getComment({ state }) {
      const params = {
        articleId: state.paramsId,
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
      };
      articleApi
        .getComment(params)
        .then((res) => {
          if (res.data.code === 200) {
            state.commnetList = res.data.data
              .map((item) => {
                return {
                  ...item,
                  guestImage: item.guestName.slice(0, 1),
                  createTime: new Date(Date.parse(item.createTime)).toLocaleString(),
                  timerShaft: Date.parse(item.createTime),
                };
              })
              .sort((a, b) => {
                return a.createTime - b.createTime;
              });
            state.pageTotal = res.data.pageTotal;
          }
        })
        .catch((err) => {
          console.log(err, "getComment");
        });
    },
    // 新增文章评论
    addComment({ state, dispatch }, commentText) {
      if (!this.state.loginStore.isRead) {
        Vue.prototype.$message("请先填写下信息吧！");
        this.state.loginStore.isLogin = true;
        return;
      }
      if (commentText === "") {
        Vue.prototype.$message("内容不能为空");
        return;
      }
      const guestName = JSON.parse(this.state.loginStore.userInfo).name;
      if (state.replyGuest === guestName) {
        Vue.prototype.$message("不能回复自己哦");
        return;
      }
      const params = {
        articleId: state.paramsId,
        guestName,
        commentText,
        replyGuest: state.replyGuest,
        replyText: state.replyText,
      };
      articleApi
        .addComment(params)
        .then((res) => {
          dispatch("getComment", state.paramsId);
          Vue.prototype.$message(res.data.msg);
        })
        .catch((err) => console.log(err, "addComment"));
    },
    // 点击翻页
    handlePage({ state, dispatch }, type) {
      if (state.pageTotal === 1) {
        return;
      }
      switch (type) {
        case 0:
          state.pageIndex > 1 && state.pageIndex--;
          break;
        case 1:
          state.pageIndex < state.pageTotal && state.pageIndex++;
          break;
      }
      dispatch("getComment");
    },
    // 验证编辑
    verifyEdit({ state }, editVal) {
      if (editVal === "") {
        return;
      }
      articleApi.verifyEdit({ editVal }).then((res) => {
        if (res.data.data) {
          Vue.prototype.$message("验证成功");
          state.disabled = false;
          state.showEdit = false;
          sessionStorage.setItem("disabled", false);
          location.reload()
        } else {
          Vue.prototype.$message("验证失败");
          state.disabled = true;
        }
      });
    },
  },
};
