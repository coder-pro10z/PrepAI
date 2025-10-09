import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function main() {
  console.log("🧠 Testing GPT-OSS-120B via OpenRouter…");

  try {
    const response = await client.chat.completions.create({
      model: "gpt-oss-120b",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello from OpenRouter GPT-OSS-120B!" },
      ],
    });

    console.log("✅ Response:\n", response.choices[0].message.content);
  } catch (error) {
    console.error("❌ Test failed:\n", error.response?.data || error.message);
  }
}

main();
