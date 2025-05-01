<template>
    <div class="admin-page">
        <Navbar />
        <Sidebar @selectPage="handleSelectPage" />
        <div class="content">
            <h1>Admin Dashboard</h1>

            <div v-if="currentPage === 'users'" class="user-management">
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

            <div v-else-if="currentPage === 'dictionary'" class="dictionary-management">
                <h2>Quản lý từ điển</h2>
                <div class="addition-form">
                    <form @submit.prevent="handleAddition">
                        <label for="">Generate vocabulary </label>
                        <input type="text" v-model="newSubject" placeholder="Enter the subject you want"
                            class="form-input" required />
                        <button type="submit" class="btn submit">Add</button>
                    </form>

                    <div class="result-form" v-if="addedWords.length ">
                        <div class="content-result"> {{ messageResult }}</div>
                        <div class="numOfResult">Đã thêm vào {{ quantity }} từ</div>

                        <div class="arraySuccess">
                            <div v-if="addedWords.length">
                                <h3>Danh sách từ đã thêm</h3>
                                <ul>
                                    <li v-for="item in addedWords" :key="item.word"> {{ item.word }}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="arrayFail">
                            <div v-if="failedWords.length">
                                <h3>Danh sách từ không thêm được</h3>
                                <ul>
                                    <li v-for="item in failedWords" :key="item.word"> {{ item.word }}: {{ item.reason }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import userService from '@/services/user.service';
import generateByAIService from '@/services/generateByAI.service';

export default {
    name: "AdminPage",
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            currentPage: "",
            users: [],
            newSubject: "",
            messageResult: "",
            quantity: 0,
            addedWords: [],
            failedWords: [],
        }
    },
    methods: {
        async handleSelectPage(page) {
            this.currentPage = page

            if (page === "users") {
                await this.fetchUser();
            }
        },

        async fetchUser() {
            try {
                const response = await userService.getAllUser();
                this.users = response.data;
            } catch (error) {
                console.log("lỗi khi lấy người dùng:", error)
            }
        },

        async handleAddition() {
            console.log("Thêm chủ đề:", this.newSubject);
            try {
                const response = await generateByAIService.generateVocabulary({
                    topic: this.newSubject
                });

                if (response && response.data) {
                    console.log("Thêm chủ đề thành công:", response.data);
                    this.messageResult = response.data.message;
                    this.quantity = response.data.inserted;
                    this.addedWords = response.data.success || [];
                    this.failedWords = response.data.failed || [];
                    this.newSubject = ""; // Reset input field
                }
            } catch (error) {
                console.log("Lỗi khi thêm chủ đề:", error);
            }
        }


    },
};
</script>

<style scoped>
.admin-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* Phần content*/
.content {
    margin-top: 75px;
    margin-left: 250px;
    padding: 20px;
    flex: 1;
    background-color: #f8f9fa;
    box-sizing: border-box;
    min-height: calc(100vh - 75px);
    position: absolute;
    left: 10px;
    right: 10px;
    top: 0;
    bottom: 0;
}

/* Tiêu đề trang */
h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
    color: #333;
}

/* Quản lý user */
.user-management {
    margin-top: 20px;
}

/* Bảng danh sách user */
.user-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

/* Header bảng */
.user-table th {
    background-color: #007bff;
    color: white;
    padding: 12px;
    text-align: center;
    font-weight: bold;
}

/* Body bảng */
.user-table td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
}

/* Đường viền */
.user-table th,
.user-table td {
    border: 1px solid #dee2e6;
}

/* Nhóm nút Edit/Delete */
.action {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

}

/* Nút chung */
.btn {
    padding: 6px 12px;
    width: 80px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 14px;
}

/* Nút sửa */
.btn.edit {
    background-color: #1dc71a;
    color: white;
}

.btn.edit:hover {
    opacity: 0.8;
    ;
}

/* Nút xóa */
.btn.delete {
    background-color: #dc3545;
    color: white;
}

.btn.delete:hover {
    opacity: 0.8;
}

.addition-form {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}

.addition-form label {
    display: block;
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 10px;
}


.form-input {
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 250px;
    box-sizing: border-box;
}

.btn.submit {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn.submit:hover {
    background-color: #0056b3;
}

</style>