<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <div class="form-group">
                <label for="hoten">Full name</label>
                <input type="text" id="hoten" v-model="editData.hoten" placeholder="Enter full name" required />

                <label for="username">Username</label>
                <input type="text" id="username" v-model="editData.tendangnhap" placeholder="Enter username" disabled />

                <label for="email">Email</label>
                <input type="email" id="email" v-model="editData.email" placeholder="Enter email" required />

                <div style="position: relative; ">
                    <label for="password">Password</label>
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="editData.password"
                        placeholder="Enter password" required style="padding-right: 2.5rem;" />
                    <i :class="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" @click="toggleShowPassword"
                        class="PasswordEyeIcons"></i>
                </div>


                <!-- <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" v-model="editData.confirmPass"
                    placeholder="Confirm password" required /> -->

                <label for="sdt">Phone</label>
                <input type="text" id="sdt" v-model="editData.sdt" placeholder="Enter phone" required>

                <div class="button-group">
                    <button @click="editUser" class="submit">Save</button>
                    <button @click="$emit('close')" class="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import userService from '@/services/user.service'

export default {
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            editData: {},
            showPassword: false,
        }
    },
    mounted() {
        this.editData = { ...this.user };
    },

    methods: {
        async editUser() {
            try {
                await userService.update(this.editData._id, this.editData);
                alert("Cập nhật thành công");
                this.$emit("updated")
                this.$emit("close")
            } catch (error) {
                console.error("Lỗi khi cập nhật:", error);
            }
        },

        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        }
    }
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 12px;
    width: 500px;
    max-width: 90%;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.form-group label {
    display: block;
    margin-top: 1rem;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-top: 0.3rem;
}

.button-group {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.submit {
    background-color: #2ecc71;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.submit:hover {
    background-color: #27ae60;
}

.cancel {
    background-color: #e74c3c;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.cancel:hover {
    background-color: #c0392b;
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