// test-openrouter.js
require("dotenv").config();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

(async () => {
  console.log("🧠 Testing GPT-OSS-120B via OpenRouter…");
  try {
    const response = await client.chat.completions.create({
      model: "gpt-oss-120b",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Calculate 100 /6 " },
      ],
    });

    console.log("✅ Response:\n", response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Test failed:\n", err.response?.data || err.message);
  }
})();
