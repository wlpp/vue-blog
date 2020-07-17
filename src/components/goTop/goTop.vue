<template>
  <transition name="flipX">
    <div class="go-top" v-show="show" @click="goTop"></div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isClick: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 返回顶部
    goTop() {
      !this.isClick && document.querySelector("body").scrollIntoView({ behavior: "smooth" });
      this.isClick = true;
      const timer = setTimeout(() => (this.isClick = false), 1000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(timer);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.go-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  text-align: center;
  line-height: 35px;
  border-radius: 5px;
  transition: all 0.5s ease;
  cursor: pointer;
  z-index: 20;
  &:hover {
    transform: translateY(-10px);
  }
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 10px solid #ffffff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
