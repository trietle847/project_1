<template>
    <div class="word-Scramble-game">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Word Scramble</h1>
            <div class="game-container">
                <p><strong>Scramble word:</strong></p>
                <div class="scramble-letters">
                    <div class="letter" v-for="(char, i) in scrambleWord.split('')" :key="i">
                        {{ char }}
                    </div>
                </div>
                <div class="suggest">Suggest: {{ suggest }}</div>
                <input v-model="userInput" @keyup.enter="checkAnswer" placeholder="Write your answer">
                <button @click="checkAnswer" class="checkAnswer">Check</button>
                <p v-if="message" :class="{ success: isCorrect, error: !isCorrect }"> {{ message }}</p>
                <button @click="nextWord" class="nextWord" :disabled="!isCorrect || index === savedWords.length - 1">
                    Next</button>
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
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            savedWords: [],
            index: 0,
            scrambleWord: "",
            userInput: "",
            message: "",
            isCorrect: false,
            suggest: "",
        }
    },
    computed: {
        currentWord() {
            return this.savedWords[this.index];
        },

    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const response = await userSaveWordService.getSavedWords();
            console.log(response.data)
            this.savedWords = response.data;
            if (this.savedWords.length > 0) {
                this.generateScrambleWord();
            }
        },
        async generateScrambleWord() {
            const word = this.currentWord;
            this.scrambleWord = this.suffleWord(word);
            this.userInput = "";
            this.message = "";

            const detailWord = await dictionaryService.getAVocabulary(word);
            // console.log(detailWord.data[0])
            this.suggest = detailWord.data[0].meanings[0].vietnamese
            console.log(this.suggest)

        },
        suffleWord(word) {
            const chars = word.split("");
            for (let i = chars.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [chars[i], chars[j]] = [chars[j], chars[i]];
            }
            return chars.join("");
        },
        checkAnswer() {
            if (this.userInput.trim().toLowerCase() === this.currentWord.trim().toLowerCase()) {
                this.message = "correct";
                this.isCorrect = true;
            }
            else {
                this.message = 'wrong';
                this.isCorrect = false;
            }
        },
        nextWord() {
            if (this.index < this.savedWords.length) {
                this.index++;
                this.isCorrect = false;
                this.generateScrambleWord();
            }
            else {
                this.scrambleWord = "";
                this.message = "Complete"
            }
        },
    }
}
</script>

<style scoped>
.word-Scramble-game {
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
}

h1 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
    color: #2c3e50;
}

.scramble-letters {
    display: flex;
    gap: 8px;
    margin: 10px 0;
}

.game-container {
    display: flex;
    flex-direction: column;
}

button {
    margin-top: 20px;
    padding-top: 10px;
}

.letter {
    padding: 10px;
    border: 1px solid #ccc;
    font-size: 20px;
    font-weight: bold;
    background-color: #f5f5f5;
    border-radius: 4px;
}
</style>