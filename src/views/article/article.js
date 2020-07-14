import { mapState, mapActions } from "vuex";
import marked from "marked";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState("articleStore", ["bodyHtml"]),
    html() {
      return marked("# qq\n```\nasdfsdfsa\n```");
    },
  },
  methods: {
    ...mapActions("articleStore", ["getArticle"]),
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
};
