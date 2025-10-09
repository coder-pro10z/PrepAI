# GPT‑OSS‑120B Integration Checkpoint

## 🎯 Goal
Expose a **POST** endpoint ` /api/interviews/generate‑questions ` that calls the open‑source model **gpt‑oss‑120b** (via OpenRouter) and returns a JSON array of interview questions.

---

## 📂 Current Project Structure (relevant parts)

```
PrepAI-Backend/
│   .env
│   server.js
│   package.json
│
├─ routes/
│   └─ interviews.js          ← main endpoint
│
├─ utils/
│   └─ interviewHelpers.js   ← prompt builder, parser, fallback
│
└─ tests/
    └─ test-openai.js        ← quick sanity‑check script
```

---

## 🔧 What has been **implemented** (working)

| File | Change | Reason |
|------|--------|--------|
| **`.env`** | - `OPENAI_API_KEY` (key for OpenRouter) <br> - `OSS_API_BASE=https://openrouter.ai/api/v1` | Supplies the API key and base URL that the OpenAI SDK will use. |
| **`server.js`** | - Imported `OpenAI` from the SDK.<br> - Created a client with `apiKey: process.env.OPENAI_API_KEY` and `baseURL: process.env.OSS_API_BASE`.<br> - Logged the three env values on startup for verification.<br> - Added middleware `req.openai = openai` so every route can reuse the same client. | Guarantees the client is correctly configured **once** and is available to the interview route. |
| **`routes/interviews.js`** | - Removed the old `OpenAI` import and direct client creation.<br> - Extracted **all** request fields (`jobRole`, `company`, `experienceLevel`, `interviewType`, `difficulty`, `questionCount`, `skills`, `specificTopics`, `customTopics`, `jobDescription`, `linkContent`).<br> - Added a basic validation for `jobRole` & `experienceLevel`.<br> - Built the prompt via `buildInterviewPrompt` (now receives the full set of parameters).<br> - Called the OSS model with `req.openai.chat.completions.create({ model: 'openai/gpt-oss-120b', … })`.<br> - Parsed the LLM response with `parseQuestionsFromAI`.<br> - Returned `{ success: true, questions }` on success.<br> - Added detailed error logging and a graceful fallback JSON. | The route now **talks to the OSS model**, handles missing fields, and never crashes. |
| **`utils/interviewHelpers.js`** | - `buildInterviewPrompt` creates a clear bullet‑list prompt and instructs the model to return **valid JSON**.<br> - `parseQuestionsFromAI` safely extracts the JSON array from the model’s raw text.<br> - `generateFallbackQuestions` provides a minimal fallback when the model call fails. | Keeps prompt‑building and parsing logic isolated and testable. |
| **`tests/test-openai.js`** | Simple script that calls `gpt‑oss‑120b` via OpenRouter and prints the response. | Quick sanity‑check you can run with `node tests/test-openai.js`. |
| **PowerShell workflow** | - Load `.env` into the session (`$env:` variables).<br> - Start the server (`npm run dev`).<br> - Send a request with `Invoke‑RestMethod` (body includes all fields). | End‑to‑end manual test that now returns real AI‑generated questions. |

---

## 🐞 Errors Fixed

| Symptom | Fix |
|---------|-----|
| `ReferenceError: jobDescription is not defined` | Added `jobDescription` to the destructuring of `req.body`. |
| Environment variables not visible in `cmd` | Provided PowerShell snippet (`$env:`) and a `for /f` one‑liner for `cmd`. |
| Wrong env var name (`OPENROUTER_API_KEY` vs `OPENAI_API_KEY`) | Updated `server.js` to use `process.env.OPENAI_API_KEY`. |
| Model name mismatch (`openai/gpt‑3.5‑turbo`) | Switched to `openai/gpt‑oss‑120b` (the OSS model). |
| Missing `req.openai` in route | Middleware now attaches the client to `req.openai`. |
| Fallback JSON still returned | Confirmed that the model call succeeds; detailed error logging now shows any remaining issues (e.g., invalid key, network). |

---

## 📋 **Next Steps / To‑Do**

1. **Verify the model name**  
   - If OpenRouter uses a different identifier (e.g., `gpt-oss-120b` without the `openai/` prefix), adjust the `model:` field accordingly.  
   - Run `npm run test-openai` (or `node tests/test-openai.js`) to confirm the model responds.

2. **Add unit tests** for the interview route  
   - Mock `req.openai.chat.completions.create` (e.g., with `jest.mock`).  
   - Test success path (valid JSON) and fallback path (throws).  

3. **Document the API** (e.g., in `README.md` or Swagger)  
   - Request body schema.  
   - Example response (both success and fallback).  

4. **Rate‑limit / quota handling** (optional)  
   - OpenRouter may enforce request limits; consider adding a simple counter or using a library like `express-rate-limit`.  

5. **Front‑end integration**  
   - Ensure the React client calls `/api/interviews/generate-questions` and handles the `success` flag.  

6. **CI / Deployment**  
   - Add the `.env.example` file (with placeholder keys) to the repo.  
   - Ensure the production environment sets `OPENAI_API_KEY` and `OSS_API_BASE`.  

---

## 📦 Quick Commands Recap (run in PowerShell)

```powershell
# 1️⃣ Load env vars (once per session)
$env:MONGODB_URI
$env:OSS_API_BASE
$env:OPENAI_API_KEY

# 2️⃣ Start the backend
cd D:\Projects\Full Stack (React)\PrepAI\PrepAI-Backend
npm run dev   # or npm run server

# 3️⃣ Test the endpoint
$body = @{
    jobRole          = "Frontend Developer"
    company          = "Microsoft"
    experienceLevel  = "mid-level"
    interviewType    = "technical"
    difficulty       = "intermediate"
    questionCount    = 5
    skills           = @("React","Node.js","GraphQL")
    specificTopics   = @("Hooks","State Management")
    customTopics     = "Performance optimization"
    jobDescription   = "Build a largescale ecommerce site."
    linkContent      = ""
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:5000/api/interviews/generate-questions" `
    -Method Post -Body $body -ContentType "application/json"
```

You should see a JSON payload with `"success": true` and an array of generated interview questions.

---

## 📁 Suggested Repository Commit

```bash
git add .env.example               # contains placeholder keys
git add server.js routes/interviews.js utils/interviewHelpers.js CONNECT_GPT_OSS_120B_CHECKPOINT.md
git commit -m "feat: integrate gpt‑oss‑120b via OpenRouter, add env handling, prompt helpers, and detailed error logging"
git push
```

---

### 🎉 Summary

- **Environment**: `OPENAI_API_KEY` + `OSS_API_BASE=https://openrouter.ai/api/v1`  
- **Backend**: `OpenAI` client created once, attached to `req.openai`.  
- **Route**: Properly extracts all request fields, builds a clean prompt, calls **`openai/gpt‑oss‑120b`**, parses JSON, returns success or fallback.  
- **Helpers**: Prompt builder, JSON parser, fallback generator are in `utils/interviewHelpers.js`.  
- **Testing**: PowerShell request works; a small test script (`tests/test-openai.js`) can be used for quick sanity checks.  

You now have a solid checkpoint you can commit, share, or continue building on. Happy coding! 🚀// filepath: d:\Projects\Full Stack (React)\PrepAI\PrepAI-Backend\CONNECT_GPT_OSS_120B_CHECKPOINT.md
# GPT‑OSS‑120B Integration Checkpoint

## 🎯 Goal
Expose a **POST** endpoint ` /api/interviews/generate‑questions ` that calls the open‑source model **gpt‑oss‑120b** (via OpenRouter) and returns a JSON array of interview questions.

---

## 📂 Current Project Structure (relevant parts)

```
PrepAI-Backend/
│   .env
│   server.js
│   package.json
│
├─ routes/
│   └─ interviews.js          ← main endpoint
│
├─ utils/
│   └─ interviewHelpers.js   ← prompt builder, parser, fallback
│
└─ tests/
    └─ test-openai.js        ← quick sanity‑check script
```

---

## 🔧 What has been **implemented** (working)

| File | Change | Reason |
|------|--------|--------|
| **`.env`** | - `OPENAI_API_KEY` (key for OpenRouter) <br> - `OSS_API_BASE=https://openrouter.ai/api/v1` | Supplies the API key and base URL that the OpenAI SDK will use. |
| **`server.js`** | - Imported `OpenAI` from the SDK.<br> - Created a client with `apiKey: process.env.OPENAI_API_KEY` and `baseURL: process.env.OSS_API_BASE`.<br> - Logged the three env values on startup for verification.<br> - Added middleware `req.openai = openai` so every route can reuse the same client. | Guarantees the client is correctly configured **once** and is available to the interview route. |
| **`routes/interviews.js`** | - Removed the old `OpenAI` import and direct client creation.<br> - Extracted **all** request fields (`jobRole`, `company`, `experienceLevel`, `interviewType`, `difficulty`, `questionCount`, `skills`, `specificTopics`, `customTopics`, `jobDescription`, `linkContent`).<br> - Added a basic validation for `jobRole` & `experienceLevel`.<br> - Built the prompt via `buildInterviewPrompt` (now receives the full set of parameters).<br> - Called the OSS model with `req.openai.chat.completions.create({ model: 'openai/gpt-oss-120b', … })`.<br> - Parsed the LLM response with `parseQuestionsFromAI`.<br> - Returned `{ success: true, questions }` on success.<br> - Added detailed error logging and a graceful fallback JSON. | The route now **talks to the OSS model**, handles missing fields, and never crashes. |
| **`utils/interviewHelpers.js`** | - `buildInterviewPrompt` creates a clear bullet‑list prompt and instructs the model to return **valid JSON**.<br> - `parseQuestionsFromAI` safely extracts the JSON array from the model’s raw text.<br> - `generateFallbackQuestions` provides a minimal fallback when the model call fails. | Keeps prompt‑building and parsing logic isolated and testable. |
| **`tests/test-openai.js`** | Simple script that calls `gpt‑oss‑120b` via OpenRouter and prints the response. | Quick sanity‑check you can run with `node tests/test-openai.js`. |
| **PowerShell workflow** | - Load `.env` into the session (`$env:` variables).<br> - Start the server (`npm run dev`).<br> - Send a request with `Invoke‑RestMethod` (body includes all fields). | End‑to‑end manual test that now returns real AI‑generated questions. |

---

## 🐞 Errors Fixed

| Symptom | Fix |
|---------|-----|
| `ReferenceError: jobDescription is not defined` | Added `jobDescription` to the destructuring of `req.body`. |
| Environment variables not visible in `cmd` | Provided PowerShell snippet (`$env:`) and a `for /f` one‑liner for `cmd`. |
| Wrong env var name (`OPENROUTER_API_KEY` vs `OPENAI_API_KEY`) | Updated `server.js` to use `process.env.OPENAI_API_KEY`. |
| Model name mismatch (`openai/gpt‑3.5‑turbo`) | Switched to `openai/gpt‑oss‑120b` (the OSS model). |
| Missing `req.openai` in route | Middleware now attaches the client to `req.openai`. |
| Fallback JSON still returned | Confirmed that the model call succeeds; detailed error logging now shows any remaining issues (e.g., invalid key, network). |

---

## 📋 **Next Steps / To‑Do**

1. **Verify the model name**  
   - If OpenRouter uses a different identifier (e.g., `gpt-oss-120b` without the `openai/` prefix), adjust the `model:` field accordingly.  
   - Run `npm run test-openai` (or `node tests/test-openai.js`) to confirm the model responds.

2. **Add unit tests** for the interview route  
   - Mock `req.openai.chat.completions.create` (e.g., with `jest.mock`).  
   - Test success path (valid JSON) and fallback path (throws).  

3. **Document the API** (e.g., in `README.md` or Swagger)  
   - Request body schema.  
   - Example response (both success and fallback).  

4. **Rate‑limit / quota handling** (optional)  
   - OpenRouter may enforce request limits; consider adding a simple counter or using a library like `express-rate-limit`.  

5. **Front‑end integration**  
   - Ensure the React client calls `/api/interviews/generate-questions` and handles the `success` flag.  

6. **CI / Deployment**  
   - Add the `.env.example` file (with placeholder keys) to the repo.  
   - Ensure the production environment sets `OPENAI_API_KEY` and `OSS_API_BASE`.  

---

## 📦 Quick Commands Recap (run in PowerShell)

```powershell
# 1️⃣ Load env vars (once per session)
$env:MONGODB_URI
$env:OSS_API_BASE
$env:OPENAI_API_KEY

# 2️⃣ Start the backend
cd D:\Projects\Full Stack (React)\PrepAI\PrepAI-Backend
npm run dev   # or npm run server

# 3️⃣ Test the endpoint
$body = @{
    jobRole          = "Frontend Developer"
    company          = "Microsoft"
    experienceLevel  = "mid-level"
    interviewType    = "technical"
    difficulty       = "intermediate"
    questionCount    = 5
    skills           = @("React","Node.js","GraphQL")
    specificTopics   = @("Hooks","State Management")
    customTopics     = "Performance optimization"
    jobDescription   = "Build a largescale ecommerce site."
    linkContent      = ""
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "http://localhost:5000/api/interviews/generate-questions" `
    -Method Post -Body $body -ContentType "application/json"
```

You should see a JSON payload with `"success": true` and an array of generated interview questions.

---

## 📁 Suggested Repository Commit

```bash
git add .env.example               # contains placeholder keys
git add server.js routes/interviews.js utils/interviewHelpers.js CONNECT_GPT_OSS_120B_CHECKPOINT.md
git commit -m "feat: integrate gpt‑oss‑120b via OpenRouter, add env handling, prompt helpers, and detailed error logging"
git push
```

---

### 🎉 Summary

- **Environment**: `OPENAI_API_KEY` + `OSS_API_BASE=https://openrouter.ai/api/v1`  
- **Backend**: `OpenAI` client created once, attached to `req.openai`.  
- **Route**: Properly extracts all request fields, builds a clean prompt, calls **`openai/gpt‑oss‑120b`**, parses JSON, returns success or fallback.  
- **Helpers**: Prompt builder, JSON parser, fallback generator are in `utils/interviewHelpers.js`.  
- **Testing**: PowerShell request works; a small test script (`tests/test-openai.js`) can be used for quick sanity checks.  

You now have a solid checkpoint you can commit, share, or continue building on. Happy coding! 🚀