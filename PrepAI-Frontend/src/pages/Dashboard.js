import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import api from '../services/api';
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Star,
  Target,
  Award,
  Brain,
  Zap,
  ArrowRight,
  BookOpen,
  Trophy,
  AlertCircle,
  Mic,
  Globe,
  Code,
  MessageSquare,
  BarChart3,
  Users,
  Calendar,
  Play
} from 'lucide-react';
import axios from 'axios';

// RadarChart Component
const RadarChart = ({ scores, type, size = 280 }) => {
  const skills = type === 'technical' 
    ? ['Correctness', 'Clarity', 'Relevance', 'Efficiency', 'Problem solving', 'Communication', 'Creativity', 'Detail']
    : ['Communication', 'Problem solving', 'Creativity', 'Detail', 'Correctness', 'Clarity', 'Relevance', 'Efficiency'];
  
  const values = type === 'technical'
    ? [scores.correctness || 85, scores.clarity || 80, scores.relevance || 88, scores.efficiency || 82, 
       scores.problemSolving || 87, scores.communication || 83, scores.creativity || 79, scores.detail || 86]
    : [scores.communication || 88, scores.problemSolving || 80, scores.creativity || 85, scores.detail || 79,
       scores.correctness || 75, scores.clarity || 82, scores.relevance || 85, scores.efficiency || 70];

  const center = size / 2;
  const radius = size / 2 - 60;
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
          strokeWidth="3"
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
          const labelRadius = radius + 30;
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
              fontSize="11"
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

const Dashboard = () => {

  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalTime: 0,
    completedInterviews: 0,
    availableInterviews: 0,
    averageScore: 0,
    weeklyGrowth: 0,
    streakDays: 0,
    skillsImproved: 0,
    weeklyGoal: 5,
    completedThisWeek: 0,
    skillScores: {
      technical: {},
      behavioral: {}
    },
    recentActivity: [],
    performanceMetrics: {}
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [skillsProgress, setSkillsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch user statistics
      //old way
      // const statsResponse = await axios.get('http://localhost:
      // /api/auth/stats', {
      //new way
      // const statsResponse = await axios.get('/auth/stats', {
      const statsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/auth/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const userData = statsResponse.data;
      setStats(userData);
      setRecentActivity(userData.recentActivity || []);
      
      // Process skills data for display
      const skillsData = [
        { 
          skill: 'Technical Skills', 
          score: Math.round((
            userData.skillScores.technical.correctness +
            userData.skillScores.technical.clarity +
            userData.skillScores.technical.relevance +
            userData.skillScores.technical.efficiency
          ) / 4),
          change: userData.performanceMetrics.improvementRate || 0,
          color: '#3b82f6' 
        },
        { 
          skill: 'Communication', 
          score: Math.round((
            userData.skillScores.behavioral.communication +
            userData.skillScores.technical.communication
          ) / 2),
          change: Math.floor(Math.random() * 10) + 5,
          color: '#10b981' 
        },
        { 
          skill: 'Problem Solving', 
          score: Math.round((
            userData.skillScores.technical.problemSolving +
            userData.skillScores.behavioral.problemSolving
          ) / 2),
          change: Math.floor(Math.random() * 8) + 3,
          color: '#f59e0b' 
        },
        { 
          skill: 'Consistency', 
          score: userData.performanceMetrics.consistencyScore || 75,
          change: Math.floor(Math.random() * 6) + 2,
          color: '#8b5cf6' 
        }
      ];
      
      setSkillsProgress(skillsData);
      setLoading(false);
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      console.log('Using fallback data due to API error');
      setLoading(false);
      
      // Fallback to basic data if API fails
      setStats({
        totalInterviews: 0,
        totalTime: 0,
        completedInterviews: 0,
        availableInterviews: 5,
        averageScore: 0,
        weeklyGrowth: 0,
        streakDays: 0,
        skillsImproved: 0,
        weeklyGoal: 5,
        completedThisWeek: 0,
        skillScores: {
          technical: {
            correctness: 70, clarity: 70, relevance: 70, efficiency: 70,
            problemSolving: 70, communication: 70, creativity: 70, detail: 70
          },
          behavioral: {
            communication: 70, problemSolving: 70, creativity: 70, detail: 70,
            correctness: 70, clarity: 70, relevance: 70, efficiency: 70
          }
        },
        recentActivity: [],
        performanceMetrics: {
          technicalAverage: 0,
          behavioralAverage: 0,
          improvementRate: 0,
          consistencyScore: 0
        }
      });
      
      // Set fallback skills data
      setSkillsProgress([
        { skill: 'Technical Skills', score: 75, change: 5, color: '#3b82f6' },
        { skill: 'Communication', score: 80, change: 8, color: '#10b981' },
        { skill: 'Problem Solving', score: 70, change: 3, color: '#f59e0b' },
        { skill: 'Consistency', score: 65, change: 2, color: '#8b5cf6' }
      ]);
      
      // Set fallback recent activity
      setRecentActivity([
        { id: 1, type: 'Technical Interview', status: 'good', score: 85, company: 'Tech Corp', date: '2 days ago' },
        { id: 2, type: 'Behavioral Interview', status: 'excellent', score: 92, company: 'StartupXYZ', date: '1 week ago' }
      ]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return '#22c55e';
      case 'good': return '#3b82f6';
      case 'average': return '#f59e0b';
      default: return '#a1a1aa';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return <CheckCircle size={16} />;
      case 'good': return <Star size={16} />;
      case 'average': return <AlertCircle size={16} />;
      default: return <Target size={16} />;
    }
  };

  if (!user) {
    console.log('No user found, redirecting to login');
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.main}>
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        {/* Clean Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.greeting}>
              Hello, {user.name} <span style={styles.waveEmoji}>👋</span>
            </h1>
            <p style={styles.subGreeting}>Overview</p>
          </div>
          
          <button 
            style={styles.createButton}
            onClick={() => navigate('/interview/new')}
          >
            Create interview
          </button>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          <StatCard 
            title="Total interviews"
            value={stats.totalInterviews}
            subtitle={`${stats.weeklyGrowth >= 0 ? stats.weeklyGrowth : 0}% from last week`}
            trend={`${stats.weeklyGrowth >= 0 ? stats.weeklyGrowth : 0}%`}
          />
          <StatCard 
            title="Total time spent"
            value={`${stats.totalTime} min`}
            subtitle={`${stats.weeklyGrowth >= 0 ? stats.weeklyGrowth : 0}% from last week`}
            trend={`${stats.weeklyGrowth >= 0 ? stats.weeklyGrowth : 0}%`}
          />
          <StatCard 
            title="Completed interviews"
            value={stats.completedInterviews}
            subtitle={`${stats.totalInterviews > 0 ? Math.round((stats.completedInterviews / stats.totalInterviews) * 100) : 0}% of total interviews`}
            trend={`${stats.totalInterviews > 0 ? Math.round((stats.completedInterviews / stats.totalInterviews) * 100) : 0}%`}
          />
          <StatCard 
            title="Available interviews"
            value={stats.availableInterviews}
            subtitle="Free credit"
            trend="Free"
          />
        </div>

        {/* Radar Charts Section */}
        <div style={styles.radarSection}>
          <h2 style={styles.sectionTitle}>
            <BarChart3 size={24} color="#bef264" />
            Performance Analysis
          </h2>
          <div style={styles.radarChartsGrid}>
            <div style={styles.radarChartCard}>
              <h3 style={styles.radarChartTitle}>Technical Interviews</h3>
              <RadarChart 
                scores={{
                  correctness: 90,
                  clarity: 85,
                  relevance: 88,
                  efficiency: 82,
                  problemSolving: 87,
                  communication: 83,
                  creativity: 79,
                  detail: 86
                }}
                type="technical"
                size={300}
              />
              <div style={styles.chartLegend}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendDot, background: '#bef264'}}></div>
                  <span>Your Performance</span>
                </div>
              </div>
            </div>

            <div style={styles.radarChartCard}>
              <h3 style={styles.radarChartTitle}>Behavioural Interviews</h3>
              <RadarChart 
                scores={{
                  communication: 88,
                  problemSolving: 80,
                  creativity: 85,
                  detail: 79,
                  correctness: 75,
                  clarity: 82,
                  relevance: 85,
                  efficiency: 70
                }}
                type="behavioral"
                size={300}
              />
              <div style={styles.chartLegend}>
                <div style={styles.legendItem}>
                  <div style={{...styles.legendDot, background: '#f59e0b'}}></div>
                  <span>Your Performance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={styles.contentGrid}>
          {/* Left Column */}
          <div style={styles.leftColumn}>

            {/* Skills Breakdown */}
            <div style={styles.skillsSection}>
              <h2 style={styles.sectionTitle}>
                <TrendingUp size={24} color="#bef264" />
                Skills Breakdown
              </h2>
              <div style={styles.skillsGrid}>
                {skillsProgress.map((skill, index) => (
                  <div key={index} style={styles.skillCard}>
                    <div style={styles.skillHeader}>
                      <span style={styles.skillName}>{skill.skill}</span>
                      <div style={styles.skillStats}>
                        <span style={styles.skillScore}>{skill.score}%</span>
                        <div style={styles.skillChange}>
                          <TrendingUp size={12} />
                          +{skill.change}%
                        </div>
                      </div>
                    </div>
                    <div style={styles.skillProgressBar}>
                      <div 
                        style={{
                          ...styles.skillProgressFill,
                          width: `${skill.score}%`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`
                        }}
                      />
                    </div>
                    <div style={styles.skillInsight}>
                      {skill.score >= 90 ? 'Excellent' : 
                       skill.score >= 80 ? 'Good' : 
                       skill.score >= 70 ? 'Average' : 'Needs Improvement'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div style={styles.activitySection}>
              <h2 style={styles.sectionTitle}>
                <Clock size={24} color="#bef264" />
                Recent Activity
              </h2>
              <div style={styles.activityCard}>
                {recentActivity.map((activity) => (
                  <div key={activity.id} style={styles.activityItem}>
                    <div style={{
                      ...styles.activityIcon,
                      background: `linear-gradient(135deg, ${getStatusColor(activity.status)}, ${getStatusColor(activity.status)}88)`
                    }}>
                      {getStatusIcon(activity.status)}
                    </div>
                    <div style={styles.activityContent}>
                      <div style={styles.activityHeader}>
                        <span style={styles.activityType}>{activity.type}</span>
                        <span style={{
                          ...styles.activityScore,
                          color: getStatusColor(activity.status)
                        }}>
                          {activity.score}%
                        </span>
                      </div>
                      <div style={styles.activityDetails}>
                        {activity.company} • {activity.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={styles.rightColumn}>
            {/* Recommendations */}
            <div style={styles.recommendationsSection}>
              <h2 style={styles.sectionTitle}>
                <BookOpen size={20} color="#bef264" />
                Recommendations
              </h2>
              <div style={styles.recommendationsCard}>
                <div style={styles.recommendationItem}>
                  <div style={styles.recommendationHeader}>
                    <AlertCircle size={16} color="#f59e0b" />
                    <span>Focus Area</span>
                  </div>
                  <p style={styles.recommendationText}>
                    Work on system design concepts to improve your technical interview performance.
                  </p>
                  <button style={styles.recommendationBtn}>
                    Start Learning
                  </button>
                </div>

                <div style={styles.recommendationItem}>
                  <div style={styles.recommendationHeader}>
                    <Star size={16} color="#8b5cf6" />
                    <span>Strength</span>
                  </div>
                  <p style={styles.recommendationText}>
                    Your communication skills are excellent. Consider mentoring others!
                  </p>
                  <button style={styles.recommendationBtn}>
                    Explore Opportunities
                  </button>
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div style={styles.learningSection}>
              <h2 style={styles.sectionTitle}>
                <BookOpen size={20} color="#bef264" />
                Learning Path
              </h2>
              <div style={styles.learningCard}>
                <div style={styles.pathItem}>
                  <div style={styles.pathHeader}>
                    <Code size={20} color="#3b82f6" />
                    <span style={styles.pathName}>Frontend Developer</span>
                  </div>
                  <div style={styles.pathProgress}>
                    <div style={styles.pathProgressBar}>
                      <div style={{...styles.pathProgressFill, width: '75%'}} />
                    </div>
                    <span style={styles.pathPercentage}>75%</span>
                  </div>
                </div>

                <div style={styles.pathItem}>
                  <div style={styles.pathHeader}>
                    <Brain size={20} color="#10b981" />
                    <span style={styles.pathName}>System Design</span>
                  </div>
                  <div style={styles.pathProgress}>
                    <div style={styles.pathProgressBar}>
                      <div style={{...styles.pathProgressFill, width: '45%'}} />
                    </div>
                    <span style={styles.pathPercentage}>45%</span>
                  </div>
                </div>

                <div style={styles.pathItem}>
                  <div style={styles.pathHeader}>
                    <MessageSquare size={20} color="#f59e0b" />
                    <span style={styles.pathName}>Behavioral Skills</span>
                  </div>
                  <div style={styles.pathProgress}>
                    <div style={styles.pathProgressBar}>
                      <div style={{...styles.pathProgressFill, width: '90%'}} />
                    </div>
                    <span style={styles.pathPercentage}>90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, trend }) => (
  <div style={styles.statCard}>
    <div style={styles.statTitle}>{title}</div>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statFooter}>
      <span style={styles.statSubtitle}>{subtitle}</span>
      <span style={styles.statTrend}>{trend}</span>
    </div>
  </div>
);



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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '40px 40px 20px 40px',
    background: '#09090b'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  greeting: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '8px'
  },
  waveEmoji: {
    fontSize: '28px'
  },
  subGreeting: {
    fontSize: '16px',
    color: '#71717a',
    fontWeight: '400'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#a1a1aa'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #27272a',
    borderTop: '4px solid #bef264',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  },
  loadingText: {
    fontSize: '16px',
    color: '#a1a1aa'
  },
  weeklyProgress: {
    background: '#27272a',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '8px'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    color: '#edecf0',
    fontSize: '14px',
    fontWeight: '500'
  },
  progressText: {
    color: '#bef264',
    fontWeight: '600'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    background: '#18181b',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #bef264, #84cc16)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  createButton: {
    background: '#bef264',
    color: '#09090b',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    padding: '0 40px 40px 40px'
  },
  statCard: {
    background: '#18181b',
    borderRadius: '12px',
    padding: '24px',
    border: '1px solid #27272a'
  },
  statTitle: {
    color: '#a1a1aa',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '12px'
  },
  statValue: {
    color: '#edecf0',
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '12px'
  },
  statFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statSubtitle: {
    color: '#71717a',
    fontSize: '12px'
  },
  statTrend: {
    color: '#bef264',
    fontSize: '12px',
    fontWeight: '600'
  },
  radarSection: {
    padding: '32px',
    paddingTop: '0'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  radarChartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '32px'
  },
  radarChartCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center'
  },
  radarChartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '20px'
  },
  radarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  radarSvg: {
    background: 'transparent'
  },
  chartLegend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#a1a1aa'
  },
  legendDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '32px',
    padding: '32px',
    paddingTop: '0'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  quickActions: {},
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  actionCard: {
    padding: '24px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'left'
  },
  primaryAction: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b'
  },
  secondaryAction: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white'
  },
  tertiaryAction: {
    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    color: 'white'
  },
  quaternaryAction: {
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white'
  },
  actionContent: {
    flex: 1
  },
  actionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px'
  },
  actionSubtitle: {
    fontSize: '12px',
    opacity: 0.8
  },
  skillsSection: {},
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  skillCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '20px'
  },
  skillHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  skillName: {
    color: '#edecf0',
    fontSize: '16px',
    fontWeight: '500'
  },
  skillStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  skillScore: {
    color: '#edecf0',
    fontSize: '16px',
    fontWeight: '600'
  },
  skillChange: {
    color: '#22c55e',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  skillProgressBar: {
    width: '100%',
    height: '8px',
    background: '#27272a',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px'
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  skillInsight: {
    fontSize: '12px',
    color: '#a1a1aa'
  },
  activitySection: {},
  activityCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px 0',
    borderBottom: '1px solid #27272a'
  },
  activityIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  activityContent: {
    flex: 1
  },
  activityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  activityType: {
    color: '#edecf0',
    fontWeight: '600',
    fontSize: '16px'
  },
  activityScore: {
    fontSize: '18px',
    fontWeight: '700'
  },
  activityDetails: {
    color: '#a1a1aa',
    fontSize: '14px'
  },
  recommendationsSection: {},
  recommendationsCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  recommendationItem: {
    background: '#27272a',
    borderRadius: '12px',
    padding: '16px'
  },
  recommendationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0'
  },
  recommendationText: {
    color: '#a1a1aa',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '12px'
  },
  recommendationBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  learningSection: {},
  learningCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '16px',
    padding: '24px'
  },
  pathItem: {
    marginBottom: '20px'
  },
  pathHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  pathName: {
    color: '#edecf0',
    fontWeight: '500'
  },
  pathProgress: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  pathProgressBar: {
    flex: 1,
    height: '8px',
    background: '#27272a',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  pathProgressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #bef264, #84cc16)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  pathPercentage: {
    color: '#bef264',
    fontSize: '12px',
    fontWeight: '600'
  },
  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  modal: {
    background: '#18181b',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'hidden',
    border: '1px solid #27272a'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #27272a'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    fontSize: '24px',
    cursor: 'pointer'
  },
  modalContent: {
    padding: '24px',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  step: {
    color: '#edecf0'
  },
  formGrid: {
    display: 'grid',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#edecf0',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px',
    color: '#edecf0',
    fontSize: '14px'
  },
  select: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px',
    color: '#edecf0',
    fontSize: '14px'
  },
  textarea: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px',
    color: '#edecf0',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '120px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#edecf0',
    cursor: 'pointer'
  },
  checkbox: {
    width: '16px',
    height: '16px'
  },
  techGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '8px'
  },
  techButton: {
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    padding: '8px 12px',
    color: '#a1a1aa',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  techButtonActive: {
    background: '#bef264',
    borderColor: '#bef264',
    color: '#09090b'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '24px',
    borderTop: '1px solid #27272a'
  },
  backButton: {
    background: '#27272a',
    color: '#edecf0',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  nextButton: {
    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  startButton: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
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
`;
document.head.appendChild(styleSheet);

export default Dashboard;