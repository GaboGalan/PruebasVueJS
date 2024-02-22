import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HelloWorld from '../src/components/HelloWorld'
import PruebaComponent from '../src/components/PruebaComponent'

const routes = [
    {
        path:'/', component: HelloWorld,
    },{
        path:'/prueba', component: PruebaComponent,
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
