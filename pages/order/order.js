// pages/order/order.js
import { getOrders } from '../../service/order'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "全部",
                isActive: true,
            },
            {
                id: 1,
                value: "待付款",
                isActive: false,
            },
            {
                id: 2,
                value: "待发货",
                isActive: false,
            },
            {
                id: 2,
                value: "退款/退货",
                isActive: false,
            },
        ],
        oders: []
    },
    /**
     * 1.页面打开的时候 onshow
     * onShow不同于onLoad无法在形参上接收options参数
     * 判断缓存中有没有token值：没有，直接跳转到授权页面。有直接往下进行
     * 获取url上的形参type
     * 根据type去发送网络请求获取订单数据
     * 渲染页面
     * 点击不同的标题时，重新发送网络请求来获取和渲染数据
     */
    onShow(options) {
        // 判断是否有token 值
        const token = wx.getStorageSync('token');
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/auth',
            })
            return
        }
        // 获取当前的小程序的页面栈-数组，长度最大是10页面
        let pages = getCurrentPages();
        // 数组中，索引最大的页面就是当前的页面
        let currentPages = pages[pages.length - 1];
        console.log(currentPages.options)
            // 获取url上的type参数
        const { type } = currentPages.options;
        this._getOrders(type)
    },

    /*---------------网络请求函数----------------------*/
    async _getOrders(type) {
        const res = await getOrders(type);
        this, setData({
            oders: res
        })
    },
    /*---------------事件监听函数----------------------*/
    handleTabsItemChange(e) {
        // 获取被点击的标题索引
        const { index } = e.detail;
        // 修改数组源
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 赋值到data
        this.setData({
            tabs
        });
    },
})