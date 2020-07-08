import Vue from "vue";
import message from "./message.vue";

const messageBox = Vue.extend(message);

message.install = function(options) {
  // options接收组件传值,不填为undefined
  if (options === undefined || options === null) {
    // console.log(options);
  } else if (typeof options === "string" || typeof options === "number") {
    options = {
      content: options,
    };
    // console.log(options);
  }
  // 将message挂载到页面上
  let instance = new messageBox({
    data: options,
  }).$mount();

//   document.body.appendChild(instance.$el);
  document.body.appendChild(instance.$el);
  Vue.nextTick(() => {
    instance.visible = true;
  });
};

export default message;
