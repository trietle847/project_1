import createAPI from "./api.services";

export default {
  addSaveWord(word) {
    return createAPI.post("/userSavedWord", {word});
  },
  getSavedWords() {
    return createAPI.get("/userSavedWord");
  },
  deleteSavedWord(word) {
    return createAPI.delete(`/userSavedWord?word=${encodeURIComponent(word)}`);
  },
  deleteUser(username) {
    return createAPI.delete(`/userSavedWord/${username}`);
  }
  
}
