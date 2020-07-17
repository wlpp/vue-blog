<template>
  <div class="write">
    <mavon-editor v-model="value"  :ishljs = "true" @save="saveArticle" />
  </div>
</template>

<script>
import marked from "marked";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      value: "",
      bodyHtml: "",
    };
  },
  computed: {
    bodyHtml2() {
      return marked(this.bodyHtml);
    },
  },
  methods: {
    ...mapActions("articleStore", ["saveArticle"]),
    getBodyHtml(content) {
      this.bodyHtml = marked(content);
    },
  },
};
</script>
