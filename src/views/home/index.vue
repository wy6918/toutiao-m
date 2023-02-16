<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文字列表 -->
        <ArticelList :channel="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div
      slot="nav-right"
      class="hamburger-btn"
      @click="isChannelEditShow=true"
      >
        <i class="toutiao icon-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
    <ChannelEdit
    @changeMyChannels="changeMyChannels" :myChannels="channels"
    :active="active"
    @update-active="updateActive"
    @delMyChannels="delMyChannels"
    />
    </van-popup>
  </div>
</template>
<script>
import ArticelList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getUserChannels } from '@/api/user'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomePage',
  components: { ArticelList, ChannelEdit },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.getUserChannels()
  },
  methods: {
    async getUserChannels () {
      try {
        let channel = []
        if (this.user) {
        // 登录 拿到用户的频道
          const { data } = await getUserChannels()
          this.channels = data.data.channels
          console.log('denglu', this.channels)
        } else {
          // 未登录 判断本地是否有频道数据
          const key = 'TOUTIAO_CHANNELS'
          const localChannel = getItem(key)
          if (localChannel) {
            // 有,拿
            channel = localChannel
          } else {
            // 无,请求默认频道数据
            const { data } = await getUserChannels()
            channel = data.data.channels
            console.log('weidenglu', channel)
          }
          this.channels = channel
        }
      } catch (error) {
        console.log(error)
      }
    },
    changeMyChannels (val) {
      console.log(val)
      this.channels.push(val)
    },
    updateActive (i, isChannelEditShow = true) {
      // console.log('home', i)

      this.active = i
      this.isChannelEditShow = isChannelEditShow
    },
    delMyChannels (i) {
      this.channels.splice(i, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding-bottom: 50px;
  padding-top: 90px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
    .search-btn {
      width: 300px;
      // height: 64px;
      background-color: #5babfb;
      border: none;
      font-size: 20px;
      .van-icon {
        font-size: 20px;
      }
    }
  }

  /deep/ .channel-tabs {
    .van-tab {
      min-width: 100px;
      border-right: 1px solid #edeff3;
    }
    .van-tabs__wrap {
      position: fixed;
      top: 46px;
      right: 0;
      z-index: 1;
      left: 0;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0; //默认为1 表示参与flex的剩余空间的使用。反之
      width: 68px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 43.99px;
      background-color: #fff;
      opacity: 0.902;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
