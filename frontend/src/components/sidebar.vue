<template>
  <div class="sidebar">
    <div class="d-flex flex-column p-3 bg-light">
      <ul class=" nav nav-pills flex-column mb-auto">
        <div v-if="isAdmin">
          <li class="nav-item">
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'users' }"
              @click="selectPage('users')">
              Manage Users
            </button>
          </li>
          <li>
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'dictionary' }"
              @click="selectPage('dictionary')">
              Manage Dictionary
            </button>
          </li>
        </div>

        <div v-else>
          <li>
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'saved' }"
              @click="selectPage('saved')">
              Từ đã lưu
            </button>
          </li>
          <li>
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'learning' }"
              @click="selectPage('learning')">
              Từ đang học
            </button>
          </li>
          <li>
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'account' }"
              @click="selectPage('account')">
              Tài khoản
            </button>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      selectedPage: '',
      isAdmin: false,
    };
  },
  mounted() {
    this.isAdmin = localStorage.getItem("isAdmin") === "true";
    this.updateSelectedPage();
  },
  watch: {
    '$route.path'() {
      this.updateSelectedPage();
    },
  },
  methods: {
    selectPage(page) {
      this.selectedPage = page;
      this.$emit('selectPage', page);

      if (this.isAdmin && this.$route.path !== '/admin') {
        this.$router.push('/admin');
      }
    },
    updateSelectedPage() {
      if (this.isAdmin && this.$route.path === '/admin') {
        this.selectedPage = 'users';
        this.$emit('selectPage', 'users');
      } else {
        this.selectedPage = null;
      }
    }
  },
};
</script>



<style scoped>
.sidebar {
  position: fixed;
  top: 75px;
  left: 0;
  min-width: 220px;
  background-color: #f8f9fa;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 75px);
  overflow-y: auto;
  z-index: 1000;
  white-space: nowrap;
}

button {
  margin-top: 12px;
  border: 1px solid #ddd;
  font-weight: 600;
}

button:hover {
  background-color: #e2e6ea;
}
</style>
