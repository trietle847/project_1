const ChatGPTService = require("../services/chatgpt.service");
const DictionaryService = require("../services/dictionary.service");
const ApiError = require("../app-error");
const MongoDB = require("../utils/mongodb.util");
// const { vocabularyPromptTemplate } = require("../templates/prompt.template");

exports.generateVocabulary = async (req, res, next) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return next(new ApiError(400, "Thiếu thông tin đầu vào"));
    }

    const prompt = `
        Hãy tạo khoảng 50 từ vựng chi tiết cho chủ đề "${topic}" bao gồm:
        - Nghĩa tiếng Anh
        - Nghĩa tiếng Việt
        - Từ đồng nghĩa (synonyms)
        - Từ trái nghĩa (antonyms)
        - Một số ví dụ (examples) minh họa cách dùng (1-3 ví dụ)
        - chủ đề của từ vựng (topics) (1-2 chủ đề)
        - Phát âm (phonetics)
        - Từ vựng (word)
        - Viết hoa chữ cái đầu tiên của kết quả
        - Không được thêm các ghi chú hay thông tin không cần thiết vào kết quả

        Trả kết quả dưới dạng JSON có cấu trúc như sau:

        {
          "word": "",
          "phonetics": "",
          "meanings": {
            "english": "",
            "vietnamese": ""
          },
          "examples": [],
          "synonyms": [],
          "antonyms": [],
          "topics": [],
        }
      `;

    console.log("Prompt:", prompt);

    const chatGPTService = new ChatGPTService();
    const dictionaryService = new DictionaryService(MongoDB.client);

    // Gọi OpenAI API để tạo từ vựng
    const result = await chatGPTService.generateVocabulary(prompt);

    if (!result) {
      return next(new ApiError(500, "Không thể tạo từ vựng"));
    }

    const cleaned = result
      .split("\n")
      .filter(
        (line) =>
          !line.trim().startsWith("```json") && !line.trim().startsWith("```")
      )
      .join("\n");

    const success = [];
    const failed = [];
    const parsedData = JSON.parse(cleaned);

    for (let item of parsedData) {
      // item.topics = [topic];
      // console.log(JSON.stringify(item));
      try {
        const doc = await dictionaryService.createWord(item);
        success.push({ word: item.word });
      } catch (error) {
        failed.push({
          word: item.word,
          reason: error.message,
        });
      }
    }

    return res.send({
      message: "Hoàn tất xử lý dữ liệu",
      inserted: success.length,
      failed: failed.length,
      success,
      failed,
    });
  } catch (error) {
    console.error(
      "❌ OpenAI API Error:",
      error.response?.data || error.message
    ); // log chi tiết lỗi
    throw new Error("Không thể kết nối với OpenAI API");
  }
};

exports.generateVocabularyByRelation = async (req, res, next) => {
  try {
    const dictionaryService = new DictionaryService(MongoDB.client);
    const chatGPTService = new ChatGPTService();

    const batchSize = 15; // lấy 15 từ đầu

    const allRelatedWords = await dictionaryService.getAllRelatedWords();

    if (!allRelatedWords || allRelatedWords.length === 0) {
      return next(new ApiError(404, "Không có từ nào trong bảng relatedWords"));
    }

    const success = [];
    const failed = [];
    const batch = allRelatedWords.slice(0, batchSize);

    for (let item of batch) {
      const word = item.word;
      const prompt = `
          Hãy tạo từ vựng chi tiết cho từ "${word}" bao gồm:
          - Nghĩa tiếng Anh
          - Nghĩa tiếng Việt
          - Từ đồng nghĩa (synonyms)
          - Từ trái nghĩa (antonyms)
          - Một số ví dụ (examples) minh họa cách dùng (1-2 ví dụ)
          - chủ đề của từ vựng (topics) (1-2 chủ đề)
          - Phát âm (phonetics)
          - Viết hoa chữ cái đầu tiên của kết quả
          - Không được thêm các ghi chú hay thông tin không cần thiết vào kết quả
          Trả kết quả dưới dạng JSON có cấu trúc như sau:

          {
            "word": "${word}",
            "phonetics": "",
            "meanings": {
              "english": "",
              "vietnamese": ""
            },
            "examples": [],
            "synonyms": [],
            "antonyms": [],
            "topics": []
          }
        `;

      try {
        const result = await chatGPTService.generateVocabulary(prompt);
        const cleaned = result
          .split("\n")
          .filter(
            (line) =>
              !line.trim().startsWith("```json") &&
              !line.trim().startsWith("```")
          )
          .join("\n");

        const parsed = JSON.parse(cleaned);
        await dictionaryService.createWord(parsed);

        // Xoá khỏi relatedWords nếu tạo thành công
        await dictionaryService.deleteRelatedWord(word);

        success.push({ word });
      } catch (err) {
        console.error(`❌ Lỗi khi xử lý từ "${word}":`, err.message);
        failed.push({
          word,
          reason: err.message,
        });
      }
    }

    return res.send({
      message: "Hoàn tất xử lý tất cả từ trong 1 batch",
      processed: batch.length,
      success,
      failed,
    });
  } catch (error) {
    console.error("❌ Lỗi tổng:", error.response?.data || error.message);
    return next(new ApiError(500, "Không thể xử lý từ liên quan"));
  }
};
