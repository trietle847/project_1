<template>
    <div class="contact-page">
        <Navbar />
        <Sidebar />
        <div class="content">
            <h1>Đánh giá</h1>

            <div class="comment-list">
                <div class="comment" v-for="comment in results.filter(r => r.parentId === 0)" :key="comment._id" :class="{reply :comment.parentId !== 0}">
                    <div class="comment-item">
                        <div class="username">{{ comment.username }}</div>
                        <div class="content-comment">{{ comment.content }}</div>
                        <div class="date">{{ new Date(comment.createdAt).toLocaleString() }}</div>
                        <button @click="replyTo = comment._id">Reply</button>

                        <div v-if="replyTo === comment._id" class="reply">
                            <input type="text" v-model="replyContent">
                            <button @click="sendReply(comment._id)">Send</button>
                        </div>

                        <div class="reply-list" v-for="reply in results.filter(r => r.parentId === comment._id)"
                            :key="reply._id">
                            <div class="username">{{ reply.username }}</div>
                            <div class="content-comment">{{ reply.content }}</div>
                            <div class="date">{{ new Date(reply.createdAt).toLocaleString() }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <p>{{ results.length }}</p>

            <div class="newComment">
                <input type="text" v-model="inputUser">
                <button @click="createComment" class="sendComment">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import Sidebar from '@/components/sidebar.vue';
import commentsService from '@/services/comments.service';
import userService from '@/services/user.service';


export default {
    name: 'ContactPage',
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            results: [],
            inputUser: "",
            replyTo : null,
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
    flex-direction: column;
    height: 100vh;
}


/* Phần content */
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

/* Danh sách comment */
.comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    /* Khoảng cách giữa các comment */
}

/* Mỗi comment */
.comment {
    background-color: #fdfdfd;
    border: 1px solid #ddd;
    border-left: 4px solid #4caf50;
    padding: 12px 16px;
    border-radius: 6px;
    transition: background-color 0.3s ease;
}

.comment:hover {
    background-color: #f0f9f0;
}

.username {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 6px;
}

.content {
    color: #444;
    margin-bottom: 4px;
}

.date {
    font-size: 12px;
    color: #888;
    text-align: right;
}

.reply-list {
    margin-left: 20px;
}
</style>
