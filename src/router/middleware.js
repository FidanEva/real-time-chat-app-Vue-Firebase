import { useAuthStore } from "../store/authStore";

const middlewareBeforeEach = (to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.user) {
    return next({ path: '/login' });
  }

  if (authStore.user && (to.path === '/login' || to.path === '/signup')) {
    return next({ path: '/chat' });
  }

  next();
};

export default middlewareBeforeEach;
