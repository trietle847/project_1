import createAPI from "./api.services";

export default {
  getAllDictionary() {
    return createAPI.get("/api/dictionary");
  },
  getAVocabulary(word) {
    return createAPI.get(`/api/dictionary/${word}`);
  },
  deleteAVocabulary(word) {
    return createAPI.delete(`/api/dictionary/${word}`);
  },
};