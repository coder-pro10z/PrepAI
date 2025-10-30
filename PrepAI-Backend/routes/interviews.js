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
      model: 'gpt-oss-120b',          // free/open‑source model
      // model: 'openai/gpt-oss-120b',
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
    console.log("🧩 Raw AI Response:", aiText);
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

// ==========================
// 📘 Generate Interview Feedback
// ==========================
router.post('/generate-feedback', async (req, res) => {
  try {
    const { questions, answers, jobRole, difficulty } = req.body;

    // 1️⃣ Validate
    if (!questions || !answers || !Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'questions[] and answers[] are required'
      });
    }

    // 2️⃣ Build feedback prompt
    const feedbackPrompt = `
You are an experienced technical interviewer and career coach. 
Analyze the following mock interview for the role of "${jobRole || 'Software Engineer'}" (difficulty: ${difficulty || 'medium'}).
Provide structured, constructive feedback in this JSON format:
{
  "summary": "short overview of overall performance (2-3 lines)",
  "strengths": ["list of key strengths"],
  "improvements": ["list of areas to improve"],
  "score": "overall score out of 10",
  "advice": "final personalized improvement suggestion"
}

Here are the candidate's answers:
${questions.map((q, i) => `Q${i + 1}: ${q.question}\nA${i + 1}: ${answers[i] || 'No answer given'}\n`).join('\n')}
    `;

    // 3️⃣ Call AI model (same as your question generator)
    const completion = await req.openai.chat.completions.create({
      model: 'gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert technical interviewer who evaluates answers and provides structured, objective feedback in JSON format.'
        },
        { role: 'user', content: feedbackPrompt }
      ],
      temperature: 0.6,
      max_tokens: 1000
    });

    // 4️⃣ Parse AI output
    const aiText = completion.choices[0].message.content;
    console.log("🧩 Raw Feedback Response:", aiText);

    let feedback;
    try {
      feedback = JSON.parse(aiText);
    } catch {
      // fallback if model returned plain text instead of valid JSON
      feedback = { summary: aiText };
    }

    // 5️⃣ Send feedback response
    res.json({ success: true, feedback });

  } catch (error) {
    console.error('❌ generate-feedback error:', {
      message: error.message,
      stack: error.stack
    });

    res.status(500).json({
      success: false,
      message: 'Failed to generate feedback. Please try again later.'
    });
  }
});


module.exports = router;