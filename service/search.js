import request from "../service/network";

export function getPsearch(query) {
    return request({
        url: "/goods/qsearch",
        data: { query },
    });
}