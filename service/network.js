import { baseURL } from '../service/config'

// 同时发送异步代码的次数
let ajaxImes = 0;

export default function request(options) {
    ajaxImes++;
    wx.showLoading({
        title: '加载中',
        mask: true
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseURL + options.url,
            method: options.method || 'get',
            data: options.data || {},
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            },
            complete: () => {
                ajaxImes--;
                if (ajaxImes === 0) {
                    // 关闭加载更多的图标
                    wx.hideLoading();
                }
            }
        })
    })
}