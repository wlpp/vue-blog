<template>
  <transition name="pop">
    <div class="login" v-if="show">
      <div class="login-title">信息填写</div>
      <div class="login-center clearfix">
        <i class="iconfont iconuser"></i>
        <div class="login-input">
          <input type="text" v-model="name" />
          <div class="login-text">起个响当当的名字吧！</div>
        </div>
      </div>
      <div class="login-center clearfix">
        <i class="iconfont iconyouxiang"></i>
        <div class="login-input">
          <input type="text" v-model="email" />
          <div class="login-text">整个静鸡鸡的邮箱吧！</div>
        </div>
      </div>
      <div class="login-button sure" @click="handleConfirm" @keyup.enter="handleConfirm">确定</div>
      <div class="login-button close" @click="setLogin(1)">关闭</div>
    </div>
  </transition>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      email: "",
      name_msg: "起个响当当的名字吧！",
      email_msg: "整个静鸡鸡的邮箱吧！",
    };
  },
  methods: {
    ...mapActions("loginStore", ["setCookie", "updateRead"]),
    ...mapActions("homeStore", ["getBlogger"]),
    ...mapMutations("loginStore", ["setLogin"]),
    // 确定
    handleConfirm() {
      // const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      // if (this.name === "") {
      //   this.$message("昵称不能为空");
      //   return;
      // }
      // if (this.email === "") {
      //   this.$message("邮箱不能为空");
      //   return;
      // }
      // if (!reg.test(this.email)) {
      //   this.$message("邮箱格式不正确");
      //   return;
      // }
      this.setCookie({ key: "USER_INFO", value: JSON.stringify({ name: this.name, email: this.email }), hours: 1 });
      this.updateRead({ name: this.name, email: this.email }).then(() => {
        this.$route.name === "home" && this.getBlogger;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 350px;
  height: 426px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 6px 5px 12px 0px #999;
  background-color: #fff;
  &-title {
    font-size: 24px;
    margin-top: 62px;
    padding-left: 40px;
    box-sizing: border-box;
    color: #333;
    margin-bottom: 50px;
  }
  &-center {
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
  &-input {
    width: 230px;
    height: 30px;
    position: relative;
    input {
      z-index: 2;
      transition: all 0.5s;
      padding-left: 10px;
      color: #333;
      width: 100%;
      height: 30px;
      border: 0;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      box-sizing: border-box;
      outline: none;
      position: relative;
      &:focus {
        border: 1px solid #1e90ff;
        ~ .login-text {
          top: 0;
          z-index: 3;
          opacity: 1 !important;
          margin-top: -15px;
        }
      }
    }
  }
  &-text {
    background: #fff;
    padding: 0 5px;
    position: absolute;
    z-index: 0;
    opacity: 0;
    height: 20px;
    top: 50%;
    margin-top: -10px;
    font-size: 14px;
    left: 5px;
    color: #1e90ff;
    line-height: 20px;
    transition: all 0.5s;
  }
  &-button {
    cursor: pointer;
    width: 270px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    margin: 0 auto;
    margin-bottom: 10px;
    color: #fff;
    font-size: 14px;
    transition: all 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .sure {
    background-color: #1e90ff;
    margin-top: 44px;
  }
  .close {
    background-color: #666;
  }
  .iconuser {
    font-size: 25px;
  }
  .iconyouxiang {
    font-size: 23px;
  }
}
.pop-enter-active {
  -webkit-animation: popIn 0.4s;
  animation: popIn 0.4s;
}

.pop-leave-active {
  -webkit-animation: popOut 0.4s;
  animation: popOut 0.4s;
}
</style>
