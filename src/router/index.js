import { createWebHistory,createRouter } from "vue-router";
import Home from '@/components/ComHome.vue'
import SanPham from '@/components/ComSanPham.vue'
import GioiThieu from '@/components/ComGioiThieu.vue'
import LienHe from '@/components/ComLienHe.vue'
import ProductDetail from '@/components/ComProductDetail.vue'
import Cart from '@/components/ComCart.vue'
import Search from '@/components/ComTimKiem.vue'
import ComNike from '@/components/ComNike.vue'
import ComMLB from '@/components/ComMLB.vue'
import ComVans from '@/components/ComVans.vue'
import ComGucci from '@/components/ComGucci.vue'
import ComRegister from '@/components/ComRegister.vue'
import ComLogin from '@/components/ComLogin.vue'
import ComHoSo from '@/components/ComHoSo.vue'
const routes=[
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/sanpham",
        name:"SanPham",
        component:SanPham
    },
    {
        path:"/gioithieu",
        name:"GioiThieu",
        component:GioiThieu
    },
    {
        path:"/lienhe",
        name:"LienHe",
        component:LienHe
    },

    {
        path:"/product/:id",
        name:"ProductDetail",
        component:ProductDetail
    },
    {
        path:"/cart",
        name:"Cart",
        component:Cart
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/sanpham/Nike',
        name: 'Nike',
        component: ComNike
    },
    {
        path: '/sanpham/Vans',
        name: 'Vans',
        component: ComVans
    },
    {
        path: '/sanpham/MLB',
        name: 'MLB',
        component: ComMLB
    },
    {
        path: '/sanpham/Gucci',
        name: 'Gucci',
        component: ComGucci
    },
    {
        path: '/register',
        name: 'Register',
        component: ComRegister
    },
    {
        path: '/login',
        name: 'Login',
        component: ComLogin
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ComHoSo,
        meta: { requiresAuth: true }
    },
    {
        path: '/ComHoSo',
        name: 'ComHoSo',
        component: ComHoSo
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
})
export default router