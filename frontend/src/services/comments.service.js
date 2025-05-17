import createAPI from "./api.services";

export default {
    createComment(data) {
        return createAPI.post("/comment/create",data)
    },

    getAllComment() {
        return createAPI.get("/comment/getAll")
    },
}