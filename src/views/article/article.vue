<template>
  <div class="article">
    <div class="article_content">
      <div class="article_title">{{ articleData && articleData.title }}</div>
      <div class="article_meta">
        <span>发表时间:{{ createdTime }}</span>
        <span>更新时间:{{ updatedTime }}</span>
      </div>
      <!-- 文章内容 -->
      <div v-highlight class="markdown-body" v-html="bodyHtml"></div>
      <!-- 文章评论 -->
      <div class="article_comment" id="article_comment">
        <div class="article_comment--title">Hi~</div>
        <div class="article_comment--action">
          <textarea placeholder="写下你的评论..." type="text"></textarea>
          <div class="submit">提交</div>
        </div>
        <div class="article_comment--content">
          <div class="comment_item" v-for="(item, index) in 4" :key="index">
            <div class="comment_item--img">V</div>
            <div class="comment_item--content">
              <p class="name">
                <span>v</span>
                <span>{{ index + 1 }}楼</span>
              </p>
              <p class="time">2020-04-14日07:40:45</p>
              <div class="detail">底部备案工</div>
              <div class="control">
                <i class="iconfont iconpinglun"></i>
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
        <div class="article_comment--page">
          <span>共<b>1</b>页</span>
          <span>当前页:<b>1</b></span>
          <span class="arrow"> <i class="iconfont iconleft"></i>上一页</span>
          <span class="arrow"> 下一页 <i class="iconfont iconright"></i></span>
        </div>
      </div>
    </div>
    <!-- 文章目录 -->
    <div class="article_menubox" ref="menubox">
      <div class="article_menu">
        <div class="article_menu--title">目录</div>
        <div
          class="article_menu--item"
          v-for="(item, index) in menuList"
          :class="item.menuText == menuText && 'act_item'"
          :key="index"
          @click="scrollAppoint(item.menuText)"
        >
          {{ item.menuText }}
        </div>
      </div>
    </div>

    <!-- 点赞悬浮 -->
    <div class="article_suspended">
      <div
        class="article_suspended--item"
        :class="clickLike && 'act_suspended'"
        :badge="articleData && articleData.likeNum"
        @click="likeArticle"
      >
        <i class="iconfont iconzang"></i>
      </div>
      <div
        class="article_suspended--item"
        :badge="articleData && articleData.commentNum"
       @click="scrollAppoint('article_comment')"
      >
        <i class="iconfont iconpinglun"></i>
      </div>
    </div>
    <!-- 返回顶部 -->
    <go-top :show="show" />
    <!-- 加载 -->
    <Load v-if="load" />
  </div>
</template>

<script src="./article.js"></script>
<style lang="less">
@import url("./article.less");
@import url("../../assets/css/markdown.less");
</style>
