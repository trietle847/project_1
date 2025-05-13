<template>
    <div class="home-game-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Chọn game ôn tập</h1>
            <div class="type-game">
                <router-link to="/game/flashcard" class="btn-game">
                    🎴 Flash Card
                </router-link>
                <router-link to="/game/scramble" class="btn-game">
                    🔤 Word Scramble
                </router-link>
            </div>
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
    }
}
</script>

<style scoped>
.home-game-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    margin-top: 75px;
    margin-left: 230px;
    padding: 40px;
    background-color: #f0f2f5;
    min-height: calc(100vh - 75px);
    position: absolute;
    left: 10px;
    right: 0;
    top: 0;
    bottom: 0;
}

h1 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
    color: #2c3e50;
}

.type-game {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.btn-game {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 120px;
    font-size: 24px;
    font-weight: bold;
    background-color: #ffffff;
    border: 2px solid #3498db;
    border-radius: 12px;
    color: #3498db;
    transition: all 0.3s ease;
    text-decoration: none;
}

.btn-game:hover {
    background-color: #3498db;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
</style>
