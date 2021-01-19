// pages/collect/collect.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "商品收藏",
                isActive: true,
            },
            {
                id: 1,
                value: "品牌收藏",
                isActive: false,
            },
            {
                id: 2,
                value: "店铺收藏",
                isActive: false,
            },
            {
                id: 2,
                value: "浏览足迹",
                isActive: false,
            },
        ],
        collect: [],
    },
    onShow() {
        const collect = wx.getStorageSync("collect") || [];
        this.setData({
            collect,
        });
    },
    /*---------------事件监听函数----------------------*/
    handleTabsItemChange(e) {
        // 获取被点击的标题索引
        const { index } = e.detail;
        // 修改数组源
        let { tabs } = this.data;
        tabs.forEach((v, i) =>
            i === index ? (v.isActive = true) : (v.isActive = false)
        );
        // 赋值到data
        this.setData({
            tabs,
        });
    },
    changeTitleByIndex(index) {
        let { titles } = this.data;
        titles.forEach((item, indey) => {
            index === indey ? (item.isActive = true) : (item.isActive = false);
        });
        this.setData({
            titles,
        });
    },
});