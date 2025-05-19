<template>
    <div class="home-game-page">
        <div class="content">
            <h1 class="title">Chọn game ôn tập</h1>
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
export default {
    components: {
    }
}
</script>

<style scoped>
.home-game-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9fafb;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.content {
    background-color: #fff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 90%;
}

h1 {
    font-size: 32px;
    margin-bottom: 30px;
    color: #2c3e50;
}

.type-game {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.btn-game {
    display: block;
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
    color: #3498db;
    background-color: #ffffff;
    border: 2px solid #3498db;
    border-radius: 12px;
    text-decoration: none;
    transition: 0.3s ease;
}

.btn-game:hover {
    background-color: #3498db;
    color: #fff;
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}
</style>

