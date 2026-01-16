require("dotenv").config();
const axios = require("axios");
const { geminiAiServices } = require("../geminiAiServices");
const PERPLEXITY_KEY = process.env.PERPLEXITY_API_KEY;
const MODEL = process.env.PERPLEXITY_MODEL || "sonar-deep-research";

async function generateCourseOneShot(prompt) {
  const url = "https://api.perplexity.ai/chat/completions";
  const payload = {
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that outputs a single JSON object only.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 500, // adjust per model limits
    temperature: 0.2,
  };

  const headers = {
    Authorization: `Bearer ${PERPLEXITY_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    // const resp = await geminiAiServices({ prompt });

    const resp = await axios.post(url, payload, { headers });
    console.log("AI model response:", resp.data);
    // Chat completion response path depends on OpenAI; adjust if using different SDK
    const content = resp.data.choices?.[0]?.message?.content;
    return { success: true, content, raw: resp.data };
  } catch (err) {
    console.error("AI model error:", err.response?.data || err.message);
    return { success: false, error: err.response?.data || err.message };
  }
}

module.exports = { generateCourseOneShot };
