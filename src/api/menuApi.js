import axios from './axios'
import qs from 'qs'
import {baseUrl, baseUrl2} from '@/config/config'
// 获取menu数据接口
export const getUrlList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MOAuth/GetUrlList?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 已读未读数据接口
export const getReadData = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/MSos/GetReadData?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取登录token 信息存入Cookies和catcher
export const getTokenByMoblie = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl2 + '/api/MToken/GetTokenByMoblie?data=' + JSON.stringify(params),
            method: 'get',
        }).then(res => {
            resolve(res.data)
        })
    })
}