import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index.vue'
// tabbar相关
import Home from '@/views/tabbar/home.vue'
import Cates from '@/views/tabbar/cates.vue'
import Search from '@/views/tabbar/search.vue'
import Cart from '@/views/tabbar/cart.vue'
import My from '@/views/tabbar/my.vue'
// goods相关
import GoodsList from "@/views/pages/goodslist.vue"
import GoodsDetail from '@/views/pages/goodsdetail.vue'
// address相关
import AddressEdit from '@/views/address/address_edit.vue'
import AddressList from '@/views/address/address_list.vue'
// 订单相关
import Order from '@/views/order/order.vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        redirect: '/home',
        component: Index,
        children: [
            { path: '/home', component: Home },
            { path: '/cates', component: Cates },
            { path: '/search', component: Search },
            { path: '/cart', component: Cart },
            { path: '/my', component: My }
        ]
    },
    { path: '/pages/goods_list', component: GoodsList },
    { path: '/pages/goods_detail/:goods_id', component: GoodsDetail },
    { path: '/address_edit', component: AddressEdit },
    { path: '/address_list', component: AddressList },
    { path: '/order', component: Order }
]


const router = new VueRouter({
    routes
})

export default router