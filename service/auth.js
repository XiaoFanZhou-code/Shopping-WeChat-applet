import request from "../service/network";

export function getUsertokrn(loginParams) {
    return request({
        url: "/users/wxlogin",
        data: {
            loginParams,
        },
        // method: "psot",
    });
}