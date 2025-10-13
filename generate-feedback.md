🧠 AI Interview Feedback System – Design & Implementation Guide

🧩 Overview

The AI Feedback System automatically evaluates a candidate’s interview performance once the session ends. It generates a personalized feedback report including strengths, weaknesses, and skill-based ratings.

The goal is to provide realistic, coach-like insights derived from:

The user’s answers (transcript)

The interview configuration (role, difficulty, skills)

The question set used in the interview

AI model analysis (via OpenRouter GPT-OSS-120B or any LLM endpoint)



---

⚙️ System Components

Component	Responsibility

Frontend (React)	Captures candidate’s answers, sends all responses to backend at the end of the session
Backend (Express)	Receives all Q/A pairs + interview context → sends them to the AI model for analysis
LLM (OpenRouter)	Evaluates answers, rates performance, and returns structured feedback JSON
Database (MongoDB)	Stores the feedback summary along with the interview session record



---

🧩 Data Flow Overview

sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant LLM
    participant MongoDB

    User->>Frontend: Completes interview & submits answers
    Frontend->>Backend: POST /api/interviews/feedback { sessionId, questions, answers }
    Backend->>LLM: Prompt (interview transcript + evaluation instructions)
    LLM-->>Backend: JSON feedback (strengths, weaknesses, ratings)
    Backend->>MongoDB: Save feedback to session record
    Backend-->>Frontend: Return feedback summary
    Frontend-->>User: Displays final feedback report


---

🧠 Prompt Design for Feedback Generation

Example system & user messages for the LLM:

const completion = await openai.chat.completions.create({
  model: "gpt-oss-120b",
  messages: [
    {
      role: "system",
      content: `
You are an AI interview coach. 
Analyze candidate answers based on clarity, correctness, confidence, and relevance.
Return structured feedback JSON with the following format:
{
  "overallScore": 0-100,
  "summary": "string",
  "strengths": ["string", ...],
  "weaknesses": ["string", ...],
  "skillRatings": [
    { "skill": "Communication", "score": 1-10 },
    { "skill": "Problem Solving", "score": 1-10 },
    { "skill": "Technical Knowledge", "score": 1-10 }
  ],
  "improvementTips": ["string", ...]
}`
    },
    {
      role: "user",
      content: `
Job Role: ${jobRole}
Experience Level: ${experienceLevel}
Difficulty: ${difficulty}
Interview Type: ${interviewType}

Questions and Answers:
${qaPairs.map((qa, i) => `Q${i+1}: ${qa.question}\nA: ${qa.answer}`).join("\n\n")}
`
    }
  ]
});


---

🧱 Backend API – /api/interviews/feedback

POST /api/interviews/feedback

Generates AI-powered feedback for a completed interview.

Request body:

{
  "sessionId": "temp-session-12345",
  "jobRole": "Frontend Developer",
  "experienceLevel": "mid",
  "difficulty": "medium",
  "questions": [
    {"question": "Explain the event loop...", "category": "technical"},
    ...
  ],
  "answers": [
    "It handles async callbacks via microtasks and macrotasks...",
    ...
  ]
}

Response body:

{
  "success": true,
  "feedback": {
    "overallScore": 86,
    "summary": "Strong technical foundation with room for improvement in clarity.",
    "strengths": ["Solid understanding of async JS", "Confident communication"],
    "weaknesses": ["Needs more real-world examples"],
    "skillRatings": [
      { "skill": "Technical Knowledge", "score": 9 },
      { "skill": "Communication", "score": 7 },
      { "skill": "Problem Solving", "score": 8 }
    ],
    "improvementTips": [
      "Provide examples from recent projects.",
      "Avoid over-explaining simple concepts."
    ]
  }
}


---

⚙️ Backend Implementation (Express)

File: /routes/interviews.js

router.post('/feedback', async (req, res) => {
  try {
    const { sessionId, jobRole, experienceLevel, difficulty, questions, answers } = req.body;

    // 1️⃣ Construct Q/A transcript
    const qaPairs = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i] || "No answer provided"
    }));

    // 2️⃣ Build AI feedback prompt
    const prompt = `
Job Role: ${jobRole}
Experience: ${experienceLevel}
Difficulty: ${difficulty}

Interview Transcript:
${qaPairs.map((p, i) => `Q${i+1}: ${p.question}\nA: ${p.answer}`).join("\n\n")}
`;

    // 3️⃣ Call OpenRouter model for feedback
    const completion = await req.openai.chat.completions.create({
      model: "gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are an AI interview coach. Analyze answers and provide structured feedback JSON with overallScore, summary, strengths, weaknesses, skillRatings, improvementTips."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
      max_tokens: 800
    });

    const rawFeedback = completion.choices[0].message.content;

    // 4️⃣ Parse JSON safely
    const feedback = JSON.parse(rawFeedback.match(/\{[\s\S]*\}/)[0]);

    // 5️⃣ Save feedback to session (MongoDB)
    await Session.findByIdAndUpdate(sessionId, { feedback });

    res.json({ success: true, feedback });
  } catch (error) {
    console.error("❌ Feedback generation failed:", error);
    res.status(500).json({
      success: false,
      message: "Feedback generation failed",
      error: error.message
    });
  }
});


---

🎨 Frontend Integration (React)

After the last question or when the timer ends:

const submitInterview = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/interviews/feedback", {
      sessionId,
      jobRole: interviewConfig.jobRole,
      experienceLevel: interviewConfig.experienceLevel,
      difficulty: interviewConfig.difficulty,
      questions,
      answers
    });

    setFeedback(response.data.feedback);
    setShowFeedback(true);
  } catch (error) {
    console.error("Error submitting interview feedback:", error);
  }
};

Display Feedback (UI)

{showFeedback && feedback && (
  <div className="feedback-card">
    <h2>AI Feedback Summary</h2>
    <p>{feedback.summary}</p>
    <h4>⭐ Overall Score: {feedback.overallScore}/100</h4>

    <h4>Strengths:</h4>
    <ul>{feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>

    <h4>Areas to Improve:</h4>
    <ul>{feedback.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>

    <h4>Skill Ratings:</h4>
    <ul>
      {feedback.skillRatings.map((r, i) => (
        <li key={i}>{r.skill}: {r.score}/10</li>
      ))}
    </ul>

    <h4>Tips for Improvement:</h4>
    <ul>{feedback.improvementTips.map((t, i) => <li key={i}>{t}</li>)}</ul>
  </div>
)}


---

🧪 Testing Strategy

1. Start your backend (npm run dev)


2. Run through a mock interview in frontend


3. After last question → trigger feedback submission


4. Check backend console for:

✅ Feedback generated successfully


5. Check MongoDB sessions collection → confirm feedback saved


6. View feedback UI in frontend




---

🚀 Future Enhancements

Add AI scoring per question

Generate PDF summary with reportlab

Support voice tone analysis (if using audio transcripts)

Save multiple feedback sessions per user



---

📁 Suggested Folder Structure

PrepAI-Backend/
├── routes/
│   ├── interviews.js
├── models/
│   ├── Session.js
├── utils/
│   ├── feedbackHelpers.js
├── docs/
│   ├── ai-feedback-system.md  ← (this file)


---

✅ Summary

Feature	Status

Backend route for feedback	✅ Implemented
AI prompt for analysis	✅ Done
JSON parsing & storage	✅ Done
Frontend submission & display	✅ Done
Extendable with scoring, PDF, and audio input	🔜 Planned

