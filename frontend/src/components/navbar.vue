<template>
  <div>
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/home">
          <div class="logo" router-link to="/home">My Dictionary</div>
        </router-link>
      </div>

      <div class="nav-center">
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/dictionary">Dictionary</a></li>
          <li><a href="/about">Game</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div class="nav-right">
        <div v-if="isLoggedIn">
          <span class="username">Xin chào {{ hoten }}</span>
          <button class="btn logout" @click="logOut">Đăng xuất</button>
        </div>
        <button v-else class="btn login" @click="gotoLoginPage">Đăng nhập</button>
      </div>

    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      hoten: "",
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    gotoLoginPage() {
      this.$router.push("/login")
    },
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const hoten = localStorage.getItem("hoten") || "";

      this.isLoggedIn = this.isLoggedIn;
      this.hoten = hoten
    },
    logOut() {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("hoten");
      localStorage.removeItem("isAdmin");
      this.isLoggedIn = false;
      this.hoten = "";
    }
  }
};
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 30px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ddd;
    height: 75px;
    z-index: 1000;
  }

  .nav-left,
  .nav-center,
  .nav-right {
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-decoration: none;
  }

  .nav-center {
    flex: 1;
    justify-content: center;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 30px;
    padding: 0;
    margin: 0;
  }

  .nav-links li a {
    text-decoration: none;
    color: #333;
    font-size: 18px;
    transition: color 0.3s;
  }

  .nav-links li a:hover {
    color: #007bff;
  }

  .nav-right {
    gap: 15px;
  }

  .username {
    font-size: 16px;
    margin-right: 10px;
    color: #333;
  }

  .btn {
    padding: 6px 14px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .btn.login {
    background-color: #007bff;
    color: white;
  }

  .btn.login:hover {
    background-color: #0056b3;
  }

  .btn.logout {
    background-color: #dc3545;
    color: white;
  }

  .btn.logout:hover {
    background-color: #b02a37;
  }
</style>