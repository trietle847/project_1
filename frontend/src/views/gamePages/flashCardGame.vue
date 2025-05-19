<template>
    <div class="flash-card-game">
        <div class="content">
            <h1>Flash Card</h1>
            <div class="flashCard-container">
                <div class="navigation">
                    <button class="nav-btn" @click="prevCard" :disabled="index === 0">← Trước</button>
                    <span class="location">{{ index + 1 }} / {{ results.length }}</span>
                    <button class="nav-btn" @click="nextCard" :disabled="index === results.length - 1">Sau →</button>
                </div>

                <div class="card-wrapper" v-if="results.length > 0">
                    <FlashCard :word="results[index]" />
                </div>
            </div>
            <div class="wordScrambleGame" v-if="results.length === index + 1"><router-link to="/game/scramble">Chuyển
                    sang game word scramble game</router-link></div>
        </div>
    </div>
</template>

<script>
import FlashCard from '@/components/flashCard.vue';
import userSaveWordService from '@/services/userSaveWord.service';
import dictionaryService from '@/services/dictionary.service';

export default {
    components: {
        FlashCard,
    },
    data() {
        return {
            results: [],
            index: 0,
        }
    },
    mounted() {
        this.getSavedWordDetail()
    },
    methods: {
        async getSavedWordDetail() {
            try {
                const savedList = await userSaveWordService.getSavedWords();
                const words = savedList.data;

                const wordDetails = [];
                for (const word of words) {
                    const res = await dictionaryService.getAVocabulary(word);
                    wordDetails.push(...res.data)
                }

                this.results = wordDetails;
            } catch (error) {
                console.error("Lỗi khi tải từ đã lưu:", error);
            }
        },

        nextCard() {
            if (this.index < this.results.length - 1) {
                this.index++;
            }
        },
        prevCard() {
            if (this.index > 0) {
                this.index--;
            }
        },
    }
}
</script>

<style scoped>
.flash-card-game {
    display: flex;
    justify-content: center;
    background-color: #f0f2f5;
    min-height: 100vh;
    box-sizing: border-box;
}

.content {
    background: #fff;
    padding: 20px;
    margin-top: 75px;
    /* border-radius: 16px; */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 10px;
    color: #2c3e50;
}

.flashCard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.card-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.navigation {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.location {
    font-size: 16px;
    color: #555;
    font-weight: 500;
}

.nav-btn {
    padding: 10px 20px;
    border-radius: 8px;
    background-color: #1877f2;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.nav-btn:disabled {
    background-color: #c3d3ec;
    cursor: not-allowed;
}

.nav-btn:hover:not(:disabled) {
    background-color: #155ab6;
}

.wordScrambleGame {
    font-size: 1rem;
    color: #3b82f6;
    text-align: center;
}

.wordScrambleGame a {
    color: #2563eb;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
}

.wordScrambleGame a:hover {
    color: #1e40af;
    text-decoration: underline;
}
</style>
