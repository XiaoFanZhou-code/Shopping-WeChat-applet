// pages/search/search.js
import { getPsearch } from "../../service/search";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        // 取消“按钮”是否显示
        isFocus: false,
        // 输入框的值
        inputValue: "",
    },
    TimeId: -1,
    /* ---------------------------监听点击事件函数-------------------------- */
    /**
     * 输入框的绑定，值改变事件，input事件
     * 获取搭配输入框的值
     * 合法性判断
     * 检验通过，把输入的值发生到后台
     * 返回的数据打印到页面上
     */
    handleInput(e) {
        // 解构数据
        const { value } = e.detail;
        // 判断合法性，是否为空字符串
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false,
            });
            // 值不合法
            return;
        }
        this.setData({
            isFocus: true,
        });
        // 准备发送请求获取数据
        // 清除定时器
        clearTimeout(this.TimeId);
        // 重新开启定时器
        this.TimeId = setTimeout(() => {
            this._getPsearch(value);
        }, 1000);
    },
    // 点击取消按钮
    handleCancel() {
        this.setData({
            inputValue: "",
            isFocus: false,
            goods: [],
        });
    },
    /* ---------------------------网络请求函数-------------------------- */
    async _getPsearch(query) {
        const res = await getPsearch(query);
        console.log(res);
        this.setData({
            goods: res.data.message,
        });
    },
});