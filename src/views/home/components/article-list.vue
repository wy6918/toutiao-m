<template>
  <div class="article-list">
    <van-pull-refresh
      :success-text="refreshSuccessText"
      :success-duration="1000"
      v-model="isLoading"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <ArticleItem
      v-for="(item, index) in list"
          :key="index"
          :title="item.title"
          :article="item"
      />
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      error: false,
      finished: false,
      timestamp: null, // 请求下一页数据的时间戳
      isLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 人为制造错误
        // if (Math.random() > 0.5) {
        //   JSON.parse('slsdjflk')
        // }
        const { results } = data.data
        this.list.push(...results)
        // 本次数据加载结束后，把加载状态设为结束
        this.loading = false
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (error) {
        // console.log(error)
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
