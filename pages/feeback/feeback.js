// pages/feeback/feeback.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                value: "体验问题",
                isActive: true,
            },
            {
                id: 1,
                value: "商品。商家投诉",
                isActive: false,
            },
        ],
        // 被选中的图片路径数组
        chooseImags: [],
        // 文本域的内容
        textVal: "",
    },
    // 外网的图片数组
    upLoadImgs: [],

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
    /**
     * 点击“+”按钮触发tab点击事件
     * 调用小程序内置的选择的api
     * 获取到图片的路径
     * 把图片数组存到data的变量中
     * 页面就可以根据图片数组进行循环显示：自定义组件
     */
    handleChooseImg() {
        // 调用小程序内置的选择图片api
        wx.chooseImage({
            // 同时选中的图片的数量
            count: 9,
            // 图片的格式 原图/压缩
            sizeType: ["oribinal", "compressed"],
            // 图片来源
            sourceType: ["album", "camera"],
            success: (res) => {
                this.setData({
                    // 图片数组拼接，方便多次上传
                    chooseImags: [...this.data.chooseImags, ...res.tempFilePaths],
                });
            },
        });
    },
    /**
     * 点击自定义图片组件
     * 获取被点击的元素的索引
     * 获取data中的图片数组
     * 根据索引，对数组中删除对应的元素
     * 把数组重新设置回data中
     */
    handelRemoveImg(e) {
        // 获取被点击的组件的索引
        const { index } = e.currentTarget.dataset;
        // 获取data中的图片数组
        let { chooseImags } = this.data;
        // 删除元素
        chooseImags.splice(index, 1);
        this.setData({
            chooseImags,
        });
    },
    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value,
        });
    },
    // 提交按钮的点击事件
    handleFormSubmit() {
        // 获取文本域的内容
        const { textVal, chooseImags } = this.data;
        // 合法性的验证
        if (!textVal.trim()) {
            // 不合法，弹窗提示
            wx.showToast({
                title: "输入不合法~",
                icon: "none",
                mask: true,
            });
            return;
        }
        // 弹窗提示
        wx.showLoading({
            title: "正在上传中",
            mask: true,
        });
        // 判断有没有需要上传的图片数组
        if (chooseImags.length != 0) {
            chooseImags.forEach((v, i) => {
                // 上传专门图片服务器
                wx.uploadFile({
                    // 被上传的文件路径
                    filePath: v,
                    // 图片要上传到哪里
                    url: 'http://my.zol.com.cn/index.php?c=Ajax_User&a=uploadImg',
                    // 上传的文件名称，后台来获取文件 image
                    name: 'myPhoto',
                    success: (res) => {
                        console.log(res);
                        let url = JSON.parse(res.data).url;
                        this.upLoadImgs.push(url);
                        // 所有的图片上传完毕才触发
                        if (i === chooseImags.length - 1) {
                            // 关闭弹窗
                            wx.hideLoading();
                            console.log("提交到后台");
                            // 重置页面
                            this.setData({
                                textVal: "",
                                chooseImags: [],
                            });
                            // 返回到上一个也页面
                            wx.navigateBack({
                                delta: 1,
                            });
                        }
                    },
                    fail: (err) => {

                    }
                });
            });
        } else {
            console.log("只是上传文本");
            wx.hideLoading();
            wx.navigateBack({
                delta: 1,
            });
        }
    },
});