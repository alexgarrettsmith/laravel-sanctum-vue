import {createApp, h} from 'vue'
import App from './App.vue'
import axios from 'axios'
import useAuth from "./composables/useAuth.js";
import './style.css'
import router from './router/index.js'

axios.defaults.baseURL = 'http://laravel-sanctum-vue-api.test'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const { attempt } = useAuth()

const app = createApp({
    render: () => h(App)
})

attempt().then(() => {
    app.use(router)
    app.mount('#app')
})