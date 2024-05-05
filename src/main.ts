import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import TradingPointRegister from './components/TradingPointRegister.vue'
import SellerRegister from './components/SellerRegister.vue'
import SellerList from './components/SellerList.vue'
import TradingPointList from './components/TradingPointList.vue'

import App from './App.vue'

import './app.scss'

const pinia = createPinia()
const app = createApp(App)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/manager/trading-points/',
            component: TradingPointList
        },
        {
            path: '/manager/trading-points/register',
            component: TradingPointRegister
        },
        {
            path: '/staff',
            component: SellerRegister
        },
        {
            path: '/trading-point/:trading_point_id/:trading_point_type/sellers',
            component: SellerList
        },
    ]
})

app.use(pinia)
app.use(router)
app.mount("#app")