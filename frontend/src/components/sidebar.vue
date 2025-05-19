<template>
  <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger
    @collapse="$emit('update:collapsed', true)" @expand="$emit('update:collapsed', false)">
    <n-menu :collapsed="collapsed" show-tooltip-on-collapse :collapsed-icon-size="22" :options="menuOptions"
      :value="selectedKey" @update:value="handleSelect" />
  </n-layout-sider>
</template>

<script setup>
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  HomeOutline as HomeIcon,
  PeopleOutline as ManageUsersIcon,
  LibraryOutline as ManageDictIcon
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { ref, h, onMounted, watch, defineProps, defineEmits, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/authStore.stores';

const props = defineProps({
  collapsed: Boolean
});

const emit = defineEmits(['update:collapsed']);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore()

const selectedKey = ref('');
const menuOptions = ref([]);

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function handleSelect(key) {
  selectedKey.value = key;

  const routes = {
    home: '/',
    saved: '/saved',
    profile: '/profile',
    manageUsers: '/admin/user',
    manageDictionary: '/admin/dictionary'
  };

  if (routes[key]) {
    router.push(routes[key]);
  }
}

function updateSelectedKey() {
  const path = route.path;
  if (path === '/') selectedKey.value = 'home';
  else if (path === '/saved') selectedKey.value = 'saved';
  else if (path === '/profile') selectedKey.value = 'profile';
  else if (path === '/admin/user') selectedKey.value = 'manageUsers';
  else if (path === '/admin/dictionary') selectedKey.value = 'manageDictionary';
  else selectedKey.value = '';
}

watchEffect(() =>  {
  const isAdmin = authStore.isAdmin;

  const common = [
    {
      label: 'Trang chủ',
      key: 'home',
      icon: renderIcon(HomeIcon)
    },
    {
      label: 'Từ đã lưu',
      key: 'saved',
      icon: renderIcon(BookIcon)
    },
    {
      label: 'Tài khoản',
      key: 'profile',
      icon: renderIcon(PersonIcon)
    }
  ];

  const admin = [
    {
      label: 'Quản lý tài khoản',
      key: 'manageUsers',
      icon: renderIcon(ManageUsersIcon)
    },
    {
      label: 'Quản lý thư viện',
      key: 'manageDictionary',
      icon: renderIcon(ManageDictIcon)
    }
  ];

  menuOptions.value = isAdmin ? [...common, ...admin] : common;
});

onMounted(() => {
  updateSelectedKey();
});

watch(() => route.path, updateSelectedKey);
</script>

<style>
.n-menu {
  padding-top: 20px;
}

.n-layout-sider {
  top: 64px;
  left: 0;
  height: calc(100vh - 64px);
  background-color: #fff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all 0.3s ease-in-out;
}
</style>
