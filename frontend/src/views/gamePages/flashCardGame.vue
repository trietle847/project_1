<template>
    <div class="flash-card-game">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Flash Card</h1>
            <span class="location">{{ index+1 }} / {{ results.length }}</span>
            <div class="flashCard-container">
                <!-- <FlashCard v-for="(wordGroup, index) in results" :key="index" :word="wordGroup" /> -->
                <FlashCard v-if="results.length > 0" :word="results[index]" />
                <button class="prevCard" @click="prevCard" :disabled="index === 0">Trước</button>
                <button class="nextCard" @click="nextCard" :disabled="index === results.length - 1">Sau</button>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import FlashCard from '@/components/flashCard.vue';
import userSaveWordService from '@/services/userSaveWord.service';
import dictionaryService from '@/services/dictionary.service';

export default {
    components: {
        Navbar,
        Sidebar,
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
                console.log(wordDetails)

                return this.results = wordDetails;

            } catch (error) {
                console.error("Lỗi khi tải từ đã lưu:", error);
            }
        },

        nextCard() {
            if (this.index < this.results.length-1) {
                this.index ++;
            }
        },
        prevCard() {
            if (this.index > 0) {
                this.index --;
            }
        },

    }

}
</script>

<style scoped>
.flash-card-game {
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
    position: relative;
}

h1 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
    color: #2c3e50;
}
.location {
    position: absolute;
    top: 100px;
    left: 50%;
    font-size: 18px;
}

.flashCard-container {
    position: relative;
}

.nextCard,
.prevCard {
    position: absolute;
    top: 50%;
    cursor: pointer;
}

.nextCard {
    right: 10%;
}

.prevCard {
    left: 10%;
}
</style>