# AI Interview Platform

An AI-powered interview practice platform built with the MERN stack that provides realistic interview experiences tailored to specific job roles and experience levels.

## Features

- **Role-Based Interviews**: Customized questions based on job role and experience level
- **AI Interviewer**: Interactive AI that asks follow-up questions and provides feedback
- **Session History**: Track your progress and review past interview sessions
- **Real-time Experience**: Live chat-like interface for natural conversation flow
- **Performance Analytics**: Get scored feedback on technical and communication skills

## Tech Stack

- **Frontend**: React, React Router, Socket.io Client
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI GPT API
- **Authentication**: JWT-based auth system

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- OpenAI API key

### Installation

1. **Clone and install dependencies**:
```bash
npm install
cd client && npm install
```

2. **Environment Setup**:
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/ai-interview
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
```

3. **Start MongoDB**:
Make sure MongoDB is running on your system

4. **Run the application**:
```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## Usage

1. **Register/Login**: Create an account or login
2. **Start Interview**: Fill in job role, experience level, and job description
3. **Practice**: Answer AI-generated questions and receive real-time feedback
4. **Review**: Check your interview history and performance analytics

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Interviews
- `POST /api/interviews/generate-questions` - Generate role-based questions
- `POST /api/interviews/ai-response` - Get AI interviewer response

### Sessions
- `POST /api/sessions` - Create new interview session
- `GET /api/sessions` - Get user's interview history
- `PUT /api/sessions/:id/qa` - Update session with Q&A
- `PUT /api/sessions/:id/complete` - Complete session with feedback

## Future Enhancements

- Voice interaction support
- Video interview simulation
- Industry-specific question banks
- Advanced scoring algorithms
- Resume analysis integration
- Mock coding challenges
- Team interview simulations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for learning and development purposes.