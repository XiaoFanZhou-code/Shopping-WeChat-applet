import request from '../service/network'

export function getGoodsList(QueryParmas) {
    return request({
        url: '/goods/search',
        data: QueryParmas
    })
}