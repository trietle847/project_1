<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">tendangnhap</label>
        <input type="text" id="username" v-model="loginData.tendangnhap" placeholder="Enter your username" required />
      </div>
      <div class="form-group">
        <div style="position: relative; ">
          <label for="password">Password</label>
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="loginData.password"
            placeholder="Enter password" required style="padding-right: 2.5rem;" />
          <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="toggleShowPassword"
            class="PasswordEyeIcons"></i>
        </div>
      </div>

      <button type="submit" class="btn">Login</button>

      <div class="error-message" v-if="errorMessages">{{ errorMessages }}</div>

      <div>
        <p class="text-center mt-4">
          Don't have an account? <router-link to="/register">Register</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore} from '@/stores/authStore.stores'
import userService from '@/services/user.service';

const loginData = reactive({
  tendangnhap: "",
  password: "",
});

const showPassword = ref(false);
const errorMessages = ref("");

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await userService.login(loginData);
    const token = response.data.token;

    const result = await userService.getUserByUsername(loginData.tendangnhap);
    const hoten = result.data.hoten;
    const isAdmin = loginData.tendangnhap === "admin";

    authStore.login({token, hoten, isAdmin})

    router.push("/")
  } catch (error) {
    console.error(error)
    errorMessages.value = "Thông tin đăng nhập không chính xác"
  }
}

function toggleShowPassword () {
  showPassword.value = !showPassword.value;
}
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

.PasswordEyeIcons {
  position: absolute;
  top: 70%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}
</style>