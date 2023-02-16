<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(item, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(item.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">
          {{ item.name }}
        </span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false" />
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        icon="plus"
        v-for="(item, index) in recommendChannels"
        :key="index"
        :text="item.name"
        @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>
<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  computed: {
    recommendChannels () {
      const channels = []
      this.allChannels.forEach((channel) => {
        // 查找满足条件的元素
        const res = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
        // 如果我的频道中不包含该频道，则放到频道推荐
        if (!res) {
          channels.push(channel)
        }
      })
      return channels
    },
    ...mapState(['user'])
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async onAddChannel (val) {
      this.$emit('changeMyChannels', val)
      // 实现数据持久化
      if (this.user) {
        // 已登录 存储到线上
        try {
          // 没成功！！
          await addUserChannel({
            id: val.id,
            seq: this.myChannels.length
          })
        } catch (error) {
          console.log('保存失败，请稍后再试')
        }
      } else {
        // 未登录 存储到本地
        const key = 'TOUTIAO_CHANNELS'
        setItem(key, this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 编辑 删除
        if (this.fiexChannels.includes(channel.id)) {
          // 固定频道不删除
          return
        }
        this.$emit('delMyChannels', index)
        // 如果删除的是激活前面的，让active的值-1
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理删除持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑 切换
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        //  已登录
        try {
          await deleteUserChannel(channel.id)
        } catch (error) {
          console.log('操作失败,请稍后再试')
        }
      } else {
        //  未登录
        const key = 'TOUTIAO_CHANNELS'
        setItem(key, this.myChannels)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit {
  padding-top: 40px;
  .van-cell__title {
    font-size: 20px;
  }
  .edit-btn {
    width: 82px;
    height: 29px;
    font-size: 16px;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 55px;
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        right: -4px;
        top: -4px;
        font-size: 16px;
        color: #cacaca;
        z-index: 2;
      }
      .van-grid-item__text,
      .text {
        color: #050505;
        font-size: 15px;
        width: 86px;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      .van-icon {
        font-size: 16px;
      }
      .van-grid-item__icon + .van-grid-item__text {
        margin: 0;
        font-size: 15px;
        width: 69px;
      }
    }
  }
}
</style>
