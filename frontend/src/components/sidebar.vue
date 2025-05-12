<template>
  <div class="sidebar">
    <div class="d-flex flex-column p-3 bg-light">
      <ul class=" nav nav-pills flex-column mb-auto">
        <div v-if="isAdmin">
          <li class="nav-item">
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'manageUsers' }"
              @click="selectPage('manageUsers')">
              Manage Users
            </button>
          </li>
          <li>
            <button class="nav-link text-start w-100" :class="{ active: selectedPage === 'manageDictionary' }"
              @click="selectPage('manageDictionary')">
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

      if (page === 'manageUsers') {
        this.$router.push('/admin/user');
      }
      else if (page === 'manageDictionary') {
        this.$router.push('/admin/dictionary')
      }
      else if (page === 'saved') {
        this.$router.push('/saved');
      } else if (page === 'account') {
        this.$router.push('/profile');
      }
    },
    updateSelectedPage() {
      if (this.isAdmin && this.$route.path === '/admin/user') {
        this.selectedPage = 'manageUsers';
        this.$emit('selectPage', 'manageUsers');
      } else if (this.isAdmin && this.$route.path === '/admin/dictionary') {
        this.selectedPage = 'manageDictionary';
        this.$emit('selectPage', 'manageDictionary');
      } else if (this.$route.path === '/saved') {
        this.selectedPage = 'saved';
      } else if (this.$route.path === '/profile') {
        this.selectedPage = 'account';
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
  min-height: calc(100vh - 75px);
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
