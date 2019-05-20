const mobileCommon = {
    namespaced: true,
    state: {
        title: 'header'
    },
    getters: {
    },
    mutations: {
        SET_TITLE (state, params) {
            state.title = params
        }
    },
    actions: {
    }
}
export default mobileCommon
