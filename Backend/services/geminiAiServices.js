const GoogleGenAI = require("@google/genai").GoogleGenAI;
require("dotenv").config();

const geminiAiServices = async ({ prompt }) => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to call Gemini API`);

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "You are a helpful assistant that outputs a single JSON object only.\n\n" +
                  prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 5000,
          temperature: 0.2,
        },
      });

      console.log("GEMINI response received successfully");
      return response;
    } catch (error) {
      console.error(
        `Gemini API error on attempt ${attempt}:`,
        error.response?.data || error.message,
      );
      lastError = error;

      // If it's a 503 (overloaded) or 429 (rate limit), wait and retry
      if (error.response?.status === 503 || error.response?.status === 429) {
        if (attempt < maxRetries) {
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
          console.log(`Waiting ${waitTime}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
      }

      // For other errors, don't retry
      break;
    }
  }

  throw lastError;
};

module.exports = { geminiAiServices };
