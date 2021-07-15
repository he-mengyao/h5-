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
        setCity(state, city) {
            state.city = city
        },
        setuserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setNum(state, num) {
            state.num = num
        }
    },
    actions: {},
    modules: {}
})