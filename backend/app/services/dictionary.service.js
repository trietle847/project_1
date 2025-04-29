const { ObjectId } = require("mongodb");

class dictionaryService {
  constructor(client) {
    this.words = client.db().collection("dictionary");
  }

  extractWordData(payload) {
    const word = {
      word: payload.word?.trim(),
      phonetics: payload.phonetics || "",
      meanings: [
        {
          english: payload.meanings?.english || "",
          vietnamese: payload.meanings?.vietnamese || "",
        },
      ],
      examples: payload.examples
        ? Array.isArray(payload.examples)
          ? payload.examples
          : [payload.examples]
        : [],
      synonyms: Array.isArray(payload.synonyms)
        ? payload.synonyms
        : payload.synonyms
        ? [payload.synonyms]
        : [],
      antonyms: Array.isArray(payload.antonyms)
        ? payload.antonyms
        : payload.antonyms
        ? [payload.antonyms]
        : [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return word;
  }

  async createWord(payload) {
    const wordData = this.extractWordData(payload);

    // Kiểm tra nếu từ đã tồn tại
    const existing = await this.words.findOne({ word: wordData.word });
    if (existing) {
      throw new Error("Từ đã tồn tại trong cơ sở dữ liệu.");
    }

    const result = await this.words.insertOne(wordData);
    return result;
  }

  async findAll() {
    const cursor = await this.words.find({});
    return await cursor.toArray();
  }

  async find(word) {
    return await this.words
      .find({
        word: { $regex: word.trim().toLowerCase(), $options: "i" },
      })
      .toArray();
  }

  async delete(word) {
    return await this.words.deleteOne({ word: word.trim().toLowerCase() });
  }
}

module.exports = dictionaryService;
