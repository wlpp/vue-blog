<template>
  <div class="ordme">
    <div class="ordme-avator">
      <img draggable="false" :src="avator" alt="" />
    </div>
    <p class="ordme-name">{{ information && information.name }}</p>
    <div class="ordme-info">
      <p>
        <span>{{ information && information.article }}</span
        ><i title="博文">博文</i>
      </p>
      <p>
        <span>{{ information && information.like }}</span
        ><i title="喜欢">点赞</i>
      </p>
      <p>
        <span>{{ information && information.read }}</span
        ><i title="订阅">订阅</i>
      </p>
    </div>
    <button class="ordme-btn" :class="isRead && 'active_b'" @click="updateRead">
      <span>{{ isRead ? "已订阅" : "订 阅" }}</span>
    </button>
    <div></div>
  </div>
</template>

<script>
import config from "@/helpers/config";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    information: {
      type: Object,
      defalut: {}, 
    },
  },
  computed: {
    avator() {
      return config.imgUrl + "avator.png";
    },
    ...mapState("homeStore", ["isRead"]),
  },
  methods: {
    ...mapMutations("homeStore", ["setLoginPopup"]),
    ...mapActions("homeStore", ["updateRead"]),
  },
};
</script>

<style lang="less" scoped>
.ordme {
  padding: 30px 10px;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-avator {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    img {
      width: 100%;
    }
  }
  &-name {
    margin-top: 10px;
    color: #666;
    letter-spacing: 2px;
  }
  &-info {
    display: flex;
    align-items: center;
    margin: 20px 0;
    p {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin: 0 20px;
      span {
        color: #333;
        font-size: 22px;
      }
      i {
        font-style: normal;
        font-size: 12px;
        color: #999;
      }
    }
  }
  &-btn {
    color: #666;
    position: relative;
    border: 1px solid #576e85;
    padding: 15px 42px;
    background-color: transparent;
    transition: all 0.5s ease;
    overflow: hidden;
    cursor: pointer;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      line-height: 1;
    }
    &::after {
      content: "";
      position: absolute;
      width: 200%;
      height: 5px;
      transform: rotate(40deg);
      background-color: #0bb6eb;
      left: -56%;
      transition: all 0.5s ease;
      opacity: 0;
    }
    &:hover {
      color: #fff;
      border: 1px solid transparent;
      &::after {
        transform: scaleY(10);
        opacity: 1;
      }
    }
  }
  .active_b {
    color: #fff;
    border: 1px solid transparent;
    &::after {
      transform: scaleY(10);
      opacity: 1;
    }
  }
}
</style>
