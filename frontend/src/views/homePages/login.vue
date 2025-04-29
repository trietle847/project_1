<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">tendangnhap</label>
        <input type="text" id="username" v-model="loginData.tendangnhap" placeholder="Enter your username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginData.password" placeholder="Enter your password" required />
      </div>
      <button type="submit" class="btn">Login</button>

      <div>
        <p class="text-center mt-4">
          Don't have an account? <router-link to="/register">Register</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import userService from '@/services/user.service';

export default {
  name: "Login",
  data() {
    return {
      loginData: {
        tendangnhap: "",
        password: "",
      }
    };
  },
  methods: {
    async handleLogin() {
      try {
        const result = await userService.getUserByUsername(this.loginData.tendangnhap);

        if (!result || !result.data) {
          alert("Tên đăng nhập không tồn tại!");
          return;
        }

        if (this.loginData.tendangnhap === "admin") {
          localStorage.setItem("isAdmin", true);
        }

        const user = result.data;

        if (user.password === this.loginData.password) {
          alert("Đăng nhập thành công!");
          localStorage.setItem("isLoggedIn",true);
          localStorage.setItem("hoten", user.hoten)

          this.$router.push("/home");
        } else {
          alert("Sai mật khẩu, vui lòng nhập lại!");
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!");
      }
    }

  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>