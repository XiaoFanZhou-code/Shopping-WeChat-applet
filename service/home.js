import request from '../service/network'

// 发起网络请求，请求 轮播图数据
export function getMultiData() {
  return request({
    url: '/home/swiperdata'
  })
}
// 发起网络请求，请求导航数据
export function getCateList() {
  return request({
    url: '/home/catitems'
  })
}
// 发起网络请求，请求楼层数据
export function getFloorList() {
  return request ({
    url: '/home/floordata'
  })
}