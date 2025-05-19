import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    token: localStorage.getItem("token") || "",
    hoten: localStorage.getItem("hoten") || "",
    isAdmin: localStorage.getItem("isAdmin") === "true",
  }),
  actions: {
    login({ token, hoten, isAdmin }) {
      this.token = token;
      this.hoten = hoten;
      this.isAdmin = isAdmin;
      this.isLoggedIn = true;

      localStorage.setItem("token", token);
      localStorage.setItem("hoten", hoten);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("isLoggedIn", true);
    },
    logout() {
      this.token = "";
      this.hoten = "";
      this.isAdmin = false;
      this.isLoggedIn = false;
      localStorage.clear();
    },
  },
});
