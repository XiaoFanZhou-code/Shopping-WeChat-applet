// pages/pay/pay.js
import {
    getSetting,
    chooseAddress,
    openSetting,
    showModal,
    showToast,
} from "../../utils/asyncWx";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cart: [],
        totalPrice: 0,
        totalNum: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 获取缓存中的收货地址
        const address = wx.getStorageSync("address");
        // 获取缓存中购物车数据
        let cart = wx.getStorageSync("cart") || [];
        // 过滤后的购物车数组
        cart = cart.filter((v) => v.checked);
        // 给data赋值
        this.setData({ address });
        /* 计算总价格、总数量 */
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach((v) => {
            totalPrice += v.num * v.goods_price;
            totalNum += v.num;
        });
        this.setData({
            cart,
            totalPrice,
            totalNum,
            address,
        });
    },

    /* --------------------监听点击事件函数------------------ */
    // 点击支付功能
    handleOrderPay() {
        // 判断缓存有没有token
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            });
            return
        }
        console.log('已经存在token~')
    }
});