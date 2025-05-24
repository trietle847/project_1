import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

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
    checkTokenExpiry() {
      if (!this.token) return ;
      try {
        const decode = jwtDecode(this.token);
        if (decode.exp *1000 <Date.now()) {
          this.logout();
          alert("Phiên bản đã hết hạn")
        }
      } catch (error) {
        console.error("Lỗi khi decode token:", error);
        this.logout();
      }
    }
  },
});
