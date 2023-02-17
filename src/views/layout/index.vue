<template>
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" >
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao icon-shouye"></i>
      <span class="text">首页</span>
      </van-tabbar-item>
      <!-- <van-tabbar-item to="/wenda">
        <i slot="icon" class="toutiao icon-wenda"></i>
      <span class="text"> 问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/shipin">
        <i slot="icon" class="toutiao icon-shipin"></i>
      <span class="text">视频</span>
      </van-tabbar-item> -->
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao icon-wode"></i>
      <span class="text">{{$store.state.user ?'我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'LayoutPage',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped></style>
