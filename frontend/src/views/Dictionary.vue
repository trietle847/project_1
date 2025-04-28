<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">📘 Danh sách từ vựng</h1>

        <div v-if="loading" class="text-gray-500">Đang tải...</div>
        <div v-else-if="error" class="text-red-500">Lỗi: {{ error }}</div>

        <ul v-else class="space-y-4">
            <li v-for="(word, index) in words" :key="index" class="p-4 border rounded-lg shadow">
                <h2 class="text-xl font-semibold text-blue-600">{{ word.word }}</h2>
                <p><strong>Phonetics:</strong> {{ word.phonetics }}</p>
                <p><strong>Nghĩa Anh:</strong> {{ word.meanings[0]?.english }}</p>
                <p><strong>Nghĩa Việt:</strong> {{ word.meanings[0]?.vietnamese }}</p>
                <p><strong>Ví dụ:</strong> {{ word.examples.join("; ") }}</p>
                <p><strong>Đồng nghĩa:</strong> {{ word.synonyms.join(", ") }}</p>
                <p><strong>Trái nghĩa:</strong> {{ word.antonyms.join(", ") }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dictionaryService from '@/services/dictionary.service';

const words = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const res = await dictionaryService.getAllDictionary();
        words.value = res.data;
    } catch (err) {
        error.value = err.message || 'Lỗi khi tải dữ liệu';
    } finally {
        loading.value = false;
    }
});
</script>
