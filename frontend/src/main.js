import './assets/main.css'
import './assets/common.css'

import { createApp, provide, readonly } from 'vue'
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

// app.config.globalProperties.$axios = axios;  //전역변수로 설정 컴포넌트에서 this.$axios 호출할 수 있음
// app.config.globalProperties.$serverUrl = '//localhost:8081' //api server

// Axios를 전역으로 제공
app.provide('axios', readonly(axios))
app.provide('serverUrl', serverUrl)

app.use(createPinia())
app.use(router)
app.use(vuetify) // Vuetify를 사용하기 위해 추가

app.mount('#app') // 앱을 마운트
