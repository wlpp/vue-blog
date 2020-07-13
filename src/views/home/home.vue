<template>
  <div class="home">
    <div class="main">
      <div class="main-left">
        <div class="queryBar">
          <b>当前检索条件:</b><span v-if="tagNames !== ''">{{ tagNames }}</span>
        </div>
        <div class="page-box">
          <div class="page-item" v-for="(item, index) in archive" :key="index">
            <div class="page-item--meta">
              <span v-for="(c_item, c_index) in item.tagNames" :key="c_index">{{ c_item }}</span>
            </div>
            <div class="page-item--title ellipsis">{{ item.title }}</div>
            <div class="page-item--action">
              <div class="icon">
                <i class="iconfont iconzang"></i>
                <span>{{ item.likeNum }}</span>
              </div>
              <div class="icon">
                <i class="iconfont iconpinglun"></i>
                <span>{{ item.commentNum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="page-count" v-if="archive.length > 0">
          <span
            >共<b>{{ pageTotal }}</b
            >页</span
          >
          <span
            >当前页:<b>{{ pageIndex }}</b></span
          >
          <span class="arrow" :class="pageIndex === 1 && 'disable'" @click="handlePage(0)">
            <i class="iconfont iconleft"></i>上一页</span
          >
          <span class="arrow" :class="pageIndex === pageTotal && 'disable'" @click="handlePage(1)">
            下一页 <i class="iconfont iconright"></i
          ></span>
        </div>
        <div class="page-null" v-if="archive.length === 0">
          <i class="iconfont iconwushuju"></i>
          <span>暂无数据呦</span>
        </div>
      </div>
      <div class="main-right">
        <!-- 搜索框 -->
        <div class="search-bar" :class="isClick && 'active_s'">
          <input
            type="text"
            placeholder="输入文章名进行检索..."
            v-model="value"
            @focus="isClick = true"
            @blur="isClick = false"
            @keyup.enter="handleSearch(value)"
          />
          <i class="iconfont iconsearch" @click="handleSearch(value)"></i>
        </div>
        <!-- 个人信息 -->
        <Ordme :blogger="blogger" />
        <!-- 标签 -->
        <div class="tags">
          <div class="tags-title">标签</div>
          <ul class="tags-content">
            <li
              v-for="(item, index) in tags"
              :key="index"
              :class="item.name === tagNames && 'active_t'"
              @click="handleTag(item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
      <Login :show="loginPopup" />
    </div>
  </div>
</template>
<script src="./home.js"></script>
<style lang="less" scoped>
@import url("./home.less");
</style>
