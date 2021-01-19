// pages/goods_details/goods_details.js
import { getGoodsDetials } from "../../service/detail";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        bottom_info: {},
        // 商品是否被收藏过
        isCollect: false,
    },
    // 商品对象数组
    GoodsInfo: {},
    onShow() {
        let pages = getCurrentPages();
        let currentPage = pages[pages.length - 1];
        let options = currentPage.options;
        const { goods_id } = options;
        this._getGoodsDetials(goods_id);
        console.log(goods_id);
    },

    /* ----------------------网络请求函数------------------------- */

    // 获取商品详情数据
    async _getGoodsDetials(goods_id) {
        const res = await getGoodsDetials(goods_id);
        this.GoodsInfo = res; // 给全局商品对象赋值，方便放大预览调用

        // 获取缓存中的商品收藏数组
        let collect = wx.getStorageSync("collect") || [];
        // 判断当前的商品是否被收藏
        let isCollect = collect.some(
            (v) => v.goods_id === this.GoodsInfo.data.message.goods_id
        );

        this.setData({
            goodsObj: {
                goods_name: res.data.message.goods_name,
                goods_price: res.data.message.goods_price,
                // 转换图片格式，部分iphone手机不支持.webp格式
                goods_introduce: res.data.message.goods_introduce.replace(
                    /\.webp/g,
                    ".jpg"
                ),
                pics: res.data.message.pics,
            },
            // 赋值给bottom_info方便传给子组件bottom_tool中使用
            bottom_info: res,
            isCollect,
        });
    },

    /* ----------------------监听点击事件函数------------------------- */
    // 点击轮播图，放大预览
    handlePrevewImage(e) {
        // 先构造要预览的图片数组
        const urls = this.GoodsInfo.data.message.pics.map((v) => v.pics_mid);
        // 接收传递过来的图片url
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            urls,
            current,
        });
    },
    /**
     * 商品收藏
     * 页面onShow的时候，加载缓存中的商品收藏数据
     * 判断当前商品是否被收藏
     * 是：改变页面的图标，不是：不用操作
     * 点击商品收藏按钮
     * 判断改商品是否存在于缓存数组中
     * 已经存在，把该商品删除
     * 没有的话，把该商品添加到数组，存入缓存中即可
     */
    handleCollect() {
        let isCollect = false;
        // 获取缓存中的商品收藏数组
        let collect = wx.getStorageSync("collect") || [];
        // 判断改商品是否被收藏过
        let index = collect.findIndex(
            (v) => v.goods_id === this.GoodsInfo.data.message.goods_id
        );
        // 当index!=-1时，表示已经收藏过了
        if (index !== -1) {
            // 能找到，表示已经收藏过，在数组中删除该商品
            collect.splice(index, 1);
            isCollect = false;
            // 弹窗提示
            wx.showToast({
                title: "取消成功",
                icon: "success",
                mask: true,
            });
        } else {
            collect.push(this.GoodsInfo.data.message);
            isCollect = true;
            // 弹窗提示
            wx.showToast({
                title: "收藏成功",
                icon: "success",
                mask: true,
            });
        }
        // 把数组存入缓存中
        wx.setStorageSync("collect", collect);
        // 修改data中的数据isCollect
        this.setData({
            isCollect,
        });
    },
});