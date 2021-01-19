// pages/user/user.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        // 被收藏的商品数量
        collectNums: 0,
    },
    onShow() {
        // 获取缓存中的用户信息并赋值给data
        const userinfo = wx.getStorageSync("userinfo");
        // 获取缓存中的商品被收藏的数据
        const collect = wx.getStorageSync("collect") || [];
        this.setData({
            userinfo,
            collectNums: collect.length,
        });
    },
});