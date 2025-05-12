import createAPI from "./api.services";

export default {
  fetchDictionaryList(query = "") {
    return createAPI.get(`/api/dictionary${query ? `?word=${query}` : ""}`);
  },
  getAVocabulary(word) {
    return createAPI.get(`/api/dictionary/${word}`);
  },
  deleteAVocabulary(word) {
    return createAPI.delete(`/api/dictionary/${word}`);
  },
};