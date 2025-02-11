import { createRouter, createWebHistory } from 'vue-router';
import ChatRoom from '../components/ChatRoom.vue';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';

const routes = [
  { path: '/', component: ChatRoom },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;