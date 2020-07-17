<template>
  <div class="load">
    <div class="load-animation">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script></script>
<style lang="less" scoped>
.load {
  position: fixed;
  left: 0;
  // top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 999;
}
.load-animation {
  width: 150px;
  height: 15px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.load-animation span {
  position: absolute;
  width: 15px;
  height: 100%;
  border-radius: 50%;
  background: skyblue;
  animation: load 1.04s ease-in infinite alternate;
}
@keyframes load {
  0% {
    opacity: 1;
    transform: translate(0px);
  }
  100% {
    opacity: 0.2;
    transform: translate(150px);
  }
}
.load-animation span:nth-child(1) {
  animation-delay: 0.13s;
}
.load-animation span:nth-child(2) {
  animation-delay: 0.26s;
}
.load-animation span:nth-child(3) {
  animation-delay: 0.39s;
}
.load-animation span:nth-child(4) {
  animation-delay: 0.52s;
}
.load-animation span:nth-child(5) {
  animation-delay: 0.65s;
}
</style>
