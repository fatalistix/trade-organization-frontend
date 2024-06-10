import { createRouter, createWebHistory } from "vue-router"

import Login from "./components/login/Login.vue"
import ManagerHome from "./components/manager/ManagerHome.vue"
import ManagerTradingPoint from "./components/manager/ManagerTradingPoint.vue"
import ManagerSeller from "./components/manager/ManagerSeller.vue"
import NotFound from "./components/NotFound.vue"
import ManagerDepartmentStore from "./components/manager/ManagerDepartmentStore.vue"
import TradingPointHome from "./components/trading_point/TradingPointHome.vue"
import SellerHome from "./components/seller/SellerHome.vue"
import ManagerProduct from "./components/manager/ManagerProduct.vue"
import ManagerSupplier from "./components/manager/ManagerSupplier.vue"
import ManagerSupplierEdit from "./components/manager/ManagerSupplierEdit.vue"
import ManagerCustomer from "./components/manager/ManagerCustomer.vue"
import ManagerOrder from "./components/manager/ManagerOrder.vue"

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
            path: '/manager/trading-points',
            component: ManagerTradingPoint
        },
        {
            path: '/manager/trading-point/:id/department_store',
            component: ManagerDepartmentStore
        },
        {
            path: '/manager/products',
            component: ManagerProduct
        },
        {
            path: '/manager/sellers',
            component: ManagerSeller,
        },
        {
            path: '/manager/suppliers',
            component: ManagerSupplier,
        },
        {
            path: '/manager/supplier/:id',
            component: ManagerSupplierEdit,
        },
        {
            path: '/manager/customers',
            component: ManagerCustomer,
        },
        {
            path: '/manager/orders',
            component: ManagerOrder,
        },
        {
            path: '/trading-point/:id/:type',
            component: TradingPointHome,
        },
        {
            path: '/seller/:id',
            component: SellerHome,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        }
    ]
})