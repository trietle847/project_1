<template>
    <div class="flashcard" :class="{ flipped: isFlipped }" @click="flipCard">
        <div class="flashcard-inner">
            <div class="flashcard-front">
                <h2>{{ word.word }}</h2>
            </div>

            <div class="flashcard-back">
                <p><strong>Nghĩa Anh:</strong> {{ word.meanings[0]?.english }}</p>
                <p><strong>Nghĩa Việt:</strong> {{ word.meanings[0]?.vietnamese }}</p>
                <p><strong>Ví dụ:<br></strong> <span v-html="word.examples.join('<br>')"></span></p>
                <p><strong>Đồng nghĩa:</strong> {{ word.synonyms.join(', ') }}</p>
                <p><strong>Trái nghĩa:</strong> {{ word.antonyms.join(', ') }}</p>
                <p><strong>Chủ đề:</strong> {{ word.topics.join(', ') }}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        word: Object,
    },
    data() {
        return {
            isFlipped: false,
        }
    },
    watch:{
        word() {
            this.isFlipped = false;
        }
    },  
    methods: {
        flipCard() {
            this.isFlipped = !this.isFlipped
        }
    }
}
</script>

<style scoped>
.flashcard {
    width: 72%;
    height: 480px;
    margin: 10px auto;
    cursor: pointer;
}



.prevCard {
    left: 18%;
}

.nextCard {
    right: 20%;
}

.flashcard-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
}

.flashcard.flipped .flashcard-inner {
    transform: rotateY(180deg);
}

.flashcard-front,
.flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background: white;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 10px;
}

.flashcard-front {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flashcard-back {
    transform: rotateY(180deg);

    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>