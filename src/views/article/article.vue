<template>
  <div class="article">
    <div class="markdown-demo">
      <div v-highlight class="markdown" v-html="bodyHtml"></div>
    </div>
  </div>
</template>

<script src="./article.js"></script>
<style lang="less">
@import url("./article.less");
@import url("../../assets/css/markdown.less");
</style>
