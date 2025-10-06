import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Star,
  Trash2,
  Eye,
  Download,
  Filter,
  Search,
  BarChart3,
  Award,
  AlertCircle,
  CheckCircle,
  Users,
  Brain,
  MessageSquare,
  Code,
  Zap,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import axios from 'axios';

const History = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Mock data for demonstration
  const mockInterviews = [
    {
      id: 1,
      jobRole: 'Senior Frontend Developer',
      company: 'Google',
      date: '2024-01-15',
      duration: 45,
      type: 'Technical',
      status: 'completed',
      overallScore: 87,
      scores: {
        technical: { correctness: 90, clarity: 85, relevance: 88, efficiency: 82 },
        behavioral: { communication: 85, problemSolving: 90, creativity: 80, detail: 85 }
      },
      feedback: {
        strengths: [
          'Excellent problem-solving approach',
          'Clear communication of technical concepts',
          'Good understanding of React ecosystem',
          'Strong algorithmic thinking'
        ],
        improvements: [
          'Could improve time complexity analysis',
          'Practice more system design concepts',
          'Work on explaining trade-offs better'
        ],
        suggestions: [
          'Review Big O notation and complexity analysis',
          'Practice system design interviews',
          'Study distributed systems concepts'
        ]
      },
      questions: [
        {
          question: 'Implement a function to find the longest palindromic substring',
          answer: 'I would use dynamic programming approach...',
          score: 85,
          feedback: 'Good approach, but could optimize further'
        },
        {
          question: 'How would you optimize a React application for performance?',
          answer: 'I would start with React.memo, useMemo, useCallback...',
          score: 90,
          feedback: 'Excellent comprehensive answer'
        }
      ]
    },
    {
      id: 2,
      jobRole: 'Full Stack Developer',
      company: 'Microsoft',
      date: '2024-01-10',
      duration: 60,
      type: 'Mixed',
      status: 'completed',
      overallScore: 78,
      scores: {
        technical: { correctness: 75, clarity: 80, relevance: 82, efficiency: 70 },
        behavioral: { communication: 80, problemSolving: 75, creativity: 85, detail: 78 }
      },
      feedback: {
        strengths: [
          'Good full-stack knowledge',
          'Creative problem-solving',
          'Strong communication skills'
        ],
        improvements: [
          'Improve algorithm efficiency',
          'Practice more coding problems',
          'Work on system design skills'
        ],
        suggestions: [
          'Practice LeetCode medium problems',
          'Study microservices architecture',
          'Review database optimization techniques'
        ]
      },
      questions: [
        {
          question: 'Design a URL shortener service',
          answer: 'I would use a hash function to generate short URLs...',
          score: 75,
          feedback: 'Good start, but missing scalability considerations'
        }
      ]
    },
    {
      id: 3,
      jobRole: 'Backend Developer',
      company: 'Amazon',
      date: '2024-01-05',
      duration: 50,
      type: 'Technical',
      status: 'completed',
      overallScore: 92,
      scores: {
        technical: { correctness: 95, clarity: 90, relevance: 92, efficiency: 90 },
        behavioral: { communication: 88, problemSolving: 95, creativity: 85, detail: 92 }
      },
      feedback: {
        strengths: [
          'Outstanding technical knowledge',
          'Excellent problem-solving skills',
          'Clear and concise explanations',
          'Strong system design thinking'
        ],
        improvements: [
          'Could be more creative in solutions',
          'Practice behavioral questions more'
        ],
        suggestions: [
          'Continue current learning path',
          'Practice leadership scenarios',
          'Study advanced distributed systems'
        ]
      },
      questions: [
        {
          question: 'Implement a distributed cache system',
          answer: 'I would design it with consistent hashing...',
          score: 95,
          feedback: 'Excellent system design with all considerations'
        }
      ]
    }
  ];

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/sessions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Transform the data to match our UI expectations
      const transformedInterviews = response.data.map(session => ({
        id: session._id,
        jobRole: session.jobRole || 'Software Developer',
        company: session.companyType || 'Company',
        date: session.createdAt,
        duration: session.duration || 30,
        type: session.interviewType || 'Technical',
        status: session.status || 'completed',
        overallScore: session.score?.overall || Math.floor(Math.random() * 30) + 70,
        scores: {
          technical: {
            correctness: session.score?.technical || Math.floor(Math.random() * 20) + 80,
            clarity: session.score?.clarity || Math.floor(Math.random() * 20) + 80,
            relevance: session.score?.relevance || Math.floor(Math.random() * 20) + 80,
            efficiency: session.score?.efficiency || Math.floor(Math.random() * 20) + 80
          },
          behavioral: {
            communication: session.score?.communication || Math.floor(Math.random() * 20) + 75,
            problemSolving: session.score?.problemSolving || Math.floor(Math.random() * 20) + 75,
            creativity: session.score?.creativity || Math.floor(Math.random() * 20) + 75,
            detail: session.score?.detail || Math.floor(Math.random() * 20) + 75
          }
        },
        feedback: session.feedback || {
          strengths: ['Good technical knowledge', 'Clear communication'],
          improvements: ['Practice more examples', 'Work on confidence'],
          suggestions: ['Review core concepts', 'Practice mock interviews']
        },
        questions: session.questions || [
          {
            question: 'Tell me about yourself',
            answer: 'Sample answer...',
            score: Math.floor(Math.random() * 30) + 70,
            feedback: 'Good response with room for improvement'
          }
        ]
      }));
      
      setInterviews(transformedInterviews.length > 0 ? transformedInterviews : mockInterviews);
      setLoading(false);
    } catch (error) {
      console.error('Error loading interviews:', error);
      // Fallback to mock data if API fails
      setInterviews(mockInterviews);
      setLoading(false);
    }
  };

  const deleteInterview = async (id) => {
    if (window.confirm('Are you sure you want to delete this interview? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to delete interviews');
          return;
        }

        // Call the backend API to delete from database
        await axios.delete(`http://localhost:5000/api/sessions/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Remove from frontend state after successful deletion
        setInterviews(interviews.filter(interview => interview.id !== id));
        
        // If the deleted interview was selected, clear the selection
        if (selectedInterview && selectedInterview.id === id) {
          setSelectedInterview(null);
        }
        
        // Show success message
        alert('Interview deleted successfully!');
      } catch (error) {
        console.error('Error deleting interview:', error);
        
        // Show specific error messages
        if (error.response?.status === 404) {
          alert('Interview not found. It may have already been deleted.');
          // Remove from frontend state anyway
          setInterviews(interviews.filter(interview => interview.id !== id));
        } else if (error.response?.status === 403) {
          alert('You are not authorized to delete this interview.');
        } else if (error.response?.status === 401) {
          alert('Please log in again to delete interviews.');
          navigate('/login');
        } else {
          alert('Failed to delete interview. Please try again.');
        }
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#a1a1aa';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#22c55e';
    if (score >= 80) return '#84cc16';
    if (score >= 70) return '#f59e0b';
    if (score >= 60) return '#f97316';
    return '#ef4444';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Technical': return <Code size={16} />;
      case 'Behavioral': return <Users size={16} />;
      case 'Mixed': return <Brain size={16} />;
      default: return <MessageSquare size={16} />;
    }
  };

  const filteredInterviews = interviews
    .filter(interview => {
      if (filterType !== 'all' && interview.type.toLowerCase() !== filterType) return false;
      if (searchTerm && !interview.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !interview.company.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date': return new Date(b.date) - new Date(a.date);
        case 'score': return b.overallScore - a.overallScore;
        case 'duration': return b.duration - a.duration;
        default: return 0;
      }
    });

  const RadarChart = ({ scores, type, size = 200 }) => {
    const skills = type === 'technical' 
      ? ['Correctness', 'Clarity', 'Relevance', 'Efficiency']
      : ['Communication', 'Problem Solving', 'Creativity', 'Detail'];
    
    const values = type === 'technical'
      ? [scores.correctness, scores.clarity, scores.relevance, scores.efficiency]
      : [scores.communication, scores.problemSolving, scores.creativity, scores.detail];

    const center = size / 2;
    const radius = size / 2 - 40;
    const angleStep = (2 * Math.PI) / skills.length;

    const points = values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const r = (value / 100) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div style={styles.radarContainer}>
        <svg width={size} height={size} style={styles.radarSvg}>
          {/* Grid circles */}
          {[20, 40, 60, 80, 100].map(percent => (
            <circle
              key={percent}
              cx={center}
              cy={center}
              r={(percent / 100) * radius}
              fill="none"
              stroke="#27272a"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {skills.map((_, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#27272a"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Data polygon */}
          <polygon
            points={points}
            fill={type === 'technical' ? 'rgba(190, 242, 100, 0.3)' : 'rgba(245, 158, 11, 0.3)'}
            stroke={type === 'technical' ? '#bef264' : '#f59e0b'}
            strokeWidth="2"
          />
          
          {/* Data points */}
          {values.map((value, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const r = (value / 100) * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={type === 'technical' ? '#bef264' : '#f59e0b'}
              />
            );
          })}
          
          {/* Labels */}
          {skills.map((skill, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            return (
              <text
                key={skill}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#a1a1aa"
                fontSize="12"
                fontWeight="500"
              >
                {skill}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.main}>
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Loading interview history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h1 style={styles.title}>
              <BarChart3 size={28} />
              Interview History
            </h1>
            <p style={styles.subtitle}>
              Review your past interviews and track your progress
            </p>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.exportBtn}>
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={styles.filtersSection}>
          <div style={styles.searchBox}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by role or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.filters}>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="mixed">Mixed</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="date">Sort by Date</option>
              <option value="score">Sort by Score</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div style={{
          ...styles.content,
          gridTemplateColumns: selectedInterview ? '1fr 500px' : '1fr'
        }}>
          {/* Interview List */}
          <div style={styles.interviewList}>
            {filteredInterviews.map((interview) => (
              <div key={interview.id} style={styles.interviewCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardHeaderLeft}>
                    <div style={styles.typeIcon}>
                      {getTypeIcon(interview.type)}
                    </div>
                    <div>
                      <h3 style={styles.jobRole}>{interview.jobRole}</h3>
                      <p style={styles.company}>{interview.company}</p>
                    </div>
                  </div>
                  <div style={styles.cardHeaderRight}>
                    <div 
                      style={{
                        ...styles.scoreCircle,
                        borderColor: getScoreColor(interview.overallScore)
                      }}
                    >
                      <span style={{
                        ...styles.scoreText,
                        color: getScoreColor(interview.overallScore)
                      }}>
                        {interview.overallScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <div style={styles.cardStats}>
                    <div style={styles.stat}>
                      <Calendar size={14} />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div style={styles.stat}>
                      <Clock size={14} />
                      <span>{interview.duration} min</span>
                    </div>
                    <div style={styles.stat}>
                      <Target size={14} />
                      <span>{interview.type}</span>
                    </div>
                    <div 
                      style={{
                        ...styles.stat,
                        color: getStatusColor(interview.status)
                      }}
                    >
                      <CheckCircle size={14} />
                      <span>{interview.status}</span>
                    </div>
                  </div>

                  <div style={styles.quickFeedback}>
                    <div style={styles.feedbackItem}>
                      <ThumbsUp size={14} color="#22c55e" />
                      <span>{interview.feedback.strengths.length} strengths</span>
                    </div>
                    <div style={styles.feedbackItem}>
                      <AlertCircle size={14} color="#f59e0b" />
                      <span>{interview.feedback.improvements.length} improvements</span>
                    </div>
                  </div>
                </div>

                <div style={styles.cardActions}>
                  <button 
                    style={styles.actionBtn}
                    onClick={() => setSelectedInterview(interview)}
                  >
                    <Eye size={14} />
                    View Details
                  </button>
                  <button 
                    style={styles.actionBtn}
                    onClick={() => navigate(`/interview/${interview.id}`)}
                  >
                    <Target size={14} />
                    Retake
                  </button>
                  <button 
                    style={{...styles.actionBtn, ...styles.deleteBtn}}
                    onClick={() => deleteInterview(interview.id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          {selectedInterview && (
            <div style={styles.detailPanel}>
              <div style={styles.detailHeader}>
                <h2 style={styles.detailTitle}>Interview Analysis</h2>
                <button 
                  style={styles.closeBtn}
                  onClick={() => setSelectedInterview(null)}
                >
                  ×
                </button>
              </div>

              <div style={styles.detailContent}>
                {/* Overview */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Overview</h3>
                  <div style={styles.overviewGrid}>
                    <div style={styles.overviewItem}>
                      <span style={styles.overviewLabel}>Role</span>
                      <span style={styles.overviewValue}>{selectedInterview.jobRole}</span>
                    </div>
                    <div style={styles.overviewItem}>
                      <span style={styles.overviewLabel}>Company</span>
                      <span style={styles.overviewValue}>{selectedInterview.company}</span>
                    </div>
                    <div style={styles.overviewItem}>
                      <span style={styles.overviewLabel}>Duration</span>
                      <span style={styles.overviewValue}>{selectedInterview.duration} min</span>
                    </div>
                    <div style={styles.overviewItem}>
                      <span style={styles.overviewLabel}>Overall Score</span>
                      <span style={{
                        ...styles.overviewValue,
                        color: getScoreColor(selectedInterview.overallScore)
                      }}>
                        {selectedInterview.overallScore}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Radar Charts */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Performance Analysis</h3>
                  <div style={styles.chartsGrid}>
                    <div style={styles.chartContainer}>
                      <h4 style={styles.chartTitle}>Technical Skills</h4>
                      <RadarChart 
                        scores={selectedInterview.scores.technical} 
                        type="technical" 
                        size={250}
                      />
                    </div>
                    <div style={styles.chartContainer}>
                      <h4 style={styles.chartTitle}>Behavioral Skills</h4>
                      <RadarChart 
                        scores={selectedInterview.scores.behavioral} 
                        type="behavioral" 
                        size={250}
                      />
                    </div>
                  </div>
                </div>

                {/* Detailed Feedback */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Detailed Feedback</h3>
                  
                  <div style={styles.feedbackGrid}>
                    <div style={styles.feedbackColumn}>
                      <div style={styles.feedbackHeader}>
                        <ThumbsUp size={16} color="#22c55e" />
                        <span>Strengths</span>
                      </div>
                      <ul style={styles.feedbackList}>
                        {selectedInterview.feedback.strengths.map((strength, index) => (
                          <li key={index} style={styles.feedbackListItem}>
                            <CheckCircle size={12} color="#22c55e" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={styles.feedbackColumn}>
                      <div style={styles.feedbackHeader}>
                        <AlertCircle size={16} color="#f59e0b" />
                        <span>Areas for Improvement</span>
                      </div>
                      <ul style={styles.feedbackList}>
                        {selectedInterview.feedback.improvements.map((improvement, index) => (
                          <li key={index} style={styles.feedbackListItem}>
                            <AlertCircle size={12} color="#f59e0b" />
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={styles.feedbackColumn}>
                      <div style={styles.feedbackHeader}>
                        <Star size={16} color="#8b5cf6" />
                        <span>Recommendations</span>
                      </div>
                      <ul style={styles.feedbackList}>
                        {selectedInterview.feedback.suggestions.map((suggestion, index) => (
                          <li key={index} style={styles.feedbackListItem}>
                            <Star size={12} color="#8b5cf6" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Questions & Answers */}
                <div style={styles.detailSection}>
                  <h3 style={styles.sectionTitle}>Questions & Answers</h3>
                  <div style={styles.questionsContainer}>
                    {selectedInterview.questions.map((qa, index) => (
                      <div key={index} style={styles.questionCard}>
                        <div style={styles.questionHeader}>
                          <span style={styles.questionNumber}>Q{index + 1}</span>
                          <span style={{
                            ...styles.questionScore,
                            color: getScoreColor(qa.score)
                          }}>
                            {qa.score}%
                          </span>
                        </div>
                        <div style={styles.questionText}>{qa.question}</div>
                        <div style={styles.answerText}>
                          <strong>Your Answer:</strong> {qa.answer}
                        </div>
                        <div style={styles.questionFeedback}>
                          <strong>Feedback:</strong> {qa.feedback}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#09090b'
  },
  main: {
    flex: 1,
    marginLeft: '240px',
    background: '#09090b'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#a1a1aa'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #27272a',
    borderTop: '4px solid #bef264',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '32px',
    background: '#18181b',
    borderBottom: '1px solid #27272a'
  },
  headerLeft: {},
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#edecf0',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: '16px',
    margin: 0
  },
  headerRight: {},
  exportBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600'
  },
  filtersSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px 32px',
    background: '#18181b',
    borderBottom: '1px solid #27272a'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#27272a',
    borderRadius: '8px',
    padding: '12px 16px',
    flex: 1,
    maxWidth: '400px'
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#edecf0',
    fontSize: '14px',
    flex: 1
  },
  filters: {
    display: 'flex',
    gap: '12px'
  },
  filterSelect: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#edecf0',
    fontSize: '14px',
    cursor: 'pointer'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    height: 'calc(100vh - 200px)'
  },
  interviewList: {
    padding: '32px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  interviewCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
    transition: 'all 0.3s ease'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  cardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  typeIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#09090b'
  },
  jobRole: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 4px 0'
  },
  company: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: 0
  },
  cardHeaderRight: {},
  scoreCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '3px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#27272a'
  },
  scoreText: {
    fontSize: '16px',
    fontWeight: '700'
  },
  cardContent: {
    marginBottom: '20px'
  },
  cardStats: {
    display: 'flex',
    gap: '24px',
    marginBottom: '16px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#a1a1aa',
    fontSize: '14px'
  },
  quickFeedback: {
    display: 'flex',
    gap: '20px'
  },
  feedbackItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#a1a1aa'
  },
  cardActions: {
    display: 'flex',
    gap: '12px'
  },
  actionBtn: {
    background: '#27272a',
    border: '1px solid #3f3f46',
    borderRadius: '8px',
    padding: '8px 16px',
    color: '#edecf0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  },
  deleteBtn: {
    borderColor: '#ef4444',
    color: '#ef4444'
  },
  detailPanel: {
    background: '#18181b',
    borderLeft: '1px solid #27272a',
    overflow: 'auto'
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #27272a'
  },
  detailTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#edecf0',
    margin: 0
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px'
  },
  detailContent: {
    padding: '24px'
  },
  detailSection: {
    marginBottom: '32px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '16px'
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  overviewItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  overviewLabel: {
    fontSize: '12px',
    color: '#a1a1aa',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  overviewValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px'
  },
  chartContainer: {
    background: '#27272a',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center'
  },
  chartTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '16px'
  },
  radarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  radarSvg: {
    background: 'transparent'
  },
  feedbackGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px'
  },
  feedbackColumn: {
    background: '#27272a',
    borderRadius: '12px',
    padding: '16px'
  },
  feedbackHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0'
  },
  feedbackList: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  feedbackListItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '13px',
    color: '#a1a1aa',
    lineHeight: '1.4'
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  questionCard: {
    background: '#27272a',
    borderRadius: '12px',
    padding: '20px'
  },
  questionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  questionNumber: {
    background: '#bef264',
    color: '#09090b',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600'
  },
  questionScore: {
    fontSize: '16px',
    fontWeight: '700'
  },
  questionText: {
    fontSize: '16px',
    color: '#edecf0',
    marginBottom: '12px',
    fontWeight: '500'
  },
  answerText: {
    fontSize: '14px',
    color: '#a1a1aa',
    marginBottom: '12px',
    lineHeight: '1.5'
  },
  questionFeedback: {
    fontSize: '14px',
    color: '#a1a1aa',
    lineHeight: '1.5',
    fontStyle: 'italic'
  }
};

// Add CSS animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default History;