const ChatGPTService = require("../services/chatgpt.service");
const DictionaryService = require("../services/dictionary.service");
const ApiError = require("../app-error");
const MongoDB = require("../utils/mongodb.util");
const { vocabularyPromptTemplate } = require("../templates/prompt.template");

exports.generateVocabulary = async (req, res, next) => {
  try {
    const { topic } = req.body; 
    if (!topic){
      return next(new ApiError(400, "Thiếu thông tin đầu vào"));
    }

    const prompt = vocabularyPromptTemplate.replace("{{topic}}", topic);

    console.log("Prompt:", prompt); // log prompt để kiểm tra
    
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
      // console.log(JSON.stringify(item));
      try {
        const doc = await dictionaryService.createWord(item);
        success.push({word: item.word})
      } catch (error) {
        failed.push({
          word: item.word,
          reason: error.message
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
