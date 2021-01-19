// pages/cart/cart.js

import { getSetting, chooseAddress, openSetting } from "../../utils/asyncWx";


Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        // Newcart: []
    },
    onShow() {
        // // 获取缓存中购物车数据
        // const cart = wx.getStorageSync("cart");
        // let listData = []
        // for (var i = 0; i < cart.length; i++) {
        //     listData[i] = cart[i].data.message
        // }
        // this.setData({
        //     Newcart: listData
        // })
    },
    /* ------------------------监听事件点击函数---------------------------- */
    // 接收子组件传递过来的数据
    handleItemChange(e) {
        const newAddress = e.detail.newAddress;
        console.log(newAddress)
        this.setData({
            address: newAddress
        })
    }
})