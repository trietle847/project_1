import createAPI from "./api.services";

export default {
  getAllUser() {
    return createAPI.get("/user")
  },
  createUser(userData) {
    return createAPI.post("/user",userData)
  },
  getUserByID(id) {
    return createAPI.get(`/user/${id}`)
  },
  getUserByUsername(username) {
    return createAPI.get(`/user/${username}`)
  },
  login(data) {
    return createAPI.post("/user/login",data)
  }
};
