<template>
    <div class="profile-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Thông tin tài khoản</h1>
            <div class="user-info">
                <p>Tên tài khoản: {{ user.tendangnhap }}</p>
                <p>Email: {{ user.email }}</p>
                <p>Họ tên: {{ user.hoten }}</p>
                <p>Số điện thoại: {{ user.sdt }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import userService from '@/services/user.service';

export default {
    name: 'SavedWordPage',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            user: {},
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await userService.getMe();
                this.user = response.data;
                console.log(this.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    }
}
</script>

<style scoped>
.profile-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Phần content*/
.content {
    margin-top: 75px;
    margin-left: 230px;
    padding: 20px;
    flex: 1;
    background-color: #f8f9fa;
    box-sizing: border-box;
    min-height: calc(100vh - 75px);
    position: absolute;
    left: 10px;
    right: 0px;
    top: 0;
    bottom: 0;
}
</style>