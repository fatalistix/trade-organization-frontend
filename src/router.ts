import { createRouter, createWebHistory } from "vue-router"
import { useUserStore, UserType } from "./stores/UserStore"

import Login from "./components/login/Login.vue"
import ManagerHome from "./components/manager/ManagerHome.vue"
import ManagerTradingPoint from "./components/manager/ManagerTradingPoint.vue"
import ManagerSeller from "./components/manager/ManagerSeller.vue"
import NotFound from "./components/NotFound.vue"

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/manager',
            component: ManagerHome
        },
        {
            path: '/manager/trading-point',
            component: ManagerTradingPoint
        },
        {
            path: '/manager/seller',
            component: ManagerSeller,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})

router.afterEach((to) => {
    if (to.path === "/login") {
        useUserStore().type = UserType.LOGIN
    } else if (to.path === "/manager") {
        useUserStore().type = UserType.MANAGER
    } else if (to.path.startsWith("/trading-point")) {
        useUserStore().type = UserType.SELLER
    }
})