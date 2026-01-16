const GoogleGenAI = require("@google/genai").GoogleGenAI;
require("dotenv").config();

const geminiAiServices = async ({ prompt }) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "system",
          parts: [
            {
              data: {
                text: "You are a helpful assistant that outputs a single JSON object only.",
              },
            },
          ],
        },
        { role: "user", parts:[{data:{text: prompt}}] },
      ],
      max_tokens: 5000, // adjust per model limits
      temperature: 0.2,
    });

    console.log("GEMINI response:", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { geminiAiServices };
