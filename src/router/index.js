import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomePage.vue';
import UserDetails from '../views/UserDetails.vue';


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
 
  {
    path: '/user/:id',
    props: true,
    name: 'UserDetails',
    component: UserDetails,
  }
  
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

export default router;
