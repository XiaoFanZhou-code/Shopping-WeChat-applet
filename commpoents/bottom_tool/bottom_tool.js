// commpoents/bottom_tool/bottom_tool.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bottom_info: {
            type: Object,
            value: {},
        },
    },

    /**
     * 组件的初始数据
     */
    data: {},
    /**
     * 组件的方法列表
     */
    methods: {
        handleCartAdd() {
            // 获取缓冲中的购物车数组
            let cart = wx.getStorageSync("cart") || [];
            // 判断商品对象是否存在于购物车中
            let index = cart.findIndex(
                (v) => v.goods_id === this.properties.bottom_info.data.message.goods_id
            );
            if (index === -1) {
                // 不存在，第一次添加
                this.properties.bottom_info.data.message.num = 1;
                this.properties.bottom_info.data.message.checked = true;
                cart.push(this.properties.bottom_info.data.message);
            } else {
                cart[index].num++;
            }
            // 把购物车重新添加回缓存中
            wx.setStorageSync("cart", cart);
            // 弹窗提示
            wx.showToast({
                title: "加入成功",
                icon: "success",
                //true防止用户手抖
                mask: true,
            });
        },
    },
});