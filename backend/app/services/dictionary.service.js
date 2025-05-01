const { ObjectId } = require("mongodb");

class dictionaryService {
  constructor(client) {
    this.words = client.db().collection("dictionary");
    this.relations = client.db().collection("relatedWords");
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
      topics: Array.isArray(payload.topics)
        ? payload.topics
        : payload.topics
        ? [payload.topics]
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

    // Thêm các từ đồng nghĩa vào bảng relatedWords
    for (const item of wordData.synonyms) {
      // Tách từ đồng nghĩa
      const synonymWords = item.split(",").map((synonym) => synonym.trim());
      for (const synonym of synonymWords) {
        await this.relations.updateOne(
          { word: synonym },
          { $set: { word: synonym } },
          { upsert: true }
        );
      }
    }

    // Thêm các từ trái nghĩa vào bảng relatedWords (tách các từ trong chuỗi)
    for (const item of wordData.antonyms) {
      // Tách từ trái nghĩa
      const antonymWords = item.split(",").map((antonym) => antonym.trim());
      for (const antonym of antonymWords) {
        await this.relations.updateOne(
          { word: antonym },
          { $set: { word: antonym } },
          { upsert: true }
        );
      }
    }

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
    return await this.words.deleteOne({
      word: { $regex: `^${word.trim()}$`, $options: "i" },
    });
  }

  async getAllRelatedWords() {
    const cursor = await this.relations.find({});
    return await cursor.toArray();
  }

  async deleteRelatedWord(word) {
    return await this.relations.deleteOne({
      word: { $regex: `^${word.trim()}$`, $options: "i" },
    });
  }
}



module.exports = dictionaryService;
