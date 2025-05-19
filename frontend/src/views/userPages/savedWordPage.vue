<template>
    <div class="saved-word-page">
        <div class="content">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Danh sách các từ đã lưu</h1>

            <div v-if="results.length === 0" class="text-center text-gray-500">
                Bạn chưa lưu từ nào.
            </div>

            <div v-else class="cards-container">
                <div class="word-card" v-for="(result, index) in results" :key="index">
                    <h2 class="text-xl font-semibold text-blue-600 mb-1">{{ result.word }}</h2>
                    <p><strong>Phonetics:</strong> {{ result.phonetics }}</p>
                    <p><strong>Nghĩa Anh:</strong> {{ result.meanings[0]?.english }}</p>
                    <p><strong>Nghĩa Việt:</strong> {{ result.meanings[0]?.vietnamese }}</p>

                    <div v-if="result.examples?.length">
                        <p><strong>Ví dụ:</strong></p>
                        <ul class="list-disc list-inside ml-4 text-sm text-gray-700">
                            <li v-for="(ex, i) in result.examples" :key="i">{{ ex }}</li>
                        </ul>
                    </div>

                    <p v-if="result.synonyms?.length"><strong>Đồng nghĩa:</strong> {{ result.synonyms.join(', ') }}</p>
                    <p v-if="result.antonyms?.length"><strong>Trái nghĩa:</strong> {{ result.antonyms.join(', ') }}</p>
                    <p v-if="result.topics?.length"><strong>Chủ đề:</strong> {{ result.topics.join(', ') }}</p>

                    <div class="action mt-3">
                        <button class="btn-submit" @click="deleteSavedWord(result.word)">Bỏ lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script>
import userSaveWordService from '@/services/userSaveWord.service';
import dictionaryService from '@/services/dictionary.service';

export default {
    name: 'SavedWordPage',
    components: {

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
    min-height: 100vh;
    background-color: #f9fafb;
}

.content {
    flex: 1;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 75px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    position: absolute;
    left: 0;
    right: 0;
}

.cards-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

@media (min-width: 768px) {
    .cards-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1200px) {
    .cards-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

.word-card {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #f3f4f6;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    color: #333;
    transition: transform 0.2s ease;

}

.word-card:hover {
    background-color: #e5ecff;
    transform: translateY(-2px);
}

.action {
    margin-top: auto;
    /* đẩy nút xuống cuối */
    display: flex;
    justify-content: flex-end;
}

.btn-submit {
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.btn-submit:hover {
    opacity: 0.85;
}
</style>
