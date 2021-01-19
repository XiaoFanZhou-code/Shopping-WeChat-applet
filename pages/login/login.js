// pages/login/login.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /* -----------------------监听点击事件函数------------------------------ */
    handlegetUserInfo(e) {
        console.log(e);
        // 解构数据
        const { userInfo } = e.detail;
        // 把获取到的用户信息存储到缓存中
        wx.setStorageSync("userinfo", userInfo);
        wx.navigateBack({
            detail: 1
        })
    },
});