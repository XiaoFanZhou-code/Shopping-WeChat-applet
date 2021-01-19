import request from '../service/network'

export function getOrders(type) {
    return request({
        url: '/my/orders/all',
        data: { type }
    })
}