<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"> </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce"; //tinymce默认hidden，不引入不显示
import Editor from "@tinymce/tinymce-vue";
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
import "tinymce/plugins/save"; // 保存插件
import "tinymce/plugins/textpattern"; // 排版插件

export default {
  components: {
    Editor
  },
  name: "tinymce",
  props: {
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: true
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount codesample save textpattern "
    },
    toolbar: {
      type: [String, Array],
      default:
        // " undo redo |  formatselect | bold italic forecolor  backcolor codesample save| alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat   ",
        "  h1 h2 h3 codesample| bold italic forecolor save| alignleft aligncenter | bullist numlist | lists image table"
    }
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        theme: "silver",
        inline: true,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: true,
        menubar: false,
        // 设置代码内容
        codesample_languages: [
          { text: "JavaScript", value: "javascript" },
          { text: "HTML", value: "markup" },
          { text: "CSS", value: "css" }
        ],
        textpattern_patterns: [
          { start: "*", end: "*", format: "italic" },
          { start: "**", end: "**", format: "bold" },
          { start: "#", format: "h1" },
          { start: "##", format: "h2" },
          { start: "###", format: "h3" },
          { start: "####", format: "h4" },
          { start: "#####", format: "h5" },
          { start: "######", format: "h6" },
          { start: "1. ", cmd: "InsertOrderedList" },
          { start: "* ", cmd: "InsertUnorderedList" },
          { start: "- ", cmd: "InsertUnorderedList" }
        ],
        // 保存
        save_onsavecallback: e => {
          sessionStorage.setItem(this.$route.params.id, e.bodyElement.innerHTML);
          console.log("保存成功");
        },
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          console.log(blobInfo.blob());
          success(img);
        }
      },
      myValue: this.value
    };
  },
  mounted() {
    tinymce.init({});
  },
  updated() {},
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/prism.css");
</style>
