import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Styles
import './styles/main.css'

async function initializeApp() {
  const app = createApp(App)
  
  app.use(router)
  
  app.mount('#app')
}

initializeApp().catch(console.error)