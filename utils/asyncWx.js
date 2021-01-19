/* Promise形式的getSetting */
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

/* Promise形式的chooseAddress */
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

/* Promise形式的openSetting */
export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

/**
 * Promise形式的showModal
 * @param {object} param0参数
 */

// 弹窗提示
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: "提示",
            content: content,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

/**
 * Promise形式的showModal
 * @param {object} param0参数
 */

// 弹窗提示
export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: "none",
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

/**
 * Promise形式的login
 */
// 获取小程序登陆成功的code
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 1000,
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}