import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'

import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'

import './app.scss'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Notifications)
app.mount("#app")