// routes/interviews.js
const express = require('express');
const router = express.Router();

// Helper to build the prompt – (unchanged)
const { buildInterviewPrompt, parseQuestionsFromAI, generateFallbackQuestions } = require('../utils/interviewHelpers');

router.post('/generate-questions', async (req, res) => {
  try {
    const {
      jobRole,
      company,
      experienceLevel,
      interviewType,
      difficulty,
      questionCount,
      skills,
      specificTopics,
      customTopics,
     jobDescription,
      linkContent
    } = req.body;

    // -------------------------------------------------
    // 1️⃣ Validate required fields
    // -------------------------------------------------
    if (!jobRole || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: 'jobRole and experienceLevel are required'
      });
    }

    // -------------------------------------------------
    // 2️⃣ Build the prompt
    // -------------------------------------------------
    const prompt = buildInterviewPrompt({
      jobRole,
      company,
      experienceLevel,
      interviewType,
      difficulty,
      questionCount,
      skills,
      specificTopics,
      customTopics,
      jobDescription,
      linkContent
    });

    // -------------------------------------------------
    // 3️⃣ Call the OSS model (gpt‑oss‑120b)
    // -------------------------------------------------
    const completion = await req.openai.chat.completions.create({
      // model: 'gpt-oss-120b',          // free/open‑source model
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert technical recruiter and interview coach. Generate realistic, challenging interview questions based on the provided criteria. Always return valid JSON.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    // -------------------------------------------------
    // 4️⃣ Parse the AI response
    // -------------------------------------------------
    const aiText = completion.choices[0].message.content;
    const questions = parseQuestionsFromAI(aiText);

    // -------------------------------------------------
    // 5️⃣ Return success
    // -------------------------------------------------
    res.json({ success: true, questions });

  } catch (error) {
    // 👉 Detailed logging – will appear in the terminal
    console.error('❌ generate‑questions error:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      // OpenAI‑compatible errors often expose a `response` object
      ...(error.response && {
        status: error.response.status,
        data: error.response.data
      })
    });

    // Fallback response (kept for graceful degradation)
    res.status(500).json({
      success: false,
      message: 'Failed to generate questions',
      fallback: generateFallbackQuestions({
        jobRole: req.body.jobRole,
        experienceLevel: req.body.experienceLevel
      })
    });
  }
});

module.exports = router;