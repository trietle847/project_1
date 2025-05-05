import createAPI from "./api.services";

export default {
  addSaveWord(word) {
    return createAPI.post("/userSavedWord", {word});
  }
}
