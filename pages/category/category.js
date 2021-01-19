// pages/category/category.js
import { getCates } from "../../service/category";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 左侧的菜单数据
        leftMenuList: [],
        // 右侧菜单数据
        rightMenuList: [],
        // 被点击的左侧返回的菜单
        currentIndex: 0,
        // 左部内容的滚动条距离顶部的距离
        scrollTop: 0,
    },

    // 接口返回数据
    Cates: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /* 1.先判断一下本地存储中有没有旧的数据{time: Data.now(),data:{...}}  */
        /* 2. 没有就得数据，直接发送网络请求  */
        /* 3.右旧的数据，同时旧的数据也没有过期，就使用本地存储中的旧数据即可  */

        // 1获取本地存储中的数据
        const Cates = wx.getStorageSync("cates");
        // 2判断
        if (!Cates) {
            this._getCates();
        } else {
            // 有就数据，定义过期时间，10s改成5分钟
            if (Date.now() - Cates.time > 1000 * 10) {
                // 重新发送请求
                this._getCates();
            } else {
                // 可以使用旧数据
                this.Cates = Cates.data;
                // 构造左侧大菜单数据
                let leftMenuList = this.Cates.map((v) => v.cat_name);
                // 构造右侧大菜单数据
                let rightMenuList = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightMenuList,
                });
            }
        }
    },

    /* -------------------网络请求函数--------------------*/
    async _getCates() {
        /* es6写法 */

        // getCates()
        //     .then((res) => {
        //         this.Cates = res.data.message;
        //         // 把接口数据存储到本地中
        //         wx.setStorageSync("cates", { time: Date.now(), data: this.CateS });
        //         // 构造左侧大菜单数据
        //         let leftMenuList = this.Cates.map((v) => v.cat_name);
        //         // 构造右侧大菜单数据
        //         let rightMenuList = this.Cates[0].children;
        //         this.setData({
        //             leftMenuList,
        //             rightMenuList,
        //         });
        //     })
        //     .catch((err) => {
        //         console.log("网络请错误!");
        //     });
        /* 优化接口代码，es7写法 */
        const res = await getCates();
        this.Cates = res.data.message;
        // 把接口数据存储到本地中
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        // 构造左侧大菜单数据
        let leftMenuList = this.Cates.map((v) => v.cat_name);
        // 构造右侧大菜单数据
        let rightMenuList = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightMenuList,
        });
    },
    /*---------------事件监听函数----------------------*/
    // 左侧菜单的点击事件
    handleItemTap(e) {
        // 获取被点击的标题身上的索引值
        const { index } = e.currentTarget.dataset;
        // 给data中的currentInder赋值
        // 根据不同的Index来渲染不同的数据
        let rightMenuList = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightMenuList,
            // 重新设置右侧内容的scroll-view标签的距离顶部的距离
            scrollTop: 0,
        });
    },
});