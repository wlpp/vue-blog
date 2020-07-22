import Ordme from "@/components/ordme/ordme";
import Login from "@/components/login/login";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Ordme,
    Login,
  },
  data() {
    return {
      value: null,
      isClick: false,
    };
  },
  computed: {
    ...mapState("homeStore", ["archive", "tags", "tagNames", "pageTotal", "pageIndex", "blogger", "loginPopup"]),
  },
  methods: {
    ...mapMutations("homeStore", ["goArticle"]),
    ...mapActions("loginStore", ["getCookie"]),
    ...mapActions("homeStore", ["getArchive", "getTags", "handleTag", "handleSearch", "handlePage", "getBlogger"]),
  },
  mounted() {
    this.getTags();
    this.getArchive();
    this.getCookie();
    this.getBlogger();
  },
};
