<template>
  <div class="sidebar">
    <!-- <h2>Admin Panel</h2> -->
    <ul>
      <li @click="$emit('selectPage', 'users')">Manage Users</li>
      <li @click="$emit('selectPage', 'dictionary')">Manage Dictionary</li>
      </ul>
  </div>
</template>
<script>
export default {
  name: " Sidebar", }; </script>

        <style scoped>
          .sidebar {
            position: fixed;
            top: 75px;
            left: 0;
            width: 250px;
            background-color: #f8f9fa;
            padding: 20px;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
            height: calc(100vh - 75px);
            overflow-y: auto;
            z-index: 1000;
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
        </style>
