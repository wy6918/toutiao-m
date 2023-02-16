import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 定义全局过滤器：处理相对时间，可以在任何组件的模板（template)中使用
// 参数1：过滤器名称，参数2：过滤器函数
// 使用的方式{{表达式|过滤器名称}}
// 管道符| 前面的表达式的结果会作为参数传递到过滤器函数中，过滤器的返回值会渲染到使用过滤器的模板位置
// 如： {{user.name|relativeTime（返回值为：29）}} 效果：张三 29
Vue.filter('relativeTime', value => {
  // 到 value 的相对时间
  return dayjs().to(dayjs(value))
})
