import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import middlewareBeforeEach from "@/router/middleware";

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(middlewareBeforeEach);

export default router;
