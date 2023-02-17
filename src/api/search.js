/**
 * 文章接口模块
 */
import request from '@/utils/reques'

/**
 * 获取频道的文章列表
 */
export const getSearchSuggest = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 */
export function getSearchResult (params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
