import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateFeedbackFromAI = async (questions, answers, jobRole, difficulty) => {
  const prompt = `
  You are an experienced interview coach. 
  Analyze the following interview session for the role of "${jobRole}" (difficulty: ${difficulty}).
  Provide structured feedback with these sections:
  - Summary (2-3 sentences)
  - Strengths (bullet points)
  - Areas of Improvement (bullet points)
  - Overall Score (out of 10)
  - Personalized Advice (2-3 lines)

  Q&A:
  ${questions.map((q, i) => `Q${i + 1}: ${q.question}\nA${i + 1}: ${answers[i] || "No answer"}\n`).join("\n")}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or any GPT model you use
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return completion.choices[0].message.content;
};
