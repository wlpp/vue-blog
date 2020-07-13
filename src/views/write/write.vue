<template>
  <div class="write">
    <mavon-editor v-model="value" @save="saveMarkdown" />
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
    ...mapActions("articleStore", ["saveMarkdown"]),
    getBodyHtml(value) {
      this.bodyHtml = marked(value);
    },
  },
};
</script>
