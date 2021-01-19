import {getMultiData, getCateList, getFloorList} from '../../service/home'

//index.js
wx-Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图数据
    this._getMultiData()
    // 请求导航数据
    this._getCateList()
    // 请求楼层数据
    this._getFloorList()
  },


  // -------------------网络请求函数--------------------------
  _getMultiData() {
    getMultiData().then(res => {
      this.setData({
        swiperList: res.data.message
      })
    }).catch(err => {
      console.log('轮播图数据网络请求失败！') 
    })
  },
  _getCateList() {
    getCateList().then(res => {
      this.setData({
        catesList: res.data.message
      })
    }).catch(err => {
      console.log('网络请求失败！')
    })
  },
  _getFloorList() {
    getFloorList().then(res => {
      this.setData({
        floorList: res.data.message
      })
    }).catch(err => {
      console.log(err)
    })
  }
})
