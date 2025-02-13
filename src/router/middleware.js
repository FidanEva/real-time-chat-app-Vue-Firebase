import { useAuthStore } from "../store/authStore";

const middlewareBeforeEach = (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.loading) {
    return next();
  }

  if (to.meta.requiresAuth && !authStore.user) {
    console.log("login");
    return next({ path: '/login' });
  }

  if (authStore.user && (to.path === '/login')) {
    return next({ path: '/chat' });
  }

  next();
};

export default middlewareBeforeEach;
