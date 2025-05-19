<template>
  <n-layout has-sider style="height: 100vh">
    <Sidebar v-if="!isAuthPage" v-model:collapsed="collapsed" />
    <n-layout>
      <Navbar v-if="!isAuthPage" @toggle-sidebar="collapsed = !collapsed" />
      <n-layout-content style=" overflow-y: auto;">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>


<script setup>
import Sidebar from "@/components/sidebar.vue";
import Navbar from "@/components/navbar.vue";
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const collapsed = ref(false);
const router = useRoute();

const isAuthPage = computed(() => {
  return router.path ==="/login" || router.path === "/register"
})
</script>
