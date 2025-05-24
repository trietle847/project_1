<template>
    <div class="register-container">
        <h1>Register</h1>
        <form @submit.prevent="handleRegister">
            <div class="form-group">
                <label for="hoten">Full name</label>
                <input type="text" id="hoten" v-model="registerData.hoten" placeholder="Enter your username" required />


                <label for="username">Username</label>
                <input type="text" id="username" v-model="registerData.tendangnhap" placeholder="Enter your username"
                    required />

                <label for="email">Email</label>
                <input type="email" id="email" v-model="registerData.email" placeholder="Enter your email" required />

                <div style="position: relative; ">
                    <label for="password">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="registerData.password"
                        placeholder="Enter password" required style="padding-right: 2.5rem;" />
                    <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="toggleShowPassword"
                        class="PasswordEyeIcons"></i>
                </div>

                <div style="position: relative; ">
                    <label for="password">Confirm Password</label>
                    <input :type="showPassword ? 'text' : 'password'" id="confirm-password" v-model="confirmPassword"
                        placeholder="Enter Confirm password" required style="padding-right: 2.5rem;" />
                    <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="toggleShowPassword"
                        class="PasswordEyeIcons"></i>
                </div>

                <label for="sdt">Phone</label>
                <input type="text" id="sdt" v-model="registerData.sdt" placeholder="Enter your phone" required>
            </div>
            <button type="submit" class="btn">Register</button>
            <div>
                <p class="text-center mt-4">
                    <router-link to="/login">Already have an account?</router-link>
                </p>
            </div>
        </form>
    </div>
</template>

<script>

import userService from '@/services/user.service';

export default {
    name: "Register",
    data() {
        return {
            registerData: {
                hoten: "",
                tendangnhap: "",
                email: "",
                password: "",
                sdt: "",
            },
            confirmPassword: "",
            showPassword: true,
        };
    },
    methods: {
        async handleRegister() {
            if (this.registerData.password !== this.confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const response = await userService.createUser(this.registerData);
            alert("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");

            this.$router.push("/login");
        },
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }

    },
};
</script>

<style scoped>
.register-container {
    width: 400px;
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
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #218838;
}
.PasswordEyeIcons {
    position: absolute;
    top: 70%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: #555;
}
</style>