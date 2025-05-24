<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand fw-bold text-primary" to="/">My Dictionary</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dictionary</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/game">Game</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
        </ul>

        <div class="d-flex">
          <template v-if="isLoggedIn">
            <div class="dropdown">
              <button class="btn btn-outline-primary dropdown-toggle" type="button" id="userDropdown"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ hoten }}
              </button>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <router-link class="dropdown-item" to="/profile">Tài khoản</router-link>
                </li>
                <li>
                  <button class="dropdown-item text-danger" @click="logOut">Đăng xuất</button>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <button class="btn btn-primary" @click="gotoLoginPage">Đăng nhập</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.stores';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(() => {
  authStore.checkTokenExpiry();
});

const isLoggedIn = computed(() => authStore.isLoggedIn);
const hoten = computed(() => authStore.hoten);

function gotoLoginPage() {
  router.push("/login");
}

function logOut() {
  authStore.logout();
  router.push("/");
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  position: relative;
  font-weight: 500;
  color: #333 !important;
  transition: color 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #1877f2;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #1877f2 !important;
}
</style> 
