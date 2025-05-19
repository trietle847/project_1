<template>
    <div class="admin-page">
        <div class="content">
            <div class="dictionary-management">

                <div class="addition-form">
                    <h2>Quản lý từ điển</h2>
                    <p>Chức năng này sẽ giúp bạn thêm các từ mới theo chủ đề vào từ điển của mình.</p>
                    <form @submit.prevent="handleAddition">
                        <label for="">Generate vocabulary </label>
                        <input type="text" v-model="newSubject" placeholder="Enter the subject you want"
                            class="form-input" required />
                        <button type="submit" class="btn submit">Add</button>
                    </form>

                    <div class="result-form" v-if="addedWords.length ">
                        <div class="content-result"> {{ messageResult }}</div>
                        <div class="numOfResult">Đã thêm vào {{ quantity }} từ</div>

                        <div class="arraySuccess">
                            <div v-if="addedWords.length">
                                <h3>Danh sách từ đã thêm</h3>
                                <ul>
                                    <li v-for="item in addedWords" :key="item.word"> {{ item.word }}</li>
                                </ul>
                            </div>
                        </div>

                        <div class="arrayFail">
                            <div v-if="failedWords.length">
                                <h3>Danh sách từ không thêm được</h3>
                                <ul>
                                    <li v-for="item in failedWords" :key="item.word"> {{ item.word }}: {{ item.reason }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="update-dictionary">
                    <h2>Cập nhật từ điển</h2>
                    <p>Chức năng này sẽ cập nhật từ điển của bạn với các từ mới nhất.</p>
                    <button class="btn submit " @click="startAutoUpdate" :disabled="isUpdating">Cập nhật từ
                        động</button>
                    <button class="btn submit " @click="stopAutoUpadte" :disabled="!isUpdating">Dừng cập nhật</button>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
import generateByAIService from '@/services/generateByAI.service';

export default {
    name: "manageDictionary",
    components: {

    },
    data() {
        return {
            newSubject: "",
            messageResult: "",
            quantity: 0,
            addedWords: [],
            failedWords: [],
            isUpdating: false,
            updateIntervalId: null,
        }
    },
    methods: {
        async handleAddition() {
            console.log("Thêm chủ đề:", this.newSubject);
            try {
                const response = await generateByAIService.generateVocabulary({
                    topic: this.newSubject
                });

                if (response && response.data) {
                    console.log("Thêm chủ đề thành công:", response.data);
                    this.messageResult = response.data.message;
                    this.quantity = response.data.inserted;
                    this.addedWords = response.data.success || [];
                    this.failedWords = response.data.failed || [];
                    this.newSubject = ""; // Reset input field
                }
            } catch (error) {
                console.log("Lỗi khi thêm chủ đề:", error);
            }
        },

        async handleUpdateBatch() {
            try {
                const response = await generateByAIService.updateVocabulary();
                if (response && response.data) {
                    console.log("Đã cập nhật một batch:", response.data)
                }
            } catch (error) {
                console.log(error)
            }
        },

        startAutoUpdate() {
            if (this.isUpdating) return ;
            this.isUpdating = true;
            this.handleUpdateBatch()

            this.updateIntervalId = setInterval(() => {
                this.handleUpdateBatch();
            }, 2*60*1000)
        },

        stopAutoUpadte() {
            if (this.updateIntervalId) {
                clearInterval(this.updateIntervalId);
                this.updateIntervalId = null;
                this.isUpdating = false;
            }
        }


    },
};
</script>

<style scoped>
.admin-page {
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
    padding-left: 80px;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    justify-content: center;
    justify-content: flex-start;
    flex-direction: column;
}

.dictionary-management {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

h2 {
    font-size: 24px;
    color: #2c3e50;
    margin-bottom: 8px;
}

p {
    font-size: 14px;
    color: #555;
    margin-bottom: 20px;
}

/* Form thêm từ */
.addition-form form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
}

label {
    font-weight: 600;
    font-size: 16px;
}

.form-input {
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-color 0.3s;
}

.form-input:focus {
    border-color: #007bff;
}

.btn.submit {
    width: fit-content;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.btn.submit:disabled {
    background-color: #a0c9ff;
    cursor: not-allowed;
}

.btn.submit:hover:not(:disabled) {
    background-color: #0056b3;
}

/* Kết quả */
.result-form {
    margin-top: 20px;
    background-color: #f0f8ff;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #007bff;
}

.content-result {
    font-weight: bold;
    margin-bottom: 10px;
    color: #2c3e50;
}

.numOfResult {
    margin-bottom: 10px;
    color: #444;
}

/* Danh sách */
.arraySuccess,
.arrayFail {
    margin-top: 10px;
}

.arraySuccess h3,
.arrayFail h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #2c3e50;
}

.arraySuccess ul,
.arrayFail ul {
    list-style-type: disc;
    padding-left: 20px;
    color: #333;
    font-size: 14px;
}

/* Update dictionary section */
.update-dictionary {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 400px;
}
</style>
