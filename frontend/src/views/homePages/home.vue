<template>
    <div class="home-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1 class="title">English Dictionary</h1>
            <div class="search-container">
                <input type="text" v-model="searchQuery" placeholder="Search for a word..." @input="searchWord" />
                <button @click="searchWord">Search</button>
            </div>

            <div class="results-container" v-if="results">
                <h2 class="title">Results for "{{ searchQuery }}":</h2>
                <div class="cards-container">
                    <div class="word-card" v-for="(result, index) in results" :key="index"
                        @click="showDetailWord(result)">
                        <h2 class="text-xl font-semibold text-blue-600">{{ result.word }}</h2>
                        <p><strong>Nghĩa Anh:</strong> {{ result.meanings[0]?.english }}</p>
                        <p><strong>Nghĩa Việt:</strong> {{ result.meanings[0]?.vietnamese }}</p>
                    </div>
                </div>
            </div>
            <div v-else-if="searchQuery && !results">
                <p class="title">No results found for "{{ searchQuery }}".</p>
            </div>

            <!-- component wordDetail -->
            <WordDetail v-if="selectedWord" :word="selectedWord" @close="selectedWord = null" />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import WordDetail from '@/components/wordDetail.vue';
import dictionaryService from '@/services/dictionary.service';
export default {
    components: {
        Navbar,
        Sidebar,
        WordDetail,
    },
    data() {
        return {
            searchQuery: "",
            results: null,
            selectedWord: null,
        };
    },
    methods: {
        async searchWord() {
            if (!this.searchQuery.trim()) {
                this.results = null;
                return;
            }

            try {
                const response = await dictionaryService.getAVocabulary(this.searchQuery.trim())
                this.results = Array.isArray(response.data) ? response.data : [response.data];
            } catch (error) {
                console.error("lỗi khi tải dữ liệu:", error);
                this.results = null;
            }
        },
        showDetailWord(word) {
            console.log("Selected word:", word);
            this.selectedWord = word;
        }
    },
};
</script>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* min-height: calc(100vh - 60px); */
    min-height: 100vh;
    /* margin: 80px auto 0;
    padding: 20px;
    padding-left: 240px;
    text-align: center; */
}

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

.search-container {
    margin: 20px 0;
    text-align: center;
}

.title {
    text-align: center;
}
input {
    padding: 20px;
    font-size: 20px;
    width: 300px;
    margin-right: 10px;
}

button {
    padding: 20px 25px;
    font-size: 20px;
}

.results-container {
    margin-top: 20px;
    width: 100%;
    padding-bottom: 10px;
}

.cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 10px;
}

.word-card {
    text-align: left;
    background-color: #f5f5f5;
    padding: 12px 18px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    font-weight: 500;
    color: #333;
    min-height: 60px;
    width: 100%;
    transition: all 0.3s ease;
    cursor: pointer;
    width: 85%;
}

.word-card:hover {
    background-color: #dce8ff;
    transform: scale(1.02);
}
</style>
