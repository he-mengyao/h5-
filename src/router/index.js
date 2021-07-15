import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '',
        component: layout,
        children: [{
                path: '/',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页',
                    index: '/'
                }
            },
            {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('../views/my/My.vue'),
                meta: {
                    title: '我的',
                    index: '/my'
                }
            },
            {
                path: '/category',
                name: 'category',
                component: () =>
                    import ('../views/category/Category.vue'),
                meta: {
                    title: '分类',
                    index: '/category'
                }
            },
            {
                path: '/shopcar',
                name: 'shopcar',
                component: () =>
                    import ('../views/shopcar/Shopcar.vue'),
                meta: {
                    title: '购物车',
                    index: '/shopcar'
                }
            },
        ]
    }, {
        path: '/register',
        name: 'register',
        component: () =>
            import ('../views/register/Register.vue'),
        meta: {
            title: '注册/登录',
            index: '/register'
        }
    }, {
        path: '/detail',
        name: 'detail',
        component: () =>
            import ('../views/detail/Detail.vue'),
        meta: {
            title: '详情',
            index: '/detail'
        }
    }, {
        path: '/saveUser',
        name: 'saveUser',
        component: () =>
            import ('../views/saveUser/saveUser.vue'),
        meta: {
            title: '修改用户信息',
            index: '/saveUser'
        }
    },
    {
        path: '/settle',
        name: 'settle',
        component: () =>
            import ('../views/settle/Settle.vue'),
        meta: {
            title: '结算',
            index: '/settle'
        }
    },
    {
        path: '/location',
        name: 'location',
        component: () =>
            import ('../views/location/Location.vue'),
        meta: {
            title: '城市列表',
            index: '/location'
        }
    },
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/address/Address.vue'),
        meta: {
            title: '地址列表',
            index: '/address'
        }
    },
    {
        path: '/addaddress',
        name: 'addaddress',
        component: () =>
            import ('../views/addaddress/Addaddress.vue'),
        meta: {
            title: '编辑地址',
            index: '/addaddress'
        }
    },
    {
        path: '/all',
        name: 'all',
        component: () =>
            import ('../views/all/All.vue'),
        meta: {
            title: '全部订单',
            index: '/all'
        }
    },
    {
        path: '/collect',
        name: 'collect',
        component: () =>
            import ('../views/collect/Collect.vue'),
        meta: {
            title: '我的收藏',
            index: '/collect'
        }
    },
    {
        path: '/current',
        name: 'current',
        component: () =>
            import ('../views/current/Current.vue'),
        meta: {
            title: '浏览历史',
            index: '/current'
        }
    },
    {
        path: '/assess',
        name: 'assess',
        component: () =>
            import ('../views/assess/Assess.vue'),
        meta: {
            title: '评价中心',
            index: '/assess'
        }
    },
    {
        path: '/comment',
        name: 'comment',
        component: () =>
            import ('../views/comment/Comment.vue'),
        meta: {
            title: '写评价',
            index: '/comment'
        }
    },
    {
        path: '/commentitem',
        name: 'commentitem',
        component: () =>
            import ('../views/comment/CommentItem.vue'),
        meta: {
            title: '评价详情',
            index: '/commentitem'
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    if (!localStorage.getItem('userInfo')) {
        switch (to.path) {
            case '/settle':
            case '/address':
            case '/collect':
            case '/assess':
            case '/saveUser':
            case '/addaddress':
            case '/all':
            case '/collect':
            case '/current':
            case '/comment':
            case '/commentitem':
                next('/')
                break;
            default:
                next()
                break;
        }
    } else {
        next()
    }
})

export default router