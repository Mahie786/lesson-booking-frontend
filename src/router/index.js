import { createRouter, createWebHashHistory } from "vue-router";

// Define routes for the application
const routes = [
  {
    path: "/",
    redirect: "/lessons", // Redirect root path to lessons
  },
  {
    path: "/cart",
    name: "Cart",
    // Lazy loading the cart component for better performance
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/lessons",
    name: "Lessons",
    // Lazy loading the lessons component
    component: () => import("../views/Lessons.vue"),
  },
  // 404 page for handling undefined routes
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    // Lazy loading the NotFound component
    component: () => import("../views/NotFound.vue"),
  },
];

// Create the router instance
const router = createRouter({
  // Use hash mode for routing (e.g., lesson-bookings.com/#/lessons)
  history: createWebHashHistory(),
  routes,
});

export default router;
