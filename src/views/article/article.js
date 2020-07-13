import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("articleStore", ["bodyHtml"]),
  },
  methods: {
    // getHtml(value) {
    //   console.log(value);
    //   this.bodyHtml = marked(value);
    // },
  },
  mounted() {
    console.log(this.bodyHtml);
  },
};
