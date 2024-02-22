import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/components/HelloWorld.vue';
import PruebaComponent from '../src/components/PruebaComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/prueba', component: PruebaComponent }
    // Agrega más rutas según sea necesario para tus "páginas" (vistas)
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')

