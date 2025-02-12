const ChatRoom = () => import("@/components/ChatRoom.vue");
const Login = () => import("@/components/Login.vue");
const SignUp = () => import("@/components/SignUp.vue");
const AuthLayout = () => import("@/layout/AuthLayout.vue");
const MainLayout = () => import("@/layout/MainLayout.vue");
const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: SignUp },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: 'chat', component: ChatRoom, meta: { requiresAuth: true }  },
    ],
  }
];

export default routes;