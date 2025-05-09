import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

// Pinia Store
import { useColorsStore } from './stores/colors'

// Create app instances
const app = createApp(App)
const pinia = createPinia()

// Initialize Vuetify with proper configuration
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#005CAF',
        }
      }
    }
  }
})

// Use plugins
app.use(pinia)
app.use(router)
app.use(vuetify)

// Provide stores to components
const colorStore = useColorsStore()
app.provide('colorStore', colorStore)  // Better than globalProperties

app.mount('#app')