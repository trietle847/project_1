import { createWebHistory, createRouter } from "vue-router";
import Dictionary from "@/views/Dictionary.vue";
import home from "@/views/homePages/home.vue";
import manageUser from "@/views/adminPages/manageUser.vue"
import manageDictionary from "@/views/adminPages/manageDictionary.vue"
import login from "@/views/homePages/login.vue";
import register from "@/views/homePages/register.vue";
import savedword from "@/views/userPages/savedWordPage.vue";
import profile from "@/views/userPages/profile.vue";
import homeGamePage from "@/views/gamePages/homeGamePage.vue";
import flashCardGame from "@/views/gamePages/flashCardGame.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/dictionary",
    name: "dictionary",
    component: Dictionary,
  },
  {
    path: "/admin/user",
    name: "manageUser",
    component: manageUser,
  },
  {
    path: "/admin/dictionary",
    name: "manageDictionary",
    component: manageDictionary,
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
  {
    path: "/saved",
    name: "savedword",
    component: savedword,
  },
  {
    path: "/profile",
    name: "profile",
    component: profile,
  },
  {
    path: "/game",
    name: "game",
    component: homeGamePage,
  },
  {
    path: "/game/flashcard",
    name: "flashcardgame",
    component: flashCardGame,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
