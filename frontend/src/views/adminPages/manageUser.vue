<template>
    <div class="admin-page">
        <div class="content">
            <h1 class="title">Admin Dashboard</h1>
            <div class="user-management">
                <h2>Danh sách người dùng</h2>
                <table class="user-table">
                    <thead>
                        <tr>
                            <th>Họ tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.tendangnhap">
                            <td>{{ user.hoten }}</td>
                            <td>{{ user.tendangnhap }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <div class="action">
                                    <button class="btn edit">Sửa</button>
                                    <button class="btn delete">Xóa</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>


<script>

import userService from '@/services/user.service';
export default {
    name: "",
    data() {
        return {
            users: [],
        }
    },
    mounted() {
        this.fetchUser()
    },
    methods: {
        async fetchUser() {
            try {
                const response = await userService.getAllUser();
                this.users = response.data;
            } catch (error) {
                console.log("lỗi khi lấy người dùng:", error)
            }
        },

    },
};
</script>

<style scoped>
.admin-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: #f2f4f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.content {
    display: flex;
    flex: 1;
    padding: 20px;
    margin-top: 75px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    justify-content: center;
    justify-content: flex-start;
    flex-direction: column;
}

.title {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.user-management {
    margin-top: 20px;
}

.user-management h2 {
    font-size: 22px;
    margin-bottom: 16px;
    color: #2c3e50;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.user-table th {
    background-color: #3498db;
    color: #fff;
    padding: 12px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
}

.user-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ecf0f1;
    font-size: 14px;
    color: #444;
}

.user-table tr:last-child td {
    border-bottom: none;
}

.action {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.btn {
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn.edit {
    background-color: #2ecc71;
    color: #fff;
}

.btn.edit:hover {
    background-color: #27ae60;
}

.btn.delete {
    background-color: #e74c3c;
    color: #fff;
}

.btn.delete:hover {
    background-color: #c0392b;
}
</style>
