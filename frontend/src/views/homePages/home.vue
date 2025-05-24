<template>
    <div class="home-page">
        <div class="content">
            <div class="form-search">
                <h1 class="title">English Dictionary</h1>
                <div class="search-container">
                    <input type="text" v-model="searchQuery" placeholder="Search for a word..." @input="searchWord" />
                    <button @click="searchWord">Search</button>
                </div>
                <h2 class="titleResult">Results for "{{ searchQuery }}":</h2>
            </div>

            <div class="results-container" v-if="results">
                <div v-if="hasSearched && (!results || results.length === 0)">
                    <p class="noResult">No results found for "{{ searchQuery }}".</p>
                </div>
                <div class="cards-container">
                    <div class="word-card" v-for="(result, index) in results" :key="index"
                        @click="showDetailWord(result)">
                        <h2 class="text-xl font-semibold text-blue-600">{{ result.word }}</h2>
                        <p><strong>Nghĩa Anh:</strong> {{ result.meanings[0]?.english }}</p>
                        <p><strong>Nghĩa Việt:</strong> {{ result.meanings[0]?.vietnamese }}</p>
                    </div>
                </div>
            </div>

            <WordDetail v-if="selectedWord" :word="selectedWord" :isSaved="isSaved" @close="selectedWord = null"
                @save="saveWord" @unSave="unSaveWord" />
        </div>
    </div>
</template>

<script>
import WordDetail from '@/components/wordDetail.vue';
import dictionaryService from '@/services/dictionary.service';
import userSaveWordService from '@/services/userSaveWord.service';

export default {
    components: {
        WordDetail,
    },
    data() {
        return {
            searchQuery: "",
            results: null,
            selectedWord: null,
            isSaved: false,
            hasSearched: false,
        };
    },
    mounted() {
        this.inSaveWordList()
    },
    methods: {
        async searchWord() {
            this.hasSearched = true
            if (!this.searchQuery.trim()) {
                this.results = null;
                return;
            }

            try {
                const response = await dictionaryService.fetchDictionaryList(this.searchQuery.trim())
                this.results = Array.isArray(response.data) ? response.data : [response.data];
            } catch (error) {
                console.error("lỗi khi tải dữ liệu:", error);
                this.results = null;
            }
            console.log(this.results.length)
        },
        async showDetailWord(word) {
            console.log("Selected word:", word);
            this.selectedWord = word;
            this.isSaved = await this.inSaveWordList(word)
        },
        async saveWord() {
            await userSaveWordService.addSaveWord(this.selectedWord.word)
            this.isSaved = true;
            alert("Thêm từ vào danh sách từ đã lưu thành công")
        },
        async unSaveWord() {
            await userSaveWordService.deleteSavedWord(this.selectedWord.word)
            this.isSaved = false;
            alert("Xóa từ khỏi danh sách lưu thành công")
        },
        async inSaveWordList(word) {
            const savedWordList = await userSaveWordService.getSavedWords();
            console.log(savedWordList.data)
            const saved = savedWordList.data.includes(word.word)
            return saved
        }
    },
};
</script>

<style scoped>
.home-page {
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
    justify-content: center
}

.form-search {
    position: fixed;
    display: block;
    flex: 1;
    width: 100%;
    background-color: #ffffff;
    z-index: 10;
    right: 20px;
    left: 10px;
    top: 40px
}

.title {
    margin-top: 60px;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 15px;
}

.titleResult {
    margin-top: 10px;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
}

input {
    padding: 12px 18px;
    font-size: 16px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    transition: all 0.2s ease;
}

input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

button {
    padding: 12px 20px;
    font-size: 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: #2980b9;
}

.results-container {
    margin-top: 120px;
    width: 100%;
}

.cards-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px;
    margin-top: 120px;
}

.word-card {
    background-color: #f9fafc;
    padding: 16px;
    border-left: 5px solid #3498db;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    cursor: pointer;
}

.word-card:hover {
    transform: translateY(-2px);
    background-color: #eaf4ff;
}

.word-card h2 {
    margin: 0 0 8px;
    font-size: 20px;
    color: #2c3e50;
}

.word-card p {
    margin: 4px 0;
    color: #444;
    font-size: 16px;
}

.noResult {
    margin-top: 20px;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    color: #999;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
