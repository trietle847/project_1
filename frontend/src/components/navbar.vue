<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="logo">My Dictionary</router-link>
    </div>

    <div class="nav-center">
      <ul class="nav-links">
        <li><router-link to="/">Dictionary</router-link></li>
        <li><router-link to="/game">Game</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </div>

    <div class="nav-right">
      <template v-if="isLoggedIn">
        <span class="username">Xin chào, {{ hoten }}</span>
        <button class="btn logout" @click="logOut">Đăng xuất</button>
      </template>
      <template v-else>
        <button class="btn login" @click="gotoLoginPage">Đăng nhập</button>
      </template>
    </div>
  </nav>
</template>


<script setup>
import { useAuthStore } from '@/stores/authStore.stores';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const hoten = computed(() => authStore.hoten);

function gotoLoginPage() {
  router.push("/login");
}

function logOut() {
  authStore.logout();
  router.push("/")
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  z-index: 1000;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
}

.nav-left,
.nav-center,
.nav-right {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 26px;
  font-weight: bold;
  color: #1877f2;
  text-decoration: none;
}

.nav-center {
  flex: 1;
  justify-content: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 32px;
  padding: 0;
  margin: 0;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  position: relative;
}

.nav-links li a::after {
  content: '';
  display: block;
  height: 2px;
  background-color: #1877f2;
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  transition: width 0.3s ease;
}

.nav-links li a:hover::after {
  width: 100%;
}

.nav-links li a:hover {
  color: #1877f2;
}

.nav-right {
  gap: 15px;
  font-size: 16px;
}

.username {
  margin-right: 8px;
  color: #333;
  font-weight: 500;
}

.btn {
  padding: 8px 18px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  user-select: none;
}

.btn.login {
  background-color: #1877f2;
  color: white;
}

.btn.login:hover {
  background-color: #125ecb;
  transform: translateY(-1px);
}

.btn.logout {
  background-color: #dc3545;
  color: white;
}

.btn.logout:hover {
  background-color: #b02a37;
  transform: translateY(-1px);
}

/* Responsive basic */
@media (max-width: 768px) {
  .nav-center {
    display: none;
  }

  .navbar {
    padding: 10px 20px;
  }

  .nav-right {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>