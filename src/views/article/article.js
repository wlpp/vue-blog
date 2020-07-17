import { mapState, mapActions } from "vuex";
import goTop from "@/components/goTop/goTop";
import Load from "@/components/load/load";
export default {
  components: {
    goTop,
    Load,
  },
  data() {
    return {
      menuText: "",
      offsetTop: 0, 
      show: false,
      timer: false,
    };
  },

  computed: {
    ...mapState("articleStore", ["bodyHtml", "menuList","articleData","load"]),
    
    // 初始化时间
    createdTime(){
      return this.articleData.created && this.articleData.created.slice(0,this.articleData.created.indexOf('T'))
    },
    updatedTime(){
      return this.articleData.updated && this.articleData.updated.slice(0,this.articleData.created.indexOf('T'))
    }
  },
  methods: {
    ...mapActions("articleStore", ["getArticle"]),
    // 页面滚动
    bodyScroll() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
          scrollTop >= 1200 ? (this.show = true) : (this.show = false);
          this.menuList.map((item, index) => {
            scrollTop >= this.menuList[index].offsetTop - 5 &&
              scrollTop < this.menuList[index + 1].offsetTop - 5 &&
              (this.menuText = item.menuText);
          });
        });
      }, 50);
    },

    // 滚动指定位置
    scrollAppoint(menuText) {
      document.querySelector(`#${menuText}`).scrollIntoView({ behavior: "smooth" });
      this.menuText = menuText;
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
    window.addEventListener("scroll", this.bodyScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.bodyScroll);
  },
};
