import { createWebHistory, createRouter } from "vue-router";
import Dictionary from "@/views/Dictionary.vue";
import home from "@/views/homePages/home.vue";
import userPage from "@/views/userPages/adminPage.vue"
import login from "@/views/homePages/login.vue";
import register from "@/views/homePages/register.vue";

const routes = [
  {
    path: "/",
    name: "dictionary",
    component: Dictionary,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/admin",
    name: "admin",
    component: userPage,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
