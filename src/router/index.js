import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/lessons",
  },
  {
    path: "/cart",
    name: "Cart",
    // Lazy loading the cart component
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/lessons",
    name: "Lessons",
    component: () => import("../views/Lessons.vue"),
  },
  // 404 page
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(), // Change this line
  routes,
});

export default router;
