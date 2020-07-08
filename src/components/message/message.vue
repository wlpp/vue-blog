<template>
  <transition name="pop">
    <div class="message" :class="visible && 'active'">
      <div class="content">
        {{ content }}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      content: "",
      time: 1000,
      visible: false,
    };
  },
  mounted() {
    // const body = document.querySelector("body");
    window.addEventListener("click", function(e) {
      e.preventDefault();
    });
    this.close();
  },
  methods: {
    close() {
      window.setTimeout(() => {
        this.visible = false;
      }, this.time);
    },
  },
};
</script>
<style lang="less" scoped>
.message {
  min-width: 100px;
  padding: 20px 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  transition: all 0.3s linear;
  opacity: 0;
}
.active {
  opacity: 1;
}
</style>
