const axios = require("axios");
require("dotenv").config();

class ChatGPTService {
  constructor() {
    // this.apiKey = "AIzaSyDKhMHhbDeZ5UR_sYsJTzxdpnIh5SueGqw"; // Thay bằng API key của bạn
    this.apiKey = process.env.GEMINI_API_KEY;
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
