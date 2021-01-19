import request from '../service/network'

export function getGoodsDetials(goods_id) {
    return request({
        url: '/goods/detail',
        data: { goods_id }
    })
}