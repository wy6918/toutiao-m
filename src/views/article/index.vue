<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            >关注</van-button
          >
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article_content"
        ></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleById()"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    aticleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: false,
      errStatus: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleById()
  },
  mounted () {},
  methods: {
    async getArticleById () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.aticleId)
        this.article = data.data
        // 初始化图片，预览图
        setTimeout(() => {
          this.previewImage()
        }, 0)
        // this.$nextTick(() => {
        //   this.previewImage()
        // }) 不成功？
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        console.log(error)
      }
      // 关闭loading
      this.loading = false
    },
    previewImage () {
      // 拿到所有的img节点
      const articleContent = this.$refs.article_content
      console.log(articleContent)
      const imgs = articleContent.querySelectorAll('img')
      console.log(imgs)
      const images = []
      // 遍历所有imgs 将图片地址放到images
      imgs.forEach((item, index) => {
        images.push(item.src)
        // 当点图片时 可滑动到下一张
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 30px;
    bottom: 65px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 45px;
        height: 45px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 16px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 16px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 80px;
        height: 28px;
      }
    }

    .article-content {
      padding: 20px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 80px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 100px;
      color: #b4b4b4;
    }
    .text {
      font-size: 20px;
      color: #666666;
      margin: 15px 0;
    }
    .retry-btn {
      width: 200px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #c3c3c3;
      font-size: 20px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 65px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 200px;
      height: 36px;
      border: 2px solid #eeeeee;
      font-size: 18px;
      line-height: 36px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 23px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
