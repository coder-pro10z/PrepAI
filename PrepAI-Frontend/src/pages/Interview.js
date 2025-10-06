import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  Volume2,
  Clock,
  User,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  Star,
  FileText,
  Settings,
  Camera,
  StopCircle,
  ArrowRight,
  CheckCircle,
  Briefcase,
  Target,
  Users,
  Code,
  Zap
} from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles/Interview.css';

const Interview = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interviewTime, setInterviewTime] = useState(0);
  const [feedback, setFeedback] = useState({
    strengths: ['Clear communication', 'Good technical knowledge'],
    concerns: ['Could provide more specific examples'],
    skills: ['Problem Solving', 'Communication', 'Technical Skills']
  });

  // New interview setup states
  const [showSetup, setShowSetup] = useState(!sessionId || sessionId === 'new');
  const [setupStep, setSetupStep] = useState(1);
  const [interviewConfig, setInterviewConfig] = useState({
    jobRole: '',
    company: '',
    experienceLevel: 'mid',
    interviewType: 'technical',
    difficulty: 'medium',
    duration: 30,
    questionCount: 5,
    skills: [],
    jobDescription: '',
    specificTopics: [],
    customTopics: '',
    externalLinks: [],
    linkContent: '',
    generateFromLinks: false
  });

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Only initialize if not in setup mode and we have an existing session
    if (!showSetup && sessionId && sessionId !== 'new') {
      // Initialize socket connection
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);
      newSocket.emit('join-interview', sessionId);

      // Load session data and generate questions
      loadSessionData();

      // Initialize speech recognition
      initializeSpeechRecognition();

      // Start interview timer
      timerRef.current = setInterval(() => {
        setInterviewTime(prev => prev + 1);
      }, 1000);

      return () => {
        newSocket.close();
        if (timerRef.current) clearInterval(timerRef.current);
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }
  }, [sessionId, showSetup]);

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setAnswer(prev => prev + ' ' + finalTranscript);
          setTranscript(prev => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
    }
  };

  const loadSessionData = async () => {
    try {
      let currentSessionData = sessionData;

      // Get session details if we have a sessionId
      if (sessionId && sessionId !== 'new') {
        const sessionResponse = await axios.get(`http://localhost:5000/api/sessions`);
        const session = sessionResponse.data.find(s => s._id === sessionId);
        setSessionData(session);
        currentSessionData = session;
      }

      // Generate comprehensive questions with follow-ups
      const questionsResponse = await axios.post('http://localhost:5000/api/interviews/generate-questions', {
        jobRole: currentSessionData?.jobRole || interviewConfig?.jobRole || 'Software Developer',
        experienceLevel: currentSessionData?.experienceLevel || interviewConfig?.experienceLevel || 'mid',
        jobDescription: currentSessionData?.jobDescription || interviewConfig?.jobDescription || 'General software development role',
        companyType: currentSessionData?.companyType || interviewConfig?.company || 'general',
        interviewType: currentSessionData?.interviewType || interviewConfig?.interviewType || 'mixed',
        difficulty: currentSessionData?.difficulty || interviewConfig?.difficulty || 'medium',
        questionCount: currentSessionData?.questionCount || interviewConfig?.questionCount || 5,
        techStack: currentSessionData?.techStack || interviewConfig?.skills || [],
        skills: currentSessionData?.skills || interviewConfig?.skills || [],
        specificTopics: currentSessionData?.specificTopics || interviewConfig?.specificTopics || [],
        customTopics: currentSessionData?.customTopics || interviewConfig?.customTopics || ''
      });

      // Enhanced fallback questions with follow-ups
      const enhancedQuestions = questionsResponse.data.questions || [
        {
          question: "Tell me about yourself and your background in software development.",
          followUps: [
            "What specific technologies have you worked with most recently?",
            "Can you elaborate on your most significant achievement?",
            "How do you stay updated with new technologies?"
          ]
        },
        {
          question: "What interests you most about this role and our company?",
          followUps: [
            "What do you know about our company culture?",
            "How does this role align with your career goals?",
            "What questions do you have about the team structure?"
          ]
        },
        {
          question: "Describe a challenging technical problem you've solved recently.",
          followUps: [
            "What was your thought process for solving this?",
            "How did you handle any roadblocks you encountered?",
            "What would you do differently if you faced this problem again?"
          ]
        },
        {
          question: "How do you approach debugging a complex issue in production?",
          followUps: [
            "Can you walk me through your debugging methodology?",
            "How do you prioritize which issues to investigate first?",
            "Tell me about a time when debugging led to a larger architectural insight."
          ]
        },
        {
          question: "Describe your experience working in a team environment.",
          followUps: [
            "How do you handle disagreements with team members?",
            "Can you give an example of when you had to mentor someone?",
            "How do you ensure effective communication in remote teams?"
          ]
        },
        {
          question: "Where do you see yourself in the next 3-5 years?",
          followUps: [
            "What skills are you most excited to develop?",
            "How does this position fit into your long-term goals?",
            "What kind of impact do you want to make in your next role?"
          ]
        }
      ];

      setQuestions(enhancedQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error loading session:', error);
      // Enhanced fallback questions
      setQuestions([
        {
          question: "Tell me about yourself and your background.",
          followUps: [
            "What specific experiences have shaped your career path?",
            "What are you most proud of in your professional journey?"
          ]
        },
        {
          question: "What interests you most about this position?",
          followUps: [
            "How does this role align with your career goals?",
            "What excites you most about the challenges you'd face here?"
          ]
        },
        {
          question: "Describe a challenging situation you've faced and how you handled it.",
          followUps: [
            "What did you learn from this experience?",
            "How has this experience influenced your approach to similar challenges?"
          ]
        }
      ]);
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Setup audio analysis for visual feedback
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      setIsRecording(true);
      mediaRecorderRef.current.start();

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // Animate audio levels
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      updateAudioLevel();

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const voices = speechSynthesis.getVoices();

      // Find a more natural voice (prefer female voices for friendlier tone)
      const preferredVoice = voices.find(voice =>
        voice.name.includes('Google') ||
        voice.name.includes('Microsoft') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Moira')
      ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];

      const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]?.question);

      // More human-like speech settings
      utterance.voice = preferredVoice;
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for friendliness
      utterance.volume = 0.9;

      setIsPlaying(true);
      setIsSpeaking(true);

      utterance.onend = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsSpeaking(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;

    const currentQ = questions[currentQuestion];

    try {
      // Get AI response with follow-up logic
      const aiResponse = await axios.post('http://localhost:5000/api/interviews/ai-response', {
        question: currentQ.question,
        answer: answer,
        jobRole: sessionData?.jobRole || 'Software Developer',
        experienceLevel: sessionData?.experienceLevel || 'mid',
        conversationHistory: conversation,
        questionNumber: currentQuestion + 1,
        totalQuestions: questions.length
      });

      // Update conversation
      const newEntry = {
        question: currentQ.question,
        answer: answer,
        aiResponse: aiResponse.data.response,
        timestamp: formatTime(interviewTime),
        score: Math.floor(Math.random() * 30) + 70, // Mock scoring
        feedback: generateFeedback(answer)
      };

      setConversation([...conversation, newEntry]);

      // Save to session
      if (sessionId) {
        await axios.put(`http://localhost:5000/api/sessions/${sessionId}/qa`, newEntry);
      }

      // Check if we should ask a follow-up question
      const shouldAskFollowUp = Math.random() > 0.4 && currentQ.followUps && currentQ.followUps.length > 0;

      if (shouldAskFollowUp && !currentQ.askedFollowUp) {
        // Ask a follow-up question
        const followUpIndex = Math.floor(Math.random() * currentQ.followUps.length);
        const followUpQuestion = currentQ.followUps[followUpIndex];

        // Mark that we've asked a follow-up for this question
        questions[currentQuestion].askedFollowUp = true;

        // Add follow-up to conversation
        setTimeout(() => {
          const followUpEntry = {
            question: followUpQuestion,
            isFollowUp: true,
            timestamp: formatTime(interviewTime + 5)
          };
          setConversation(prev => [...prev, followUpEntry]);

          // Speak the follow-up question
          setTimeout(() => {
            if ('speechSynthesis' in window) {
              const voices = speechSynthesis.getVoices();
              const preferredVoice = voices.find(voice =>
                voice.name.includes('Google') || voice.name.includes('Microsoft')
              ) || voices[0];

              const utterance = new SpeechSynthesisUtterance(followUpQuestion);
              utterance.voice = preferredVoice;
              utterance.rate = 0.85;
              utterance.pitch = 1.1;
              utterance.volume = 0.9;

              setIsPlaying(true);
              setIsSpeaking(true);

              utterance.onend = () => {
                setIsPlaying(false);
                setIsSpeaking(false);
              };

              speechSynthesis.speak(utterance);
            }
          }, 1000);
        }, 2000);

        // Clear answer for follow-up
        setAnswer('');
        setTranscript('');
      } else {
        // Move to next main question or finish
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswer('');
          setTranscript('');
        } else {
          finishInterview();
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      // Continue anyway for demo purposes
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
        setTranscript('');
      } else {
        finishInterview();
      }
    }
  };

  const generateFeedback = (answer) => {
    const wordCount = answer.split(' ').length;
    const hasSpecificExamples = /example|instance|time when|experience|project/i.test(answer);
    const hasNumbers = /\d+/.test(answer);

    let feedback = [];

    if (wordCount > 100) {
      feedback.push("Good detailed response");
    } else if (wordCount < 50) {
      feedback.push("Consider providing more detail");
    }

    if (hasSpecificExamples) {
      feedback.push("Great use of specific examples");
    } else {
      feedback.push("Try to include specific examples");
    }

    if (hasNumbers) {
      feedback.push("Good use of quantifiable results");
    }

    return feedback.join(". ");
  };

  const finishInterview = async () => {
    try {
      const score = {
        technical: Math.floor(Math.random() * 40) + 60,
        communication: Math.floor(Math.random() * 40) + 60,
        overall: Math.floor(Math.random() * 40) + 60
      };

      const feedbackData = {
        strengths: ['Good technical knowledge', 'Clear communication'],
        improvements: ['Practice more system design', 'Work on confidence'],
        recommendations: ['Review core concepts', 'Practice mock interviews']
      };

      if (sessionId) {
        await axios.put(`http://localhost:5000/api/sessions/${sessionId}/complete`, {
          score,
          feedback: feedbackData,
          duration: Math.floor(interviewTime / 60)
        });
      }

      navigate('/history');
    } catch (error) {
      console.error('Error finishing interview:', error);
      navigate('/dashboard');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateQuestionsFromContent = async (content, links) => {
    try {
      // Try to call backend API to generate questions from content
      const response = await axios.post('http://localhost:5000/api/interviews/generate-from-content', {
        content,
        links,
        jobRole: interviewConfig.jobRole,
        interviewType: interviewConfig.interviewType,
        difficulty: interviewConfig.difficulty,
        questionCount: interviewConfig.questionCount
      });

      return response.data.questions;
    } catch (error) {
      console.error('Error generating questions from content:', error);

      // Fallback: Generate questions based on content analysis
      return generateFallbackQuestionsFromContent(content, links);
    }
  };

  const generateFallbackQuestionsFromContent = (content, links) => {
    const questions = [];
    const questionCount = interviewConfig.questionCount || 5;

    // Analyze content for keywords and generate relevant questions
    const contentLower = content.toLowerCase();
    const hasReact = contentLower.includes('react') || contentLower.includes('frontend');
    const hasNode = contentLower.includes('node') || contentLower.includes('backend');
    const hasLeadership = contentLower.includes('lead') || contentLower.includes('senior') || contentLower.includes('manager');
    const hasStartup = contentLower.includes('startup') || contentLower.includes('fast-paced');

    // Base questions
    const baseQuestions = [
      {
        id: 1,
        question: `Tell me about yourself and why you're interested in this ${interviewConfig.jobRole || 'position'}.`,
        category: "Introduction",
        followUps: ["What attracted you to this specific role?", "How does this align with your career goals?"]
      }
    ];

    // Add content-specific questions
    if (hasReact) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        question: "How would you approach building a scalable React application?",
        category: "Technical",
        followUps: ["What state management would you choose?", "How do you handle performance optimization?"]
      });
    }

    if (hasNode) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        question: "Describe your experience with Node.js and backend development.",
        category: "Technical",
        followUps: ["How do you handle error handling in Node.js?", "What's your approach to API design?"]
      });
    }

    if (hasLeadership) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        question: "Tell me about a time you had to lead a team through a challenging project.",
        category: "Leadership",
        followUps: ["How do you handle team conflicts?", "What's your management style?"]
      });
    }

    if (hasStartup) {
      baseQuestions.push({
        id: baseQuestions.length + 1,
        question: "How do you thrive in a fast-paced, startup environment?",
        category: "Culture Fit",
        followUps: ["How do you prioritize when everything is urgent?", "Tell me about adapting to rapid changes."]
      });
    }

    // Add generic questions to reach desired count
    const genericQuestions = [
      {
        id: 100,
        question: "Describe a challenging problem you solved recently.",
        category: "Problem Solving",
        followUps: ["What was your thought process?", "What would you do differently?"]
      },
      {
        id: 101,
        question: "How do you stay updated with new technologies?",
        category: "Learning",
        followUps: ["What resources do you use?", "How do you decide what to learn next?"]
      },
      {
        id: 102,
        question: "Tell me about a time you had to work with a difficult team member.",
        category: "Teamwork",
        followUps: ["How did you handle the situation?", "What did you learn from it?"]
      },
      {
        id: 103,
        question: "Where do you see yourself in 3-5 years?",
        category: "Career Goals",
        followUps: ["What skills do you want to develop?", "What kind of impact do you want to make?"]
      }
    ];

    // Combine and limit to requested count
    const allQuestions = [...baseQuestions, ...genericQuestions];
    return allQuestions.slice(0, questionCount).map((q, index) => ({
      ...q,
      id: index + 1
    }));
  };

  const startInterview = async () => {
    try {
      console.log('Starting interview with config:', interviewConfig);

      // Set the session data and hide setup
      const newSessionData = {
        _id: 'temp-session-' + Date.now(),
        ...interviewConfig
      };
      setSessionData(newSessionData);
      setShowSetup(false);

      let enhancedQuestions = [];

      // Generate questions from external content if enabled
      if (interviewConfig.generateFromLinks && (interviewConfig.externalLinks.length > 0 || interviewConfig.linkContent)) {
        console.log('Generating questions from external content...');
        enhancedQuestions = await generateQuestionsFromContent(
          interviewConfig.linkContent,
          interviewConfig.externalLinks
        );
      } else {
        // Default question generation
        enhancedQuestions = [
          {
            id: 1,
            question: `Tell me about yourself and your background in ${interviewConfig.jobRole || 'software development'}.`,
            category: "Introduction",
            difficulty: interviewConfig.difficulty || 'medium',
            followUps: [
              "What specific experiences have shaped your career path?",
              "What are you most proud of in your professional journey?"
            ]
          },
          {
            id: 2,
            question: `What interests you most about this ${interviewConfig.jobRole || 'position'}?`,
            category: "Motivation",
            difficulty: interviewConfig.difficulty || 'medium',
            followUps: [
              "How does this role align with your career goals?",
              "What excites you most about the challenges you'd face here?"
            ]
          },
          {
            id: 3,
            question: "Describe a challenging situation you've faced and how you handled it.",
            category: "Problem Solving",
            difficulty: interviewConfig.difficulty || 'medium',
            followUps: [
              "What did you learn from this experience?",
              "How has this experience influenced your approach to similar challenges?"
            ]
          }
        ];

        // Add more questions based on interview type
        if (interviewConfig.interviewType === 'technical' || interviewConfig.interviewType === 'mixed') {
          enhancedQuestions.push({
            id: 4,
            question: "Explain a technical concept you've recently learned or worked with.",
            category: "Technical Knowledge",
            followUps: [
              "How did you apply this in a real project?",
              "What challenges did you face while learning this?"
            ]
          });
        }

        if (interviewConfig.interviewType === 'behavioral' || interviewConfig.interviewType === 'mixed') {
          enhancedQuestions.push({
            id: 5,
            question: "Tell me about a time you had to work with a difficult team member.",
            category: "Teamwork",
            followUps: [
              "How do you typically handle disagreements?",
              "What did you learn from this experience?"
            ]
          });
        }

        // Limit questions based on questionCount
        const finalQuestions = enhancedQuestions.slice(0, interviewConfig.questionCount || 5);

        console.log('Setting questions:', finalQuestions);
        setQuestions(finalQuestions);

        // Initialize speech recognition and timer for the actual interview
        initializeSpeechRecognition();

        // Start interview timer
        timerRef.current = setInterval(() => {
          setInterviewTime(prev => prev + 1);
        }, 1000);

        console.log('Interview started successfully!');
      }

    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Error starting interview: ' + (error.response?.data?.message || error.message));
    }
  };

  // No loading screen needed for setup flow

  if (showSetup) {
    return (
      <div className="interview-setup-container">
        <div className="interview-setup-content">
          {/* Setup Header */}
          <div className="interview-setup-header">
            <h1 className="interview-setup-title">Create New Interview</h1>
            <p className="interview-setup-subtitle">
              Set up your personalized AI interview experience
            </p>
            <div className="interview-setup-progress">
              <div className="interview-progress-steps">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="interview-progress-step">
                    <div className={`interview-step-circle ${setupStep >= step ? 'interview-step-active' : ''}`}>
                      {setupStep > step ? <CheckCircle size={16} /> : step}
                    </div>
                    {step < 5 && <div className="interview-step-line" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="interview-setup-steps">
            {setupStep === 1 && (
              <div className="interview-step-content">
                <div className="interview-step-icon">
                  <Briefcase size={32} color="#bef264" />
                </div>
                <h2 className="interview-step-title">Job Details</h2>
                <p className="interview-step-description">
                  Tell us about the position you're preparing for
                </p>

                <div style={styles.formGrid} className="form-grid">
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Job Role *</label>
                    <input
                      type="text"
                      value={interviewConfig.jobRole}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, jobRole: e.target.value })}
                      placeholder="e.g., Senior Software Engineer"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Company</label>
                    <input
                      type="text"
                      value={interviewConfig.company}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, company: e.target.value })}
                      placeholder="e.g., Google, Microsoft, Startup"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Experience Level</label>
                    <select
                      value={interviewConfig.experienceLevel}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, experienceLevel: e.target.value })}
                      style={styles.select}
                    >
                      <option value="junior">Junior (0-2 years)</option>
                      <option value="mid">Mid-level (2-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                      <option value="lead">Lead/Principal (8+ years)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Job Description (Optional)</label>
                  <textarea
                    value={interviewConfig.jobDescription}
                    onChange={(e) => setInterviewConfig({ ...interviewConfig, jobDescription: e.target.value })}
                    placeholder="Paste the job description here for more personalized questions..."
                    style={styles.textarea}
                    rows="4"
                  />
                </div>
              </div>
            )}

            {setupStep === 2 && (
              <div style={styles.stepContent}>
                <div style={styles.stepIcon}>
                  <Target size={32} color="#bef264" />
                </div>
                <h2 style={styles.stepTitle}>Interview Type</h2>
                <p style={styles.stepDescription}>
                  Choose the type of interview you want to practice
                </p>

                <div style={styles.typeGrid} className="type-grid">
                  {[
                    {
                      type: 'technical',
                      title: 'Technical Interview',
                      desc: 'Coding, algorithms, system design',
                      icon: <Code size={24} />
                    },
                    {
                      type: 'behavioral',
                      title: 'Behavioral Interview',
                      desc: 'Leadership, teamwork, problem-solving',
                      icon: <Users size={24} />
                    },
                    {
                      type: 'mixed',
                      title: 'Mixed Interview',
                      desc: 'Combination of technical and behavioral',
                      icon: <Zap size={24} />
                    }
                  ].map((option) => (
                    <div
                      key={option.type}
                      style={{
                        ...styles.typeCard,
                        ...(interviewConfig.interviewType === option.type ? styles.typeCardActive : {})
                      }}
                      onClick={() => setInterviewConfig({ ...interviewConfig, interviewType: option.type })}
                    >
                      <div style={styles.typeIcon}>{option.icon}</div>
                      <h3 style={styles.typeTitle}>{option.title}</h3>
                      <p style={styles.typeDesc}>{option.desc}</p>
                    </div>
                  ))}
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Difficulty Level</label>
                    <select
                      value={interviewConfig.difficulty}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, difficulty: e.target.value })}
                      style={styles.select}
                    >
                      <option value="easy">Easy (Beginner friendly)</option>
                      <option value="medium">Medium (Standard level)</option>
                      <option value="hard">Hard (Advanced level)</option>
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Number of Questions</label>
                    <select
                      value={interviewConfig.questionCount}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, questionCount: parseInt(e.target.value) })}
                      style={styles.select}
                    >
                      <option value={3}>3 questions (Quick)</option>
                      <option value={5}>5 questions (Standard)</option>
                      <option value={8}>8 questions (Extended)</option>
                      <option value={10}>10 questions (Comprehensive)</option>
                    </select>
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Interview Duration</label>
                  <select
                    value={interviewConfig.duration}
                    onChange={(e) => setInterviewConfig({ ...interviewConfig, duration: parseInt(e.target.value) })}
                    style={styles.select}
                  >
                    <option value={15}>15 minutes (Quick practice)</option>
                    <option value={30}>30 minutes (Standard)</option>
                    <option value={45}>45 minutes (Extended)</option>
                    <option value={60}>60 minutes (Full interview)</option>
                  </select>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div style={styles.stepContent}>
                <div style={styles.stepIcon}>
                  <Target size={32} color="#bef264" />
                </div>
                <h2 style={styles.stepTitle}>Specific Topics</h2>
                <p style={styles.stepDescription}>
                  Choose specific topics or areas you want to focus on during the interview
                </p>

                <div style={styles.topicsContainer}>
                  <div style={styles.topicCategory}>
                    <h3 style={styles.categoryTitle}>Technical Topics</h3>
                    <div style={styles.topicsGrid}>
                      {[
                        'Data Structures & Algorithms',
                        'System Design',
                        'Database Design',
                        'API Design',
                        'Frontend Performance',
                        'Backend Architecture',
                        'Security Best Practices',
                        'Testing Strategies',
                        'Code Review Process',
                        'Debugging Techniques'
                      ].map((topic) => (
                        <div
                          key={topic}
                          style={{
                            ...styles.topicChip,
                            ...(interviewConfig.specificTopics?.includes(topic) ? styles.topicChipActive : {})
                          }}
                          onClick={() => {
                            const topics = interviewConfig.specificTopics?.includes(topic)
                              ? interviewConfig.specificTopics.filter(t => t !== topic)
                              : [...(interviewConfig.specificTopics || []), topic];
                            setInterviewConfig({ ...interviewConfig, specificTopics: topics });
                          }}
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.topicCategory}>
                    <h3 style={styles.categoryTitle}>Behavioral Topics</h3>
                    <div style={styles.topicsGrid}>
                      {[
                        'Leadership Experience',
                        'Conflict Resolution',
                        'Team Collaboration',
                        'Project Management',
                        'Decision Making',
                        'Problem Solving',
                        'Communication Skills',
                        'Adaptability',
                        'Time Management',
                        'Innovation & Creativity'
                      ].map((topic) => (
                        <div
                          key={topic}
                          style={{
                            ...styles.topicChip,
                            ...(interviewConfig.specificTopics?.includes(topic) ? styles.topicChipActive : {})
                          }}
                          onClick={() => {
                            const topics = interviewConfig.specificTopics?.includes(topic)
                              ? interviewConfig.specificTopics.filter(t => t !== topic)
                              : [...(interviewConfig.specificTopics || []), topic];
                            setInterviewConfig({ ...interviewConfig, specificTopics: topics });
                          }}
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={styles.customTopicSection}>
                    <h3 style={styles.categoryTitle}>Custom Topics</h3>
                    <p style={styles.customTopicDesc}>
                      Add any specific topics or areas you want to be asked about
                    </p>
                    <textarea
                      value={interviewConfig.customTopics || ''}
                      onChange={(e) => setInterviewConfig({ ...interviewConfig, customTopics: e.target.value })}
                      placeholder="e.g., React Hooks, GraphQL, Microservices, Agile methodology..."
                      style={styles.textarea}
                      rows="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {setupStep === 4 && (
              <div style={styles.stepContent}>
                <div style={styles.stepIcon}>
                  <Star size={32} color="#bef264" />
                </div>
                <h2 style={styles.stepTitle}>Skills & Summary</h2>
                <p style={styles.stepDescription}>
                  Select your key skills and review your interview configuration
                </p>

                <div style={styles.skillsContainer}>
                  {[
                    // 🧠 Core Programming Languages
                    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust',

                    // 🎨 Frontend Technologies
                    'React', 'Angular', 'Vue.js', 'Svelte', 'Next.js', 'Redux', 'RxJS',
                    'HTML5', 'CSS3', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'Material UI', 'Angular Material',

                    // 🧱 Backend Technologies
                    'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot', 'NestJS', 'GraphQL', 'REST APIs',

                    // 🗄️ Databases
                    'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Firebase',

                    // ⚙️ DevOps & Infrastructure
                    'Git', 'GitHub Actions', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'Jenkins',

                    // ☁️ Cloud Platforms
                    'AWS', 'Azure', 'Google Cloud Platform', 'Vercel', 'Netlify', 'Heroku',

                    // 🧮 Computer Science Fundamentals
                    'Data Structures', 'Algorithms', 'System Design', 'Concurrency', 'Memory Management',

                    // 📊 Analytics & Monitoring
                    'Google Analytics', 'Mixpanel', 'Segment', 'Prometheus', 'Grafana', 'LogRocket',

                    // 🧠 AI & ML (Optional but valuable)
                    'Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Model Deployment',

                    // 🧪 Testing & Quality
                    'Jest', 'Mocha', 'Cypress', 'Playwright', 'Testing Library', 'Postman',

                    // 🧩 Architecture & Patterns
                    'Microservices', 'Monorepos', 'MVC', 'MVVM', 'Modular Design', 'Event-Driven Architecture',

                    // 🎯 Soft Skills
                    'Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability',

                    // 🧰 Tools & Utilities
                    'Webpack', 'Babel', 'ESLint', 'Prettier', 'VS Code', 'Figma', 'Storybook',

                    // 🔐 Security & Auth
                    'OAuth', 'JWT', 'SSO', 'HTTPS', 'CORS', 'Rate Limiting', 'Encryption',

                    // 🧭 Project & Product Skills
                    'Agile', 'Scrum', 'JIRA', 'Trello', 'Product Thinking', 'User-Centered Design'
                  ].map((skill) => (
                    <div
                      key={skill}
                      style={{
                        ...styles.skillChip,
                        ...(interviewConfig.skills.includes(skill) ? styles.skillChipActive : {})
                      }}
                      onClick={() => {
                        const skills = interviewConfig.skills.includes(skill)
                          ? interviewConfig.skills.filter(s => s !== skill)
                          : [...interviewConfig.skills, skill];
                        setInterviewConfig({ ...interviewConfig, skills });
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <div style={styles.summaryCard}>
                  <h3 style={styles.summaryTitle}>Interview Summary</h3>
                  <div style={styles.summaryGrid} className="summary-grid">
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Role:</span>
                      <span>{interviewConfig.jobRole || 'Not specified'}</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Type:</span>
                      <span>{interviewConfig.interviewType}</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Difficulty:</span>
                      <span>{interviewConfig.difficulty}</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Questions:</span>
                      <span>{interviewConfig.questionCount} questions</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Duration:</span>
                      <span>{interviewConfig.duration} minutes</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Skills:</span>
                      <span>{interviewConfig.skills.length} selected</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Topics:</span>
                      <span>{(interviewConfig.specificTopics?.length || 0)} selected</span>
                    </div>
                    <div style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>Company:</span>
                      <span>{interviewConfig.company || 'General'}</span>
                    </div>
                  </div>

                  {interviewConfig.specificTopics?.length > 0 && (
                    <div style={styles.selectedTopics}>
                      <h4 style={styles.selectedTopicsTitle}>Selected Topics:</h4>
                      <div style={styles.selectedTopicsList}>
                        {interviewConfig.specificTopics.map((topic, index) => (
                          <span key={index} style={styles.selectedTopicTag}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {interviewConfig.customTopics && (
                    <div style={styles.customTopicsPreview}>
                      <h4 style={styles.selectedTopicsTitle}>Custom Topics:</h4>
                      <p style={styles.customTopicsText}>{interviewConfig.customTopics}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {setupStep === 5 && (
              <div className="interview-step-content">
                <div className="interview-step-icon">
                  <FileText size={32} color="#bef264" />
                </div>
                <h2 className="interview-step-title">External Content & Links</h2>
                <p className="interview-step-description">
                  Add job posting links, company pages, or question sets to generate personalized questions
                </p>

                <div className="interview-form-group" style={{ marginBottom: '24px' }}>
                  <label className="interview-label">
                    <input
                      type="checkbox"
                      checked={interviewConfig.generateFromLinks}
                      onChange={(e) => setInterviewConfig({
                        ...interviewConfig,
                        generateFromLinks: e.target.checked
                      })}
                      style={{ marginRight: '8px' }}
                    />
                    Generate questions from external content
                  </label>
                </div>

                {interviewConfig.generateFromLinks && (
                  <>
                    <div className="interview-form-group">
                      <label className="interview-label">External Links</label>
                      <div style={{ marginBottom: '12px' }}>
                        <input
                          type="url"
                          placeholder="https://example.com/job-posting or interview-experience-link"
                          className="interview-input"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              const newLink = e.target.value.trim();
                              if (!interviewConfig.externalLinks.includes(newLink)) {
                                setInterviewConfig({
                                  ...interviewConfig,
                                  externalLinks: [...interviewConfig.externalLinks, newLink]
                                });
                              }
                              e.target.value = '';
                            }
                          }}
                        />
                        <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                          Press Enter to add links: job postings, company pages, interview experiences, question sets
                        </p>
                      </div>

                      {interviewConfig.externalLinks.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <h4 style={{ color: '#edecf0', fontSize: '14px', marginBottom: '8px' }}>Added Links:</h4>
                          {interviewConfig.externalLinks.map((link, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: '#27272a',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              marginBottom: '8px'
                            }}>
                              <span style={{
                                color: '#bef264',
                                fontSize: '13px',
                                wordBreak: 'break-all',
                                flex: 1
                              }}>
                                {link}
                              </span>
                              <button
                                onClick={() => {
                                  setInterviewConfig({
                                    ...interviewConfig,
                                    externalLinks: interviewConfig.externalLinks.filter((_, i) => i !== index)
                                  });
                                }}
                                style={{
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '4px 8px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  marginLeft: '8px'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="interview-form-group">
                      <label className="interview-label">Or paste content directly</label>
                      <textarea
                        value={interviewConfig.linkContent}
                        onChange={(e) => setInterviewConfig({
                          ...interviewConfig,
                          linkContent: e.target.value
                        })}
                        placeholder="Paste job description, company information, or specific questions you want to practice..."
                        className="interview-textarea"
                        rows="6"
                      />
                    </div>

                    <div className="interview-form-grid">
                      <div className="interview-form-group">
                        <label className="interview-label">Number of Questions</label>
                        <select
                          value={interviewConfig.questionCount}
                          onChange={(e) => setInterviewConfig({
                            ...interviewConfig,
                            questionCount: parseInt(e.target.value)
                          })}
                          className="interview-select"
                        >
                          <option value={3}>3 Questions</option>
                          <option value={5}>5 Questions</option>
                          <option value={8}>8 Questions</option>
                          <option value={10}>10 Questions</option>
                          <option value={15}>15 Questions</option>
                          <option value={20}>20 Questions</option>
                        </select>
                      </div>

                      <div className="interview-form-group">
                        <label className="interview-label">Focus Area</label>
                        <select
                          value={interviewConfig.interviewType}
                          onChange={(e) => setInterviewConfig({
                            ...interviewConfig,
                            interviewType: e.target.value
                          })}
                          className="interview-select"
                        >
                          <option value="technical">Technical Questions</option>
                          <option value="behavioral">Behavioral Questions</option>
                          <option value="mixed">Mixed Questions</option>
                          <option value="company-specific">Company-Specific</option>
                        </select>
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(190, 242, 100, 0.1)',
                      border: '1px solid rgba(190, 242, 100, 0.3)',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '16px'
                    }}>
                      <h4 style={{ color: '#bef264', fontSize: '14px', marginBottom: '8px' }}>
                        💡 How it works:
                      </h4>
                      <ul style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: '1.5', margin: 0, paddingLeft: '16px' }}>
                        <li><strong>Job Postings:</strong> Add URLs to generate role-specific questions</li>
                        <li><strong>Company Pages:</strong> Include for culture and value-based questions</li>
                        <li><strong>Interview Experiences:</strong> Paste interview experiences to practice similar questions</li>
                        <li><strong>Custom Content:</strong> Add any specific content for targeted practice</li>
                        <li><strong>AI Analysis:</strong> System analyzes content and creates relevant questions</li>
                      </ul>
                    </div>
                  </>
                )}

                {!interviewConfig.generateFromLinks && (
                  <div style={{
                    background: '#27272a',
                    borderRadius: '8px',
                    padding: '24px',
                    textAlign: 'center'
                  }}>
                    <p style={{ color: '#a1a1aa', fontSize: '14px', margin: 0 }}>
                      Enable "Generate questions from external content" to use this feature, or continue with the standard interview setup.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Setup Actions */}
          <div style={styles.setupActions}>
            {setupStep > 1 && (
              <button
                onClick={() => setSetupStep(setupStep - 1)}
                style={styles.backBtn}
              >
                Back
              </button>
            )}

            {setupStep < 5 ? (
              <button
                onClick={() => setSetupStep(setupStep + 1)}
                style={styles.nextBtn}
                disabled={setupStep === 1 && !interviewConfig.jobRole}
              >
                Next Step
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={startInterview}
                style={styles.startBtn}
                disabled={!interviewConfig.jobRole}
              >
                Start Interview
                <Play size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>
            {sessionData?.jobRole || 'Software Developer'} Interview
          </h1>
          <div style={styles.headerInfo}>
            <Clock size={16} />
            <span>{formatTime(interviewTime)}</span>
            <span style={styles.separator}>•</span>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.headerBtn}>
            <Camera size={16} />
            Camera
          </button>
          <button style={styles.headerBtn}>
            <Settings size={16} />
            Settings
          </button>
        </div>
      </div>

      {/* Main Interview Area */}
      <div style={styles.interviewContainer} className="interview-container">
        {/* Left Panel - Interview */}
        <div style={styles.interviewMain}>
          {/* AI Avatar Section */}
          <div style={styles.avatarSection}>
            <div style={{
              ...styles.avatarContainer,
              ...(isSpeaking ? styles.avatarSpeaking : {})
            }}>
              <div style={styles.avatarInner}>
                <User size={20} color="#bef264" />
              </div>
            </div>
            <div style={styles.avatarInfo}>
              <h3 style={styles.avatarName}>AI Interviewer</h3>
              <p style={styles.avatarRole}>Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>

          {/* Question Display */}
          <div style={styles.questionSection}>
            <div style={styles.questionCard}>
              <div style={styles.questionHeader}>
                <MessageSquare size={20} color="#bef264" />
                <span>Current Question</span>
              </div>
              <p style={styles.questionText}>
                {questions[currentQuestion]?.question}
              </p>
              <div style={styles.questionActions}>
                <button
                  style={styles.speakBtn}
                  onClick={isPlaying ? stopSpeaking : speakQuestion}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Stop' : 'Listen'}
                </button>
                <button style={styles.volumeBtn}>
                  <Volume2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Recording Controls */}
          <div style={styles.recordingSection}>
            <div style={styles.recordingControls}>
              <button
                style={{
                  ...styles.recordBtn,
                  ...(isRecording ? styles.recordBtnActive : {})
                }}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <div style={styles.recordingStatus}>
                {isRecording ? (
                  <div style={styles.recordingIndicator}>
                    <div style={styles.recordingDot}></div>
                    <span>Recording...</span>
                  </div>
                ) : (
                  <span style={styles.recordingText}>Click to record</span>
                )}
              </div>
            </div>
          </div>

          {/* Answer Input */}
          <div style={styles.answerSection}>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={styles.answerInput}
              placeholder="Type your answer here or use voice recording..."
              rows="6"
            />
            <div style={styles.answerActions}>
              <button
                onClick={() => setAnswer('')}
                style={styles.clearBtn}
              >
                Clear
              </button>
              <button
                onClick={submitAnswer}
                style={styles.submitBtn}
                disabled={!answer.trim()}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Feedback & Transcript */}
        <div style={styles.interviewSidebar}>
          {/* Timer Display */}
          <div style={styles.timerSection}>
            <div style={styles.timerDisplay}>
              <Clock size={24} color="#bef264" />
              <div style={styles.timerText}>
                <div style={styles.timerTime}>{formatTime(interviewTime)}</div>
                <div style={styles.timerLabel}>Interview Time</div>
              </div>
            </div>
          </div>

          {/* Live Transcript */}
          <div style={styles.transcriptSection}>
            <h3 style={styles.sectionTitle}>
              <FileText size={20} />
              Live Transcript
            </h3>
            <div style={styles.transcriptArea}>
              {conversation.map((entry, index) => (
                <div key={index} style={styles.transcriptEntry}>
                  <div style={styles.transcriptQuestion}>
                    <strong>Q:</strong> {entry.question}
                  </div>
                  <div style={styles.transcriptAnswer}>
                    <strong>A:</strong> {entry.answer}
                  </div>
                  <div style={styles.transcriptTime}>{entry.timestamp}</div>
                </div>
              ))}
              {transcript && (
                <div style={styles.liveTranscript}>
                  <strong>Live:</strong> {transcript}
                </div>
              )}
            </div>
          </div>

          {/* Live Feedback */}
          <div style={styles.feedbackSection}>
            <h3 style={styles.sectionTitle}>
              <Star size={16} />
              Live Feedback
            </h3>

            <div style={styles.feedbackItem}>
              <div style={styles.feedbackHeader}>
                <ThumbsUp size={14} color="#22c55e" />
                <span>Strengths</span>
              </div>
              <div style={styles.feedbackList}>
                {feedback.strengths.slice(0, 2).map((strength, index) => (
                  <div key={index} style={styles.feedbackListItem}>{strength}</div>
                ))}
              </div>
            </div>

            <div style={styles.feedbackItem}>
              <div style={styles.feedbackHeader}>
                <AlertTriangle size={14} color="#f59e0b" />
                <span>Areas to Improve</span>
              </div>
              <div style={styles.feedbackList}>
                {feedback.concerns.slice(0, 1).map((concern, index) => (
                  <div key={index} style={styles.feedbackListItem}>{concern}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Interview Progress */}
          <div style={styles.progressSection}>
            <h3 style={styles.sectionTitle}>Progress</h3>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`
                }}
              />
            </div>
            <div style={styles.progressText}>
              {currentQuestion + 1} of {questions.length} questions completed
            </div>
          </div>

          {/* End Interview Button */}
          <div style={styles.endSection}>
            <button
              style={styles.endBtn}
              onClick={finishInterview}
            >
              <StopCircle size={16} />
              End Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#09090b',
    color: '#edecf0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  // Setup Styles
  setupContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  },
  setupContent: {
    width: '100%',
    maxWidth: '900px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid #27272a',
    padding: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  setupHeader: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  setupTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#edecf0',
    margin: '0 0 6px 0',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  setupSubtitle: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: '0 0 20px 0'
  },
  setupProgress: {
    display: 'flex',
    justifyContent: 'center'
  },
  progressSteps: {
    display: 'flex',
    alignItems: 'center',
    gap: '0'
  },
  progressStep: {
    display: 'flex',
    alignItems: 'center'
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#27272a',
    border: '2px solid #3f3f46',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600',
    color: '#71717a',
    transition: 'all 0.3s ease'
  },
  stepActive: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    borderColor: '#bef264',
    color: '#09090b'
  },
  stepLine: {
    width: '40px',
    height: '2px',
    background: '#27272a',
    margin: '0 6px'
  },
  setupSteps: {
    marginBottom: '24px'
  },
  stepContent: {
    textAlign: 'center'
  },
  stepIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  stepTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 6px 0'
  },
  stepDescription: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: '0 0 20px 0'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '16px'
  },
  formGroup: {
    textAlign: 'left'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#edecf0',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#edecf0',
    fontSize: '13px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  textarea: {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#edecf0',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
  },
  typeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  typeCard: {
    background: '#27272a',
    border: '2px solid #3f3f46',
    borderRadius: '12px',
    padding: '24px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  },
  typeCardActive: {
    background: 'rgba(190, 242, 100, 0.1)',
    borderColor: '#bef264',
    transform: 'translateY(-2px)'
  },
  typeIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '12px',
    color: '#bef264'
  },
  typeTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 8px 0'
  },
  typeDesc: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: 0
  },
  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '32px',
    justifyContent: 'center'
  },
  skillChip: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '14px',
    color: '#edecf0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none'
  },
  skillChipActive: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    borderColor: '#bef264',
    color: '#09090b',
    transform: 'translateY(-1px)'
  },
  topicsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  topicCategory: {
    textAlign: 'left'
  },
  categoryTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 16px 0'
  },
  topicsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  topicChip: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    color: '#edecf0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    textAlign: 'center'
  },
  topicChipActive: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    borderColor: '#bef264',
    color: '#09090b',
    transform: 'translateY(-1px)'
  },
  customTopicSection: {
    textAlign: 'left'
  },
  customTopicDesc: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: '0 0 12px 0'
  },
  selectedTopics: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #27272a'
  },
  selectedTopicsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 12px 0'
  },
  selectedTopicsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  selectedTopicTag: {
    background: '#27272a',
    color: '#bef264',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  customTopicsPreview: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #27272a'
  },
  customTopicsText: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: 0,
    fontStyle: 'italic'
  },
  summaryCard: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'left'
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 16px 0'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#a1a1aa',
    fontWeight: '500'
  },
  setupActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px'
  },
  backBtn: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '12px 24px',
    color: '#edecf0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  },
  nextBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    marginLeft: 'auto'
  },
  startBtn: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '16px 32px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    marginLeft: 'auto'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#09090b'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #27272a',
    borderTop: '4px solid #bef264',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem'
  },
  loadingText: {
    color: '#a1a1aa',
    fontSize: '16px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 32px',
    background: '#18181b',
    borderBottom: '1px solid #27272a'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#edecf0',
    margin: 0
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#a1a1aa',
    fontSize: '14px'
  },
  separator: {
    color: '#71717a'
  },
  headerRight: {
    display: 'flex',
    gap: '12px'
  },
  headerBtn: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '8px 16px',
    color: '#edecf0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  interviewContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    height: 'calc(100vh - 80px)',
    gap: '1px',
    background: '#27272a'
  },
  interviewMain: {
    background: '#09090b',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflow: 'hidden'
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    background: '#18181b',
    borderRadius: '8px',
    border: '1px solid #27272a'
  },
  avatarContainer: {
    position: 'relative',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    flexShrink: 0
  },
  avatarSpeaking: {
    animation: 'avatarSpeak 0.8s ease-in-out infinite alternate'
  },
  avatarInner: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    background: '#18181b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  speakingIndicator: {
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  waveform: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    height: '20px'
  },
  waveformBar: {
    width: '3px',
    background: '#bef264',
    borderRadius: '2px',
    animation: 'waveform 1s ease-in-out infinite'
  },
  avatarInfo: {
    flex: 1
  },
  avatarName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 2px 0'
  },
  avatarRole: {
    fontSize: '12px',
    color: '#a1a1aa',
    margin: 0
  },
  questionSection: {
    flex: 1
  },
  questionCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '16px'
  },
  questionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    color: '#bef264',
    fontSize: '14px',
    fontWeight: '600'
  },
  questionText: {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#edecf0',
    marginBottom: '12px'
  },
  questionActions: {
    display: 'flex',
    gap: '12px'
  },
  speakBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600'
  },
  volumeBtn: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '10px',
    color: '#edecf0',
    cursor: 'pointer'
  },
  recordingSection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px'
  },
  recordingControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px'
  },
  recordBtn: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: '#27272a',
    border: '2px solid #3f3f46',
    color: '#edecf0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  recordBtnActive: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    borderColor: '#ef4444',
    animation: 'recordingPulse 1.5s ease-in-out infinite'
  },
  recordingStatus: {
    textAlign: 'center'
  },
  recordingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500'
  },
  recordingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#ef4444',
    animation: 'pulse 1s ease-in-out infinite'
  },
  recordingText: {
    color: '#a1a1aa',
    fontSize: '14px'
  },
  answerSection: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '16px',
    flex: 1
  },
  answerInput: {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px',
    color: '#edecf0',
    fontSize: '14px',
    resize: 'none',
    outline: 'none',
    marginBottom: '12px',
    fontFamily: 'inherit',
    minHeight: '80px',
    maxHeight: '120px'
  },
  answerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px'
  },
  clearBtn: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '12px 24px',
    color: '#edecf0',
    cursor: 'pointer',
    fontSize: '14px'
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  },
  interviewSidebar: {
    background: '#18181b',
    padding: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  timerSection: {
    background: '#27272a',
    borderRadius: '8px',
    padding: '12px'
  },
  timerDisplay: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  timerText: {
    flex: 1
  },
  timerTime: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#bef264',
    fontFamily: 'monospace'
  },
  timerLabel: {
    fontSize: '12px',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  transcriptSection: {
    flex: 1
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  transcriptArea: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    padding: '8px',
    maxHeight: '120px',
    overflow: 'auto',
    fontSize: '11px',
    lineHeight: '1.4'
  },
  transcriptEntry: {
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #27272a'
  },
  transcriptQuestion: {
    color: '#60a5fa',
    marginBottom: '4px'
  },
  transcriptAnswer: {
    color: '#bef264',
    marginBottom: '4px'
  },
  transcriptTime: {
    color: '#71717a',
    fontSize: '10px'
  },
  liveTranscript: {
    color: '#f59e0b',
    fontStyle: 'italic'
  },
  feedbackSection: {},
  feedbackItem: {
    marginBottom: '16px'
  },
  feedbackHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0'
  },
  feedbackList: {
    margin: 0,
    padding: 0,
    color: '#a1a1aa'
  },
  feedbackListItem: {
    fontSize: '11px',
    marginBottom: '3px',
    paddingLeft: '12px',
    position: 'relative'
  },
  skillsSection: {
    marginTop: '16px'
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginTop: '8px'
  },
  skillChip: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '16px',
    padding: '6px 12px',
    fontSize: '11px',
    textAlign: 'center',
    color: '#edecf0'
  },
  progressSection: {},
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#27272a',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #bef264, #84cc16)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressText: {
    fontSize: '12px',
    color: '#a1a1aa'
  },
  endSection: {},
  endBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600'
  }
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes avatarSpeak {
    0% { transform: scale(1); }
    100% { transform: scale(1.05); box-shadow: 0 0 20px rgba(190, 242, 100, 0.5); }
  }
  
  @keyframes waveform {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }
  
  @keyframes recordingPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  /* Hover effects */
  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
  
  input:focus, select:focus, textarea:focus {
    border-color: #bef264 !important;
    box-shadow: 0 0 0 3px rgba(190, 242, 100, 0.1);
  }
  
  /* Responsive design */
  @media (max-width: 1024px) {
    .interview-container {
      grid-template-columns: 1fr !important;
    }
    
    .setup-content {
      margin: 10px !important;
      padding: 20px !important;
    }
    
    .form-grid {
      grid-template-columns: 1fr !important;
    }
    
    .type-grid {
      grid-template-columns: 1fr !important;
    }
    
    .summary-grid {
      grid-template-columns: 1fr !important;
    }
  }
  
  @media (max-width: 640px) {
    .setup-title {
      font-size: 24px !important;
    }
    
    .step-title {
      font-size: 20px !important;
    }
    
    .progress-steps {
      flex-direction: column !important;
      gap: 8px !important;
    }
    
    .step-line {
      width: 2px !important;
      height: 20px !important;
      margin: 4px 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Interview;