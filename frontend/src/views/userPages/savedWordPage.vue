<template>
    <div class="saved-word-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Dánh sách các từ đã lưu</h1>
            <div class="cards-container">
                <div class="word-card" v-for="(result, index) in results" :key="index">
                    <h2 class="text-xl font-semibold text-blue-600">{{ result.word }}</h2>
                    <p><strong>Phonetics:</strong> {{ result.phonetics }}</p>
                    <p><strong>Nghĩa Anh:</strong> {{ result.meanings[0]?.english }}</p>
                    <p><strong>Nghĩa Việt:</strong> {{ result.meanings[0]?.vietnamese }}</p>
                    <p><strong>Ví dụ:<br></strong> <span v-html="result.examples.join('<br>')"></span></p>
                    <p><strong>Đồng nghĩa:</strong> {{ result.synonyms.join(', ') }}</p>
                    <p><strong>Trái nghĩa:</strong> {{ result.antonyms.join(', ') }}</p>
                    <p><strong>Chủ đề:</strong> {{ result.topics.join(', ') }}</p>
                    <div class="action">
                        <button class="btn-submit" @click="deleteSavedWord(result.word)">Bỏ lưu</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import userSaveWordService from '@/services/userSaveWord.service';
import dictionaryService from '@/services/dictionary.service';

export default {
    name: 'SavedWordPage',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            results: [],
            selectedWord: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await userSaveWordService.getSavedWords();
                const words = response.data;

                const vocabularyResult = [];
                for (const word of words) {
                    try {
                        const res = await dictionaryService.getAVocabulary(word);
                        if (Array.isArray(res.data)) {
                            vocabularyResult.push(...res.data);
                        } else {
                            vocabularyResult.push(res.data);
                        }
                    } catch (error) {
                        console.error("không lấy được từ", error)
                    }
                }
                this.results = vocabularyResult;
                console.log(this.results)
            } catch (error) {
                console.error('Error fetching saved words:', error);
            }
        },

        async deleteSavedWord(word) {
            try {
                await userSaveWordService.deleteSavedWord(word)
                this.fetchData();
                alert("Xóa thành công")
            } catch (error) {
                console.error('Lỗi khi xóa', error)
            }
        }
    }

};
</script>

<style scoped>
.saved-word-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    right: 10px;
    top: 0;
}

.word-card {
    text-align: left;
    background-color: #f5f5f5;
    padding: 12px 18px;
    margin-top: 10px;
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

/* .word-card:hover {
    background-color: #dce8ff;
    transform: scale(1.02);
} */

.btn-submit {
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-submit:hover {
    opacity: 0.8;
}
</style>
