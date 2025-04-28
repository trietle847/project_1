<template>
  <div class="admin-page">
    <Navbar />
    <Sidebar />
    <div class="content">
      <h1>Admin Dashboard</h1>
      <!-- Nội dung trang admin -->
    </div>
  </div>
</template>


<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';

export default {
    components: {
        Navbar,
        Sidebar
    },
    methods: {
        manageUsers() {
            console.log("Navigating to user management...");
            // Add navigation or logic for managing users
        },
        manageContent() {
            console.log("Navigating to content management...");
            // Add navigation or logic for managing content
        },
    },
};
</script>

<style scoped>
.admin-page {
    display: flex;
    min-height: 100vh;
    flex-direction: column;  /* Để navbar nằm trên cùng */
}

.content {
    display: flex;
    flex: 1;
    padding: 20px;
    background-color: #f8f9fa;
}

.sidebar {
    position: fixed;
    top: 75px; /* Cách navbar */
    left: 0;
    width: 250px;
    height: calc(100vh - 75px); /* Đảm bảo sidebar phủ hết chiều cao màn hình */
    background-color: #f8f9fa;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    padding: 20px;
}

.sidebar h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar ul li {
    padding: 10px 15px;
    margin-bottom: 10px;
    background-color: #e9ecef;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.sidebar ul li:hover {
    background-color: #007bff;
    color: white;
}

.content {
    margin-left: 250px; 
    margin-top: 75px;
    padding: 20px;
    background-color: #ffffff;
}
</style>
