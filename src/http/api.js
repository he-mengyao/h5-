// 封装所有的请求
import http from './index'

export default {
    // 传参数都传成功对象的方式
    recommend() {
        return http.get('/recommend')
    },
    search(value) {
        return http.post('/search', {
            value
        })
    },
    classification({ id }) {
        return http.get(`/classification?mallSubId=${id}`)
    },
    getCard() {
        return http.post('/getCard')
    },
    editCart({ count, id, mallPrice }) {
        return http.post('/editCart', {
            count,
            id,
            mallPrice
        })
    },
    deleteShop(cid) {
        return http.post('/deleteShop',
            cid
        )
    },
    order({ address, tel, orderId, totalPrice, idDirect, count }) {
        return http.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count
        })
    },
    goods(id) {
        return http.get(`/goods/one?id=${id}`)
    },
    collection(obj) {
        return http.post('collection',
            obj
        )
    },
    cancelCollection({ id }) {
        return http.post('/cancelCollection', { id })
    },
    isCollection({ id }) {
        return http.post('/isCollection', { id })
    },
    getCollection() {
        return http.get(`/collection/list`, {

        })
    },
    addShop(id) {
        return http.post('/addShop', {
            id
        })
    },
    loginOut() {
        return http.post('/loginOut')
    },
    queryUser() {
        return http.post('/queryUser')
    },
    saveUser(gender, year, month, day, id, nickname) {
        return http.post('/saveUser', {
            gender,
            year,
            month,
            day,
            id,
            nickname
        })
    },
    verify() {
        return http.get('/verify')
    },
    comment({ id, rate, content, anonymous, _id, order_id, image }) {
        return http.post('/goodsOne/comment', {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image
        })
    },
    getAddress() {
        return http.get('/getAddress')
    },
    getDefaultAddress() {
        return http.get('/getDefaultAddress')
    },
    setDefaultAddress(id) {
        return http.post('/setDefaultAddress', {
            id
        })
    },
    address({ name, tel, address, isDefault, province, city, county, addressDetail, areaCode, id }) {
        return http.post('/address', {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id
        })
    },
    deleteAddress({ id }) {
        return http.post('/deleteAddress', {
            id
        })
    },
    register(nickname, password, verify) {
        return http.post('/register', {
            nickname,
            password,
            verify
        })
    },
    login(nickname, password, verify) {
        return http.post('/login', {
            nickname,
            password,
            verify
        })
    },
    myOrder() {
        return http.get('/myOrder')
    },
    alreadyEvaluated({ page }) {
        return http.get(`/alreadyEvaluated?page=${page}`)
    },
    tobeEvaluated({ page }) {
        return http.get(`/tobeEvaluated?page=${page}`)
    },
    evaluateOne({ id, _id }) {
        return http.post('/evaluateOne', {
            id,
            _id
        })
    }

}