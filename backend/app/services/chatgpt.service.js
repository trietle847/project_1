const axios = require("axios");

class ChatGPTService {
  constructor() {
    this.apiKey = "AIzaSyBfp1VX8JFmo9nP07X4C0WHj-3lcq5PNMQ"; // Thay bằng API key của bạn
    this.url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
  }

  async generateVocabulary(prompt) {
    try {
      const response = await axios.post(
        this.url,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Không nhận được phản hồi từ Gemini");
      }

      return text.trim();
    } catch (error) {
      console.error(
        "❌ Gemini API Error:",
        error.response?.data || error.message
      );
      throw new Error("Không thể kết nối với Gemini API");
    }
  }
}

module.exports = ChatGPTService;
