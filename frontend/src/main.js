import './assets/main.css'
import './assets/common.css'

import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 환경 변수
const serverUrl = import.meta.env.VITE_APP_API_URL || '//localhost:8081'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

// Axios를 전역으로 제공
app.provide('axios', axios)
app.provide('serverUrl', serverUrl)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Vuetify를 사용하기 위해 추가

app.mount('#app') // 앱을 마운트
