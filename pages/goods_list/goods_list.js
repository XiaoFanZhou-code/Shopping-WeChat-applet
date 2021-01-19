// pages/goods_list/goods_list.js
import { getGoodsList } from "../../service/goods_list";


Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "综合",
                isActive: true,
            },
            {
                id: 1,
                value: "销量",
                isActive: false,
            },
            {
                id: 2,
                value: "价格",
                isActive: false,
            },
        ],
        goodsList: []
    },
    // 接口要的参数
    QueryParmas: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },
    // 总页数
    totalPages: 1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParmas.cid = options.cid || "";
        this.QueryParmas.query = options.query || "";
        this._getGoodsList()
    },

    /*---------------网络请求函数----------------------*/
    async _getGoodsList() {
        const res = await getGoodsList(this.QueryParmas)

        const total = res.data.message.total; // 获取总条数

        this.totalPages = Math.ceil(total / this.QueryParmas.pagesize) // 计算总页数
        this.setData({
                // 拼接数组
                goodsList: [...this.data.goodsList, ...res.data.message.goods]
            })
            // 关闭下拉刷新的窗口
        wx.stopPullDownRefresh();
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
    // 加载更多
    onReachBottom() {
        // 判断还有没有下一页的数据
        if (this.QueryParmas.pagenum >= this.totalPages) {
            wx.showToast({
                title: '亲，没有下一页数据了哦！',
            })
        } else {
            this.QueryParmas.pagenum++;
            this._getGoodsList();
        }
    },
    // 下拉刷新
    onPullDownRefresh() {
        // 重置数组
        this.setData({
                goodsList: []
            })
            // 重置页码
        this.QueryParmas.pagenum = 1;
        // 发送请求
        this._getGoodsList();
    }
});