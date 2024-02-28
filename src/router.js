import { createWebHistory, createRouter } from 'vue-router';
import Home from '../src/components/HelloWorld.vue';
import LoginCfactura from '../src/components/LoginCfactura.vue';
import MenuFactura from './components/MenuFactura.vue';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/LoginCfactura',
    component: LoginCfactura,
  },
  {
    path: '/MenuFactura',
    component: MenuFactura,
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

