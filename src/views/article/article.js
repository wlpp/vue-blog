import { mapState, mapActions, mapMutations } from "vuex";
import goTop from "@/components/goTop/goTop";
import Load from "@/components/load/load";
import tinymce from "@/components/tinymce/tinymce";
export default {
  components: {
    goTop,
    Load,
    tinymce,
  },
  data() {
    return {
      menuId: "",
      show: false,
      timer: false,
      commentText: "",
      value: "",
      editVal: "",
    };
  },

  computed: {
    ...mapState("articleStore", [
      "bodyHtml",
      "menuList",
      "articleData",
      "commnetList",
      "load",
      "clickLike",
      "pageTotal",
      "pageIndex",
      "replyGuest",
      "showEdit",
      "showUpload",
      "disabled",
      "title",
      "tagNames"
    ]),
    // 初始化时间
    createdTime() {
      return (
        this.articleData.createTime && this.articleData.createTime.slice(0, this.articleData.createTime.indexOf("T"))
      );
    },
    updatedTime() {
      return (
        this.articleData.updateTime && this.articleData.updateTime.slice(0, this.articleData.updateTime.indexOf("T"))
      );
    },
  },
  watch: {
    editVal(newVal) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.editVal = newVal;
        this.verifyEdit(this.editVal);
      }, 500);
    },
  },
  methods: {
    ...mapActions("articleStore", [
      "getArticle",
      "likeArticle",
      "getComment",
      "addComment",
      "handlePage",
      "verifyEdit",
      "uploadArticle",
    ]),
    ...mapActions("loginStore", ["getCookie"]),
    ...mapMutations("articleStore", ["setClickLike", "setReplyInfo", "enterEdit", "setShowUpload", "setUploadValue"]),
    // 页面滚动
    bodyScroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          scrollTop >= 1200 ? (this.show = true) : (this.show = false);
          scrollTop <= 0 && (this.menuId = "");
          if (scrollTop >= this.menuList[this.menuList.length - 1].offsetTop) {
            this.menuId = this.menuList[this.menuList.length - 1].menuId;
          } else {
            this.menuList.map((item, index) => {
              scrollTop >= this.menuList[index].offsetTop &&
                scrollTop <= this.menuList[index + 1].offsetTop &&
                (this.menuId = item.menuId);
            });
          }
        });
      }, 50);
    },

    // 滚动指定位置
    scrollAppoint(element) {
      document.querySelector(`#${element}`).scrollIntoView({ behavior: "smooth" });
      this.menuId = element;
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
    this.getComment();
    this.getCookie();
    window.addEventListener("scroll", this.bodyScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.bodyScroll);
    this.setClickLike();
  },
};
