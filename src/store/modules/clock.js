import {getTodaySignList,getUserInfo,getSignature,querySignResultList,
    queryEnterpriseCalendarConfig,getConfigInfo,
    dosign,queryUserFlowDataByMonth} from '@/api/clockApi'
const clock = {
    namespaced: true,
    state: {
        userData:{}
    },
    getters: {
    },
    mutations: {
        SET_USERINFO(state,params){
            state.userData = params
        }
    },
    actions: {
        GetTodaySignList ({state, commit, dispatch}) {
            return new Promise((resolve, reject) => {
                getTodaySignList().then(res => {
                    resolve(res)
                })
            })
        },
        GetUserInfo ({state, commit, dispatch}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    commit('SET_USERINFO',res.data)
                    resolve(res)
                })
            })
        },
        GetSignature ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getSignature(params).then(res => {
                    resolve(res)
                })
            })
        },
        QuerySignResultList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                querySignResultList(params).then(res => {
                    resolve(res)
                })
            })
        },
        QueryEnterpriseCalendarConfig ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                queryEnterpriseCalendarConfig(params).then(res => {
                    resolve(res)
                })
            })
        },
        Dosign ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                dosign(params).then(res => {
                    resolve(res)
                })
            })
        },
        QueryUserFlowDataByMonth ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                queryUserFlowDataByMonth(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetConfigInfo ({state, commit, dispatch}) {
            return new Promise((resolve, reject) => {
                getConfigInfo().then(res => {
                    resolve(res)
                })
            })
        }
    }
}
export default clock
