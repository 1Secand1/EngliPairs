import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/GameSelection.vue"),
    },
    {
      path: "/game",
      name: "game",
      component: () => import("@/views/GamePage.vue"),
    },
    {
      path: "/creation-game",
      name: "creationGame",
      children: [
        {
          path: "",
          name: "CreationGamePage",
          component: () => import("@/views/CreationGamePage.vue"),
        },
      ],
    },
  ],
});

export default router;
