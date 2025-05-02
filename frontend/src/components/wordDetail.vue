<template>
    <div class="word-detail">
        <div v-drag class="card">
            <h2 class="text-2xl font-bold title"> {{ word.word }}</h2>
            <p><strong>Phonetics:</strong> {{ word.phonetics }}</p>
            <p><strong>Nghĩa Anh:</strong> {{ word.meanings[0]?.english }}</p>
            <p><strong>Nghĩa Việt:</strong> {{ word.meanings[0]?.vietnamese }}</p>
            <p><strong>Ví dụ:<br></strong> <span v-html="word.examples.join('<br>')"></span></p>
            <p><strong>Đồng nghĩa:</strong> {{ word.synonyms.join(', ') }}</p>
            <p><strong>Trái nghĩa:</strong> {{ word.antonyms.join(', ') }}</p>
            <p><strong>Chủ đề:</strong> {{ word.topics.join(', ') }}</p>

            <button @click="$emit('close')" class="btn btn-primary mt-2">
                Đóng
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "WordDetail",
    props: {
        word: {
            type: Object,
            required: true,
        },
    },
}
</script>
<style scoped>
.word-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    /* margin-left: 240px; */
}

.word-detail>div {
    background-color: white;
    padding: 20px;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.card {
    text-align: left;
    position: absolute;
    cursor: move;

}

.title {
    text-align: center;
}
</style>
