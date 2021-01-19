// commpoents/address_btn/address_btn.js
import {
    getSetting,
    chooseAddress,
    openSetting,
    showModal,
    showToast,
} from "../../utils/asyncWx";

Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        address: {},
        Newcart: [],
        allChecked: false,
        totalPrice: 0,
        totalNum: 0,
    },
    pageLifetimes: {
        show() {
            // 获取缓存中的收货地址
            const address = wx.getStorageSync("address");
            // 获取缓存中购物车数据
            const cart = wx.getStorageSync("cart") || [];
            let listData = [];
            for (var i = 0; i < cart.length; i++) {
                listData[i] = cart[i];
            }
            /* 计算全选 */
            // every数组方法，会遍历，会接收一个回调函数，每个回调函数都返回true，那么every方法才返回的值才为true
            /* 注意：如果是空数据，调用every的话，返回值也是true,要判断是否为空数组 */
            /* 实现全部选中方法一 */
            // const allChecked = listData.length ?
            //     listData.every((v) => v.checked) :
            //     false;
            const Newcart = listData;
            this.setCart(Newcart);
            // 给data赋值
            this.setData({
                Newcart: listData,
                address,
            });
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击选择收货地址的点击事件
        async handleChooseAddress(e) {
            try {
                // 1.获取用户权限状态
                const res1 = await getSetting();
                // 获取用户权限
                const scopeAddress = res1.authSetting["scope.address"];
                // 2.判断权限状态
                if (scopeAddress === false) {
                    // 诱导用户打开授权页面
                    await openSetting();
                }
                // 调用获取收货地址的api
                const address = await chooseAddress();

                // 把获取到的收货地址存储到缓存中
                wx.setStorageSync("address", address);
            } catch (err) {
                console.log(err);
            }
            // 获取要要传递要传递的获取数据
            const newAddress = e.currentTarget.dataset.address;
            // 触发事件父组件中的自定义事件，同时传递数据给父组件
            this.triggerEvent("itemChange", { newAddress });
        },

        /**
         * 商品选中事件分析：
         * 1.绑定change事件
         * 2.获取到被修改的商品对象
         * 3.商品对象的选中状态取反
         * 4.重新填充回data中和缓存中
         * 5.重新计算全选、总价格和总数量
         */
        handleItemChange(e) {
            // 获取被修改的商品的id
            const goods_id = e.currentTarget.dataset.id;
            // 获取购物车数据
            let { Newcart } = this.data;
            console.log(Newcart);
            // 找到被修改的商品对象
            let index = Newcart.findIndex((v) => v.goods_id === goods_id);
            // 选中状态取反
            Newcart[index].checked = !Newcart[index].checked;
            // 把购物车的数据重新设置回data和缓存中
            this.setCart(Newcart);
        },
        // 封装全选、计算总价格和总数量的函数
        setCart(Newcart) {
            /* 实现全部选中方法二 */
            let allChecked = true;
            /* 计算总价格、总数量 */
            let totalPrice = 0;
            let totalNum = 0;
            Newcart.forEach((v) => {
                if (v.checked) {
                    totalPrice += v.num * v.goods_price;
                    totalNum += v.num;
                } else {
                    allChecked = false;
                }
            });
            // 再判断数组是否为空
            allChecked = Newcart.length != 0 ? allChecked : false;
            this.setData({
                Newcart,
                totalPrice,
                totalNum,
                allChecked,
            });
            wx.setStorageSync("cart", Newcart);
        },

        /**
         * 全选和反选分析：
         * 1.给复选框绑定change事件
         * 2.获取data中的全选变量allChecked
         * 3.直接取反allChecked =! allChecked
         * 4.遍历购物车数组，让里面的商品选中状态跟随allChecked改变而改变
         * 5.把购物车的数组和allChecked重新设置回data，把购物车重新设置回缓存中
         */

        hanldeItemAllCheck() {
            // 1.获取data的数据
            let { Newcart, allChecked } = this.data;
            // 2.修改值
            allChecked = !allChecked;
            // 3.循环修改cart数组中的商品选中状态
            Newcart.forEach((v) => (v.checked = allChecked));
            // 把修改好的值填充回data或者缓存中
            this.setCart(Newcart);
        },

        /**
         * 商品数量的编辑
         * 1."+","-"按钮绑定同一个点击事件，区分的关键是定义属性:"+"=>"+1", "-"=>"-1"
         * 2.传递被点击的商品的id：goods_id
         * 3.获取data中的购物车数组，来获取需要被修改的商品对象
         * 4.直接修改商品对象的数量num = 1同时用户点击“-”时,弹窗提示用户是否要删除，确定：直接执行删除，取消：什么都没有发生
         * 5.把cart数组重新设置回缓存和data中 调用this,setCart()函数
         */
        async handleItemNumEdit(e) {
            // 获取传递过来的参数
            const { operation, id } = e.currentTarget.dataset;
            // 获取购物车数组
            let { Newcart } = this.data;
            // 找到需要修改的商品索引
            const index = Newcart.findIndex((v) => v.goods_id === id);
            // 判断是否要执行删除功能
            if (Newcart[index].num === 1 && operation === -1) {
                // 弹窗提示
                const res = await showModal({ content: "您是否要删除此商品？" });
                if (res.confirm) {
                    Newcart.splice(index, 1);
                    this.setCart(Newcart);
                }
            } else {
                // 进行修改数量
                Newcart[index].num += operation;
                // 设置回缓存和data中
                this.setCart(Newcart);
            }
        },
        /**
         * 点击结算
         * 判断有没有收货地址信息
         * 判断用户有没有选购商品
         * 经过以上的验证跳转到支付页面
         */
        async handlePay() {
            // 判断收货地址
            const { address, totalNum } = this.data;
            if (!address.userName) {
                await showToast({ title: "您还没有选择收货地址！" });
                return;
            }
            // 判断用户是否选购了商品
            if (totalNum === 0) {
                await showToast({ title: "您还没有选购商品哦~" });
                return;
            }
            // 跳转到支付页面
            wx.navigateTo({
                url: "/pages/pay/pay",
            });
        },
    },
});