<template>
    <div class="word-Scramble-game">
        <div class="content">
            <h1>Word Scramble</h1>
            <div class="game-container">
                <p class="label"><strong>Scrambled Word:</strong></p>
                <div class="scramble-letters">
                    <div class="letter" v-for="(char, i) in scrambleWord.split('')" :key="i">
                        {{ char }}
                    </div>
                </div>

                <div class="suggest"><strong>Hint:</strong> {{ suggest }}</div>

                <input class="answer-input" v-model="userInput" @keyup.enter="checkAnswer"
                    placeholder="Type your answer here..." />

                <div class="actions">
                    <button class="btn check" @click="checkAnswer">Check</button>
                    <button class="btn next" @click="nextWord"
                        :disabled="!isCorrect || index === savedWords.length - 1">
                        Next
                    </button>
                </div>

                <p v-if="message" :class="['result-message', isCorrect ? 'success' : 'error']">
                    {{ message }}
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
import userSaveWordService from '@/services/userSaveWord.service';
import dictionaryService from '@/services/dictionary.service';

export default {
    components: {
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
                this.message = "Correct";
                this.isCorrect = true;
            }
            else {
                this.message = 'Wrong';
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
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
    background-color: #f0f2f5;
    min-height: 100vh;
    box-sizing: border-box;
}

.content {
    background: #ffffff;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    box-sizing: border-box;
}

h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 30px;
    color: #2c3e50;
}

.label {
    font-size: 18px;
    color: #333;
    margin-bottom: 8px;
}

.scramble-letters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 10px 0 20px 0;
}

.letter {
    padding: 12px 16px;
    border: 2px solid #1877f2;
    background-color: #e8f0fe;
    font-size: 20px;
    font-weight: bold;
    border-radius: 8px;
    color: #2c3e50;
}

.suggest {
    font-size: 16px;
    margin: 10px 0 20px 0;
    color: #666;
}

.answer-input {
    padding: 12px 16px;
    width: 100%;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
    box-sizing: border-box;
}

.actions {
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.btn {
    flex: 1;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.check {
    background-color: #28a745;
    color: white;
}

.check:hover {
    background-color: #218838;
}

.next {
    background-color: #007bff;
    color: white;
}

.next:hover {
    background-color: #0069d9;
}

.next:disabled {
    background-color: #a3c1ee;
    cursor: not-allowed;
}

.result-message {
    margin-top: 20px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
}

.success {
    color: #28a745;
}

.error {
    color: #dc3545;
}
</style>
