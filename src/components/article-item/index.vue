<template>
  <van-cell class="article-item">
    <div slot="title">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(item, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" :src="item" />
        </div>
      </div>
      <div>
        <span>{{ article.aut_name }} </span>
        <span>{{ article.comm_count }}评论 </span>
        <span>
          {{ article.pubdate|relativeTime }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      width="100"
      height="100"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>
<script>
export default {
  name: 'ArticelItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 100px;
    height: 106px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-item {
      flex: 1;
      height: 100px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 100px;
      }
    }
  }
}
</style>
