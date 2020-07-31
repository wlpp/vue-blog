<template>
  <div class="article">
    <div class="article_content">
      <div class="article_title">{{ articleData && articleData.title }}</div>
      <div class="article_meta" v-if="articleData.content">
        <span>发表时间:{{ createdTime }}</span>
        <span>更新时间:{{ updatedTime }}</span>
      </div>
      <!-- 文章内容 -->
      <tinymce ref="editor" :value="bodyHtml" :disabled="disabled" />
      <!-- 文章评论 -->
      <div class="article_comment" id="article_comment" v-if="articleData.content">
        <div class="article_comment--title">Hi~</div>
        <div class="article_comment--action">
          <transition name="flipX">
            <div class="replybar" v-if="replyGuest !== ''">
              <span>回复 @{{ replyGuest }}</span
              ><i class="iconfont iconclose" @click="setReplyInfo({ replyGuest: '', replyText: '' })"></i>
            </div>
          </transition>
          <textarea placeholder="写下你的评论..." v-model="commentText" type="text"></textarea>
          <div class="submit" @click="addComment(commentText)">提交</div>
        </div>
        <div class="article_comment--content">
          <div class="comment_item" v-for="(item, index) in commnetList" :key="index">
            <div class="comment_item--img">{{ item.guestImage }}</div>
            <div class="comment_item--content">
              <p class="name">
                <span>{{ item.guestName }}</span>
                <span>{{ index + 1 }}楼</span>
              </p>
              <p class="time">{{ item.createTime }}</p>
              <div class="replyto" v-if="item.replyGuest !== ''">
                @{{ item.replyGuest }}: <span>{{ item.replyText }}</span>
              </div>
              <div class="detail">{{ item.commentText }}</div>
              <div class="control" @click="setReplyInfo({ replyGuest: item.guestName, replyText: item.commentText })">
                <i class="iconfont iconpinglun"></i>
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
        <div class="article_comment--page">
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
      </div>
    </div>
    <!-- 文章目录 -->
    <div class="article_menubox" ref="menubox" v-if="articleData.content">
      <div class="article_menu">
        <div class="article_menu--title">目录</div>
        <div
          class="article_menu--item"
          v-for="(item, index) in menuList"
          :class="item.menuId == menuId && 'act_item'"
          :key="index"
          @click="scrollAppoint(item.menuId)"
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
        :class="commnetList.length > 0 && 'act_suspended'"
        :badge="commnetList && commnetList.length"
        @click="scrollAppoint('article_comment')"
      >
        <i class="iconfont iconpinglun"></i>
      </div>
      <div
        class="article_suspended--item up"
        :class="showUpload && 'act_suspended'"
        @click="setShowUpload"
        v-if="!disabled"
      >
        <i class="iconfont iconupload"></i>
      </div>
    </div>
    <!-- 返回顶部 -->
    <go-top :show="show" />
    <!-- 加载 -->
    <Load v-if="load" />
    <!-- 编辑 -->
    <div class="edit-popup" v-if="showEdit">
      <input type="text" placeholder="指令进入编辑模式" v-model="editVal" />
    </div>
    <div class="upload-popup" v-if="showUpload">
      <input type="text" placeholder="文章标题" :value="title" @input="setUploadValue({ type: 0, e: $event })" />
      <input type="text" placeholder="文章标签" :value="tagNames" @input="setUploadValue({ type: 1, e: $event })" />
      <div class="upload-btn" @click="uploadArticle">
        上传
      </div>
    </div>
  </div>
</template>

<script src="./article.js"></script>
<style lang="less">
@import url("./article.less");
@import url("../../assets/css/prism.css");
</style>
