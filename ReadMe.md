# PrepAI

**PrepAI** is an AI‑powered interview‑practice platform.  
It lets users generate custom interview questions with OpenAI, run real‑time mock sessions via Socket.IO, and track their progress.

## About PrepAI
PrepAI is designed to help job seekers practice and improve their interview skills through intelligent, interactive mock interviews.

## Core Purpose
PrepAI aims to:
- Generate AI-driven interview questions using OpenAI's API based on:
  - Job role/position
  - Experience level
  - Industry/domain
  - Specific skills or technologies
- Conduct real-time mock interview sessions where users can:
  - Answer questions in a simulated interview environment via text or voice
  - Receive immediate AI feedback on their responses
  - Practice as many times as needed without judgment
- Track progress and improvement by:
  - Saving interview session history in MongoDB
  - Analyzing performance over time
  - Identifying weak areas that need improvement

## How It Works
### User Flow:
1. Register / Login  
2. Set Interview Parameters  
3. Start AI Interview  
4. Answer Questions  
5. Get Real-time Feedback  
6. Review Session  
7. Track Progress & Repeat

## Key Features
- **User authentication** (JWT) – secure register and login system  
- **AI-generated interview questions** based on role, experience level, company, etc.  
- **Live interview sessions** with text-or-voice answers via Socket.IO  
- **Instant feedback** and session history stored in MongoDB  
- Frontend built with React (using Vite or CRA) and a clean UI  

## Folder Structure
```
PrepAI
├─ .gitignore
├─ README.md
├─ PrepAI-Backend
│   ├─ .env               # local only, ignored by git
│   ├─ server.js
│   ├─ package.json
│   ├─ routes/
│   ├─ models/
│   └─ … (middleware, data, client-side helper)
└─ PrepAI-Frontend
    ├─ src/
    ├─ public/
    ├─ package.json
    └─ vite.config.ts   # (or CRA config)
```

## Getting Started (Windows PowerShell / CMD)

### 1️⃣ Prerequisites
| Tool             | Minimum |
|------------------|---------|
| Node.js          | v18 LTS |
| npm              | Comes with Node.js |
| Git              | 2.30+   |
| MongoDB Atlas account | Free tier |

### 2️⃣ Fork & Clone the Repo
```
# Choose a folder for your projects
cd D:\Projects\Full Stack (React)

# Fork the repo on GitHub → your-username/PrepAI
git clone https://github.com/<YOUR_USERNAME>/PrepAI.git
cd PrepAI\PrepAI-Backend
```

### 3️⃣ Create a MongoDB Atlas Cluster
1. Sign in to **MongoDB Atlas** → **Build a New Cluster** (free tier).  
2. Go to **Database Access → Add New Database User** and note your `<db_username>` and `<db_password>`.  
3. Go to **Network Access → Add IP Address** → `0.0.0.0/0` (or your local IP for safety).  
4. Click **Connect → Connect your application** and copy the connection string:

```
mongodb+srv://<db_username>:<db_password>@cluster0.w64sjdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### 4️⃣ Set Up Environment Variables
Create a `.env` file in the `PrepAI-Backend` directory (the repo already has `.env` in `.gitignore`):

```
notepad .env
```

Paste the following and replace placeholders:

```
# .env – never commit this file with real secrets
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@cluster0.w64sjdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_random_jwt_secret_here
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000

# Frontend can read this (React/Vite loads REACT_APP_ vars)
REACT_APP_API_URL=http://localhost:5000
```

> **Tip:** Keep a `.env.example` with placeholders for contributors.

### 5️⃣ Install Dependencies

```
# Backend
npm install

# (optional) install frontend dependencies
npm run install-client   # runs `cd client && npm install`
```

### 6️⃣ Run the Project

#### Backend only
```
npm run server   # runs nodemon, watches for changes
```

#### Frontend only
```
cd ..\PrepAI-Frontend
npm install
npm start        # or `npm run dev` if using Vite
```

#### Full stack (backend + frontend)
```
cd ..\PrepAI-Backend
npm run dev      # runs backend and frontend concurrently
```

### 7️⃣ Verify It Works

```
# API health check (plain text)
curl http://localhost:5000/
# API health check (JSON)
curl http://localhost:5000/api/health
```

Open `http://localhost:3000` (or 5173 for Vite) in your browser to register/login and start an interview session.

## Scripts Overview (`package.json`)

| Script           | Functionality                              |
|------------------|-------------------------------------------|
| `dev`            | Runs backend and frontend concurrently   |
| `server`         | Nodemon hot-reload backend                |
| `client`         | Starts React/Vite frontend dev server     |
| `build`          | Builds production frontend bundle          |
| `install-client` | Installs frontend dependencies             |

## Contributing

1. Fork the repo  
2. Create a feature or bugfix branch: `git checkout -b my-feature`  
3. Make and test your changes locally  
4. Commit and push your branch  
5. Open a Pull Request against the `main` branch  

Keep `.env` out of your commits (covered in `.gitignore`). Update `.env.example` if you add secrets.

## License

This project is licensed under the **MIT License** – see the `LICENSE` file.

---

**PrepAI** offers smart, AI-powered, real-time interview practice with progress tracking — your personal AI interview coach anytime, anywhere. 🚀
```