const mongoose = require('mongoose');

const interviewSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: ''
  },
  experienceLevel: {
    type: String,
    enum: ['junior', 'mid', 'senior', 'lead'],
    required: true
  },
  interviewType: {
    type: String,
    enum: ['technical', 'behavioral', 'hr', 'mixed'],
    default: 'mixed'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  questionCount: {
    type: Number,
    default: 5
  },
  skills: [{
    type: String
  }],
  specificTopics: [{
    type: String
  }],
  customTopics: {
    type: String,
    default: ''
  },
  jobDescription: {
    type: String,
    default: ''
  },
  questions: [{
    question: String,
    answer: String,
    aiResponse: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  score: {
    technical: Number,
    communication: Number,
    overall: Number
  },
  feedback: {
    strengths: [String],
    improvements: [String],
    recommendations: [String]
  },
  duration: Number, // in minutes
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('InterviewSession', interviewSessionSchema);