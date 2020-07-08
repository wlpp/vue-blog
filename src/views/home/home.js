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
    ...mapState("homeStore", ["articles", "tags", "tagNames", "pageTotal", "pageIndex", "information","loginPopup"]),
  },
  methods: {
    ...mapMutations("homeStore", [""]),
    ...mapActions("homeStore", ["getArticles", "getTags", "handleTag", "handleSearch", "handlePage", "getInformation"]),
  },
  mounted() {
    this.getTags();
    this.getArticles();
    this.getInformation();
  },
};
