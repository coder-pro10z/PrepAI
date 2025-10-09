// filepath: d:\Projects\Full Stack (React)\PrepAI\PrepAI-Backend\utils\interviewHelpers.js
/**
 * Helper utilities used by the /api/interviews routes.
 * They are deliberately lightweight – they only need to:
 *   1️⃣ Build a prompt string that we send to the LLM.
 *   2️⃣ Parse the LLM’s JSON response into an array of question objects.
 *   3️⃣ Provide a static fallback array when the LLM call fails.
 *
 * You can extend these functions later (e.g., add more sophisticated prompt engineering
 * or richer fallback data) without touching the route code.
 */

/**
 * Build a plain‑text prompt that describes the interview parameters.
 * The LLM receives a single string, so we concatenate the fields in a readable way.
 *
 * @param {Object} params – the request body fields
 * @returns {string}
 */
function buildInterviewPrompt(params) {
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
  } = params;

  // Build a bullet‑list style prompt – easy for the model to understand.
  const lines = [
    `Job Role: ${jobRole || 'Not specified'}`,
    `Company: ${company || 'Not specified'}`,
    `Experience Level: ${experienceLevel || 'Not specified'}`,
    `Interview Type: ${interviewType || 'technical'}`,
    `Difficulty: ${difficulty || 'intermediate'}`,
    `Number of Questions: ${questionCount || 5}`,
    `Skills: ${Array.isArray(skills) ? skills.join(', ') : skills || 'none'}`,
    `Specific Topics: ${Array.isArray(specificTopics) ? specificTopics.join(', ') : specificTopics || 'none'}`,
    `Custom Topics: ${customTopics || 'none'}`,
    `Job Description: ${jobDescription || 'none'}`,
    `External Link Content: ${linkContent || 'none'}`
  ];

  return `You are an expert interview coach. Generate ${questionCount || 5} interview questions based on the following details:\n` +
         lines.map(l => `- ${l}`).join('\n') +
         `\nReturn the result as a **valid JSON array** where each element has the shape:\n` +
         `{\n  "question": "string",\n  "category": "technical|behavioral",\n  "followUps": ["string", ...],\n  "difficulty": "beginner|intermediate|advanced",\n  "tags": ["string", ...]\n}`;
}

/**
 * Parse the LLM response string into a JavaScript array.
 * The LLM is instructed to return *valid JSON*, but we still guard against malformed output.
 *
 * @param {string} rawResponse – the `content` field from the LLM completion
 * @returns {Array<Object>} – array of question objects (empty array on failure)
 */
function parseQuestionsFromAI(rawResponse) {
  try {
    // The model may wrap the JSON in extra text; try to locate the first '[' and the last ']'
    const start = rawResponse.indexOf('[');
    const end = rawResponse.lastIndexOf(']') + 1;
    const jsonString = (start !== -1 && end !== -1) ? rawResponse.slice(start, end) : rawResponse;

    const parsed = JSON.parse(jsonString);
    // Ensure we actually got an array
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('❌ Failed to parse LLM JSON response:', e);
    return [];
  }
}

/**
 * Return a static fallback array of questions.
 * This is used when the LLM call fails (network error, bad key, etc.).
 *
 * @param {Object} opts – optional fields to personalize the fallback (currently unused)
 * @returns {Array<Object>}
 */
function generateFallbackQuestions(opts = {}) {
  // Very simple generic fallback – you can replace with a richer set later.
  return [
    {
      question: `Tell me about your experience with ${opts.jobRole || 'software development'} responsibilities.`,
      category: 'behavioral',
      followUps: [
        'What was your biggest challenge?',
        'How did you measure success in that role?'
      ],
      difficulty: 'beginner',
      tags: ['experience', 'background']
    },
    {
      question: `How do you approach problem‑solving as a ${opts.experienceLevel || 'mid‑level'} ${opts.jobRole || 'developer'}?`,
      category: 'behavioral',
      followUps: [
        'Can you give a specific example?',
        'What tools or methodologies do you use?'
      ],
      difficulty: 'intermediate',
      tags: ['problem‑solving', 'methodology']
    }
  ];
}

// Export the three helpers
module.exports = {
  buildInterviewPrompt,
  parseQuestionsFromAI,
  generateFallbackQuestions
};