// pages/auth/auth.js
import { login } from "../../utils/asyncWx";
import { getUsertokrn } from "../../service/auth";

Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /* -----------------------监听事件点击函数------------------------------- */
    async handleGetUserInfo(e) {
        // 获取用户信息
        const { encryptedData, rawData, iv, signature } = e.detail;
        // 获取小程序登陆成功的code
        const { code } = await login();
        const loginParams = { encryptedData, rawData, iv, signature };
        // 发起网络请求，获取用户的token 值
        const res = await getUsertokrn(loginParams);
        console.log(res);
    },
});