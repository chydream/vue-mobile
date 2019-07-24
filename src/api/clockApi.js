import axios from './axios'
import qs from 'qs'
import {baseUrl} from '@/config/config'
import Vue from 'vue'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
// 查询当日签到列表
export const getTodaySignList = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/todaySignList',
            method: 'post',
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 获取用户信息
export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/userInfo',
            method: 'post',
        }).then(res => {
            resolve(res.data)
        }).catch((error)=>{
            // console.log(error)
            // Vue.$vux.toast.show({
            //     text:'请重新扫码',
            //     type:'cancel',
            //     time:3000
            // })
        })
    })
}
/**
 * 获取微信签名参数
 * @param {url} 当前页面地址 
 */
export const getSignature = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/getSignature',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        })
    })
}
/**
 * 查询签到日历数据
 * @param {yearMonth} 年月yyyyMM格式 
 */
export const querySignResultList = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/querySignResultList',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        })
    })
}
/**
 * 查询企业日历配置
 * @param {yearMonth} 年月yyyyMM格式 
 */
export const queryEnterpriseCalendarConfig = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/queryEnterpriseCalendarConfig',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        })
    })
}
/**
 * 签到接口
 * @param {signType} 签到类型 1-正常考勤
 * @param {codeStr} 二维码内容
 * @param {locations} 经度,纬度 
 */
export const dosign = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/sign/dosign',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        }).catch((error)=>{
            // console.log(error)
            Vue.$vux.loading.hide()
        })
    })
}
/**
 * 获取当月相关流程数据
 * @param {yearMonth} 年月yyyyMM格式 
 */
export const queryUserFlowDataByMonth = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/queryUserFlowDataByMonth',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve(res.data)
        })
    })
}
// 查询系统配置信息
export const getConfigInfo = () => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/api/configInfo',
            method: 'post',
        }).then(res => {
            resolve(res.data)
        })
    })
}