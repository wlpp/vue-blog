<template>
  <div class="header">
    <div class="header-warp">
      <nav>
        <li class="active">主页</li>
        <li>书籍</li>
        <li>行博</li>
        <li>简介</li>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};  
  },
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/common.less");
.header {
  height: 80px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px 0 #e9e9e9;
  background: url("@{imgUrl}/header_bg.png") top/cover no-repeat;
  margin-bottom: 15px;
  box-sizing: border-box;

  &-warp {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    li {
      margin: 0 15px;
      color: #999;
      padding: 10px 5px;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        color: #17aaee;
        border-bottom: 2px solid #17aaee;
      }
    }
    .active {
      color: #17aaee;
      border-bottom: 2px solid #17aaee;
    }
  }
}
</style>
