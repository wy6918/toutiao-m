<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
      <!-- @focus="isResultShow=false" 聚焦而且输入框有内容 让联想建议 显示 -->
    </form>
     <!-- 搜索结果 -->
     <!-- 回车时 -->
     <SearchResult
     v-if="isResultShow"
     :search-text="searchText"
     />
      <!-- 联想建议 -->
      <!-- 当输入信息时 显示 -->
      <SearchSuggest
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />
     <!-- 搜索记录 -->
     <!-- 输入框无输入信息时 显示 -->
    <SearchHistory v-else :search-history="searchHistory"
    @AllDelSearchHistory="searchHistory=[]"
    @search="onSearch"
    @delSearchHistory="delSearchHistory"
    />

  </div>
</template>
<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggest from './components/search-suggest.vue'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 搜索的历史记录
    }
  },
  watch: {
    searchHistory (value) {
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      // 不能重复历史记录，最新的放在前面
      //  indexof 如果要检索的字符串值没有出现，则该方法返回 -1。
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        // 已存在 删除
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    },
    delSearchHistory (i) {
      this.searchHistory.splice(i, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.search-container{
  padding-top: 50px;
  .van-search__action{
    color: #fff;
  }
  .search-form{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }
}
</style>
