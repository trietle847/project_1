<template>
    <div class="contact-page">
        <div class="content">
            <h1>Đánh giá</h1>

            <div class="newComment">
                <input type="text" placeholder="Viết bình luận..." v-model="inputUser" />
                <button @click="createComment" class="sendComment">Gửi</button>
            </div>

            <div class="comment-list">
                <div class="comment" v-for="comment in results.filter(c => c.parentId === 0)" :key="comment._id">
                    <div class="comment-item">
                        <div class="username">{{ comment.username }}</div>
                        <div class="content-comment">{{ comment.content }}</div>
                        <div class="date">{{ new Date(comment.createdAt).toLocaleString() }}</div>

                        <div class="actions">
                            <button @click="replyTo = (replyTo === comment._id ? null : comment._id)">Phản hồi</button>
                        </div>

                        <div v-if="replyTo === comment._id" class="reply-input">
                            <input type="text" v-model="replyContent" placeholder="Trả lời...">
                            <button @click="sendReply(comment._id)" class="sendComment">Gửi</button>
                        </div>

                        <div class="reply-list">
                            <div class="reply" v-for="reply in results.filter(r => r.parentId === comment._id)"
                                :key="reply._id">
                                <div class="username">{{ reply.username }}</div>
                                <div class="content-comment">{{ reply.content }}</div>
                                <div class="date">{{ new Date(reply.createdAt).toLocaleString() }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

import commentsService from '@/services/comments.service';
import userService from '@/services/user.service';


export default {
    name: 'ContactPage',
    components: {
    },
    data() {
        return {
            results: [],
            inputUser: "",
            replyTo: null,
            replyContent: "",

        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const response = await commentsService.getAllComment();
            console.log(response.data)
            this.results = response.data
        },
        async createComment() {

            const dataUser = (await userService.getMe()).data;
            const newComment = {
                username: dataUser.tendangnhap,
                userID: dataUser._id,
                parentId: 0,
                content: this.inputUser,
            }
            console.log(newComment)

            await commentsService.createComment(newComment);
            this.inputUser = "";
            this.fetchData();
        },
        async sendReply(id) {
            const dataUser = (await userService.getMe()).data;
            const newReply = {
                parentId: id,
                username: dataUser.tendangnhap,
                userID: dataUser._id,
                content: this.replyContent,
            }
            await commentsService.createComment(newReply);
            this.replyContent = "";
            this.fetchData();
        },
    }
}
</script>

<style scoped>
.contact-page {
    display: flex;
    justify-content: center;
    background-color: #f0f2f5;
    padding: 40px 20px 0 20px;
    min-height: 100vh;
    box-sizing: border-box;
}

.content {
    flex: 1;
    width: 100%;
    margin-top: 35px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
}

h1 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #050505;
    border-bottom: 1px solid #dddfe2;
    padding-bottom: 10px;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.comment-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-bottom: 1px solid #dddfe2;
    padding-bottom: 12px;
}

.reply-list {
    margin-left: 16px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.username {
    font-weight: 600;
    color: #050505;
    font-size: 14px;
}

.content-comment {
    font-size: 14px;
    color: #1c1e21;
}

.date {
    font-size: 12px;
    color: #65676b;
}

.actions {
    margin-top: 4px;
}

button {
    background: none;
    border: none;
    color: #1877f2;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
}

button:hover {
    text-decoration: underline;
}

input[type="text"] {
    width: 100%;
    padding: 8px 12px;
    margin-top: 6px;
    font-size: 14px;
    border: 1px solid #ccd0d5;
    border-radius: 18px;
    outline: none;
    background-color: #f0f2f5;
}

.newComment {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
}

.reply-input {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
}

.sendComment {
    padding: 6px 12px;
    border-radius: 18px;
    background-color: #1877f2;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
}

.sendComment:hover {
    background-color: #155ab6;
}
</style>


