import { createWebHistory, createRouter } from 'vue-router';
import Home from '../src/components/HelloWorld.vue';
import LoginCfactura from '../src/components/LoginCfactura.vue';

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/LoginCfactura',
    component: LoginCfactura,
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

