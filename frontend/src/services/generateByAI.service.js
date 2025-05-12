import createAPI from "./api.services";

export default {
  generateVocabulary(topic) {
    return createAPI.post("/chatgpt/generate-vocabulary", topic);
  },
  updateVocabulary() {
    return createAPI.get("/chatgpt/update-vocabulary");
  }

};