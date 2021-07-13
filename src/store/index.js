import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        city: localStorage.getItem('city'),
        userInfo: localStorage.getItem('userInfo'),
        num: localStorage.getItem('num')
    },
    mutations: {
        setCity(state, data) {
            state.city = data
        },
        setuserInfo(state, data) {
            state.userInfo = data
        },
        setNum(state, num) {
            state.num = num
        }
    },
    actions: {},
    modules: {}
})