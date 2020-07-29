<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :init="init" :disabled="false" @onClick="onClick"> </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue";
import { mapActions } from "vuex";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/icons/default";
import "tinymce/plugins/codesample"; // 列表插件
import "tinymce/plugins/save"; // 列表插件
import "tinymce/plugins/toc"; // 列表插件

export default {
  components: {
    Editor,
  },
  name: "tinymce",
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount codesample save toc ",
    },
    toolbar: {
      type: [String, Array],
      default:
        " undo redo |  formatselect | bold italic forecolor  backcolor codesample save toc| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat   ",
    },
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        theme:'silver',
        inline: true,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: true,
        menubar: false,
        // 设置代码内容
        codesample_languages: [
          { text: "HTML", value: "markup" },
          { text: "JavaScript", value: "javascript" },
          { text: "CSS", value: "css" },
        ],
        // 保存
        save_onsavecallback: (e) => {
          this.saveArticle(e.bodyElement.innerHTML);
          console.log("已保存");
        },
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
      },
      myValue: this.value,
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    ...mapActions("articleStore", ["saveArticle"]),
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    },
  },
};
</script>
<style lang="less">

@import url("../../assets/css/prism.css");
</style>
