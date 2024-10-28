import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/PageGame.vue"),
    },
  ],
});

export default router;
