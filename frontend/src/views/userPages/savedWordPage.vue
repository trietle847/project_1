<template>
    <div class="saved-word-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Dánh sách các từ đã lưu</h1>
            <div class="cards-container">
                <div class="word-card" v-for="(result, index) in results" :key="index" >
                    <h2 class="text-xl font-semibold text-blue-600">{{ result }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import userSaveWordService from '@/services/userSaveWord.service';
export default {
    name: 'SavedWordPage',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            results: [],
        };
    },
    mounted() {
        this.fetchData();
    },
    methods : {
        async fetchData() {
            try {
                const response = await userSaveWordService.getSavedWords();
                this.results = response.data;
                console.log(this.results);
            } catch (error) {
                console.error('Error fetching saved words:', error);
            }
        },
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
    bottom: 0;
}
</style>
