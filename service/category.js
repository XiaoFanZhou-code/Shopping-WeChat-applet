import request from '../service/network'
export function getCates() {
    return request({
        url: '/categories'
    })
}