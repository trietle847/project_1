<template>
    <div class="profile-page">

        <div class="content">
            <h1>Thông tin tài khoản</h1>
            <div class="card-info">
                <div class="user-info">
                    <p>Tên tài khoản: {{ user.tendangnhap }}</p>
                    <p>Email: {{ user.email }}</p>
                    <p>Họ tên: {{ user.hoten }}</p>
                    <p>Số điện thoại: {{ user.sdt }}</p>

                    <div class="action">
                        <button class="btn btn-primary" @click="editingUser = user">Sửa tài khoản</button>
                    </div>
                </div>
            </div>
            <EditUser v-if="editingUser" :user="editingUser" @close="editingUser = null" @updated="fetchUser" />
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import EditUser from '@/components/editUser.vue';

export default {
    name: 'SavedWordPage',
    components: {
        EditUser,
    },
    data() {
        return {
            user: {},
            editingUser: null,
        };
    },
    mounted() {
        this.fetchUser();
    },
    methods: {
        async fetchUser() {
            try {
                const response = await userService.getMe();
                this.user = response.data;
                console.log(this.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        },
    }
}
</script>

<style scoped>
.profile-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f2f4f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Phần content*/
.content {
    margin-top: 75px;
    padding: 20px;
    flex: 1;
    background-color: #f8f9fa;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0px;
    top: 0;

}

.card-info {
    display: flex;
    justify-content: center;
}

.user-info {
    padding: 30px 50px;
    border: 1px solid #000;
    border-radius: 5px;
    margin-top: 80px;
    width: 50%;
}

.user-info p {
    font-size: 16px;
    color: #333;
    margin: 8px 0;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
}

.action {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
</style>