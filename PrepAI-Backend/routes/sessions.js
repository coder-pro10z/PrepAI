const express = require('express');
const InterviewSession = require('../models/InterviewSession');
const auth = require('../middleware/auth');
const router = express.Router();

// Create new interview session
router.post('/', auth, async (req, res) => {
  try {
    const { 
      jobRole, 
      company,
      experienceLevel, 
      interviewType,
      difficulty,
      duration,
      questionCount,
      skills,
      jobDescription,
      specificTopics,
      customTopics,
      status
    } = req.body;
    
    const session = new InterviewSession({
      userId: req.user.userId,
      jobRole,
      company,
      experienceLevel,
      interviewType,
      difficulty,
      duration,
      questionCount,
      skills,
      jobDescription,
      specificTopics,
      customTopics,
      status: status || 'active'
    });
    
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's interview sessions
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await InterviewSession.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update session with Q&A
router.put('/:id/qa', auth, async (req, res) => {
  try {
    const { question, answer, aiResponse } = req.body;
    
    const session = await InterviewSession.findById(req.params.id);
    session.questions.push({ question, answer, aiResponse });
    await session.save();
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete session with feedback
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const { score, feedback, duration } = req.body;
    
    await InterviewSession.findByIdAndUpdate(req.params.id, {
      score,
      feedback,
      duration,
      status: 'completed'
    });
    
    res.json({ message: 'Session completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete interview session
router.delete('/:id', auth, async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    // Check if the session belongs to the authenticated user
    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this session' });
    }
    
    await InterviewSession.findByIdAndDelete(req.params.id);
    res.json({ message: 'Interview session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single session by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const session = await InterviewSession.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Interview session not found' });
    }
    
    // Check if the session belongs to the authenticated user
    if (session.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access this session' });
    }
    
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;