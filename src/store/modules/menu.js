import {getUrlList, getReadData, getTokenByMoblie} from '@/api/menuApi'
const menu = {
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
        GetUrlList ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getUrlList(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetReadData ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getReadData(params).then(res => {
                    resolve(res)
                })
            })
        },
        GetTokenByMoblie ({state, commit, dispatch}, params) {
            return new Promise((resolve, reject) => {
                getTokenByMoblie(params).then(res => {
                    resolve(res)
                })
            })
        }
    }
}
export default menu
