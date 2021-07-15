import { Dialog, Toast } from 'vant';
import router from '../router/index'

export default {
    checkLogin({ key, next, item }) {
        let user = localStorage.getItem(key)
        if (user) {
            next(item)
        } else {
            Dialog.confirm({
                    title: '检测到您未登录',
                    message: '是否立即跳转到登录页面',
                })
                .then(() => {
                    router.push('/register')
                })
                .catch(() => {
                    Toast('您取消了操作');
                });
        }
    },
    saveHistory({ username, key, data, attr }) {
        let name = username + key + 'History' // 名字规范
        let history = localStorage.getItem(name)
        if (history) {
            // 如果存在
            let arr = JSON.parse(localStorage.getItem(name))
            let item = null
            if (typeof data === 'string') {
                item = arr.find(i => {
                    return i[attr] === data
                })
            } else {
                item = arr.find(i => {
                    return i[attr] === data[attr]
                })
            }
            if (!item) {
                if (typeof data === 'string') {
                    let obj = {
                        [attr]: data
                    }
                    arr.push(obj)
                } else {
                    arr.push(data)
                }
            }
            localStorage.setItem(name, JSON.stringify(arr))

        } else {
            // 第一次存储
            let arr = []
            if (typeof data === 'string') {
                let obj = {
                    [attr]: data
                }
                arr.push(obj)
            } else {
                arr.push(data)
            }
            localStorage.setItem(name, JSON.stringify(arr))
        }
    },
    getHistory({ username, key }) {
        let name = username + key + 'History'
        let arr = localStorage.getItem(name)
        if (arr) return JSON.parse(arr)
        else return null
    }
}