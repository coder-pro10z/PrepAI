import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { 
  BookOpen, 
  Lightbulb, 
  Target, 
  Users, 
  Code, 
  AlertCircle,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Clock,
  Brain,
  MessageSquare,
  Zap,
  Award,
  TrendingUp
} from 'lucide-react';

const TipsAndTricks = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [selectedTip, setSelectedTip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [favoritesTips, setFavoritesTips] = useState([]);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [currentPracticeQuestion, setCurrentPracticeQuestion] = useState(null);

  const tabs = [
    { id: 'general', label: 'General Tips', icon: <Lightbulb size={20} /> },
    { id: 'technical', label: 'Technical', icon: <Code size={20} /> },
    { id: 'behavioral', label: 'Behavioral', icon: <Users size={20} /> },
    { id: 'tricky', label: 'Tricky Situations', icon: <AlertCircle size={20} /> }
  ];

  const tips = {
    general: {
      title: 'General Interview Tips',
      sections: [
        {
          title: 'Before the Interview',
          icon: <Clock size={24} color="#bef264" />,
          tips: [
            {
              title: 'Research the Company Thoroughly',
              description: 'Deep dive into company culture, mission, and recent developments',
              details: [
                'Study the company website, especially About Us and Values sections',
                'Read recent news articles, press releases, and blog posts',
                'Check their social media presence and recent updates',
                'Research competitors and industry trends',
                'Look up the company on Glassdoor for employee reviews',
                'Find the interviewer on LinkedIn and note common connections',
                'Understand their products, services, and target market',
                'Prepare 3-5 specific questions about the company'
              ],
              practice: 'Write down 3 key facts about the company and how they relate to your interests'
            },
            {
              title: 'Prepare Your Stories',
              description: 'Use the STAR method to prepare specific examples',
              details: [
                'Situation: Set the context with specific details',
                'Task: Explain what you needed to accomplish',
                'Action: Describe what you specifically did',
                'Result: Share the outcome and what you learned'
              ],
              practice: 'Prepare 5 STAR stories covering different competencies'
            },
            {
              title: 'Practice Out Loud',
              description: 'Rehearse your answers and elevator pitch',
              details: [
                'Practice your 30-second elevator pitch',
                'Record yourself answering common questions',
                'Practice with a friend or family member',
                'Time your responses to keep them concise',
                'Work on eliminating filler words'
              ],
              practice: 'Record yourself answering "Tell me about yourself" and review it'
            }
          ]
        },
        {
          title: 'During the Interview',
          icon: <MessageSquare size={24} color="#bef264" />,
          tips: [
            {
              title: 'First Impressions Matter',
              description: 'Make a strong positive first impression',
              details: [
                'Arrive 10-15 minutes early',
                'Dress appropriately for the company culture',
                'Bring multiple copies of your resume',
                'Maintain good eye contact and smile',
                'Give a firm handshake'
              ],
              practice: 'Practice your introduction and handshake with someone'
            },
            {
              title: 'Active Listening',
              description: 'Listen carefully and engage with the interviewer',
              details: [
                'Listen to the complete question before answering',
                'Ask for clarification if you don\'t understand',
                'Take notes if appropriate',
                'Show engagement through body language',
                'Reference what the interviewer has said'
              ],
              practice: 'Practice active listening in everyday conversations'
            }
          ]
        },
        {
          title: 'After the Interview',
          icon: <CheckCircle size={24} color="#bef264" />,
          tips: [
            {
              title: 'Follow Up Professionally',
              description: 'Send a thoughtful thank-you message',
              details: [
                'Send within 24 hours of the interview',
                'Personalize the message with specific details',
                'Reiterate your interest in the position',
                'Address any concerns that came up',
                'Keep it concise and professional'
              ],
              practice: 'Draft a template thank-you email you can customize'
            }
          ]
        }
      ]
    },
    technical: {
      title: 'Technical Interview Mastery',
      sections: [
        {
          title: 'Preparation Strategies',
          icon: <Brain size={24} color="#bef264" />,
          tips: [
            {
              title: 'Master the Fundamentals',
              description: 'Ensure strong foundation in core concepts',
              details: [
                'Data structures: Arrays, Linked Lists, Trees, Graphs, Hash Tables',
                'Algorithms: Sorting, Searching, Dynamic Programming, Recursion',
                'Time and Space Complexity (Big O notation)',
                'System Design basics: Scalability, Load Balancing, Databases',
                'Language-specific concepts and best practices'
              ],
              practice: 'Solve 2-3 coding problems daily on LeetCode or HackerRank'
            },
            {
              title: 'Practice Coding Interviews',
              description: 'Simulate real interview conditions',
              details: [
                'Use a whiteboard or shared screen',
                'Practice explaining your thought process',
                'Time yourself (usually 30-45 minutes per problem)',
                'Practice with a friend as interviewer',
                'Record yourself to identify areas for improvement'
              ],
              practice: 'Do a mock interview with someone weekly'
            }
          ]
        },
        {
          title: 'During Technical Interviews',
          icon: <Code size={24} color="#bef264" />,
          tips: [
            {
              title: 'Problem-Solving Approach',
              description: 'Follow a structured approach to solve problems',
              details: [
                '1. Clarify the problem and requirements',
                '2. Ask about edge cases and constraints',
                '3. Discuss your approach before coding',
                '4. Start with a simple solution',
                '5. Code while explaining your logic',
                '6. Test with examples',
                '7. Optimize if time permits'
              ],
              practice: 'Follow this approach for every practice problem'
            },
            {
              title: 'Communication is Key',
              description: 'Think out loud throughout the process',
              details: [
                'Explain your thought process clearly',
                'Discuss trade-offs between different approaches',
                'Ask questions when you\'re unsure',
                'Explain your code as you write it',
                'Discuss time and space complexity'
              ],
              practice: 'Practice explaining solutions to someone non-technical'
            }
          ]
        },
        {
          title: 'Common Mistakes to Avoid',
          icon: <AlertCircle size={24} color="#f59e0b" />,
          tips: [
            {
              title: 'Rushing Into Code',
              description: 'Take time to understand and plan',
              details: [
                'Don\'t start coding immediately',
                'Ask clarifying questions first',
                'Discuss your approach with the interviewer',
                'Consider edge cases before coding',
                'Plan your solution structure'
              ],
              practice: 'Spend 5-10 minutes planning before coding any problem'
            }
          ]
        }
      ]
    },
    behavioral: {
      title: 'Behavioral Interview Excellence',
      sections: [
        {
          title: 'STAR Method Mastery',
          icon: <Star size={24} color="#bef264" />,
          tips: [
            {
              title: 'Structure Your Stories',
              description: 'Use STAR to create compelling narratives',
              details: [
                'Situation: Provide context (20% of your answer)',
                'Task: Explain what needed to be done (20%)',
                'Action: Detail what YOU did (50%)',
                'Result: Share the outcome and learning (10%)'
              ],
              practice: 'Write out 10 STAR stories covering different scenarios'
            },
            {
              title: 'Choose the Right Examples',
              description: 'Select stories that showcase relevant skills',
              details: [
                'Pick recent examples (within last 2-3 years)',
                'Choose stories with positive outcomes',
                'Vary your examples across different situations',
                'Include quantifiable results when possible',
                'Show progression and learning'
              ],
              practice: 'Map your stories to common behavioral questions'
            }
          ]
        },
        {
          title: 'Common Question Categories',
          icon: <Target size={24} color="#bef264" />,
          tips: [
            {
              title: 'Leadership & Influence',
              description: 'Demonstrate leadership capabilities',
              details: [
                'Leading without authority',
                'Motivating team members',
                'Making difficult decisions',
                'Driving change initiatives',
                'Resolving conflicts'
              ],
              practice: 'Prepare examples showing different leadership styles'
            },
            {
              title: 'Problem Solving',
              description: 'Show analytical and creative thinking',
              details: [
                'Handling ambiguous situations',
                'Learning from failures',
                'Innovative solutions',
                'Working under pressure',
                'Adapting to change'
              ],
              practice: 'Focus on your problem-solving process, not just the outcome'
            }
          ]
        }
      ]
    },
    tricky: {
      title: 'Handling Tricky Situations',
      sections: [
        {
          title: 'Difficult Questions',
          icon: <AlertCircle size={24} color="#f59e0b" />,
          tips: [
            {
              title: 'When You Don\'t Know the Answer',
              description: 'Handle knowledge gaps professionally',
              details: [
                'Be honest about not knowing',
                'Explain how you would find the answer',
                'Share related knowledge you do have',
                'Show willingness and ability to learn quickly',
                'Give an example of learning something new recently'
              ],
              practice: 'Practice saying "I don\'t know" confidently and following up constructively'
            },
            {
              title: 'Salary Expectations',
              description: 'Navigate compensation discussions',
              details: [
                'Research market rates beforehand',
                'Give a range rather than a specific number',
                'Emphasize the value you bring',
                'Consider the total compensation package',
                'Be prepared to negotiate'
              ],
              practice: 'Research salary ranges for your target role and location'
            }
          ]
        },
        {
          title: 'Challenging Interviewers',
          icon: <Users size={24} color="#f59e0b" />,
          tips: [
            {
              title: 'Aggressive or Hostile Interviewer',
              description: 'Stay professional under pressure',
              details: [
                'Don\'t take it personally',
                'Stay calm and composed',
                'Answer questions directly',
                'Show confidence without being defensive',
                'This might be a stress test'
              ],
              practice: 'Practice staying calm during difficult conversations'
            },
            {
              title: 'Silent or Unresponsive Interviewer',
              description: 'Handle lack of feedback gracefully',
              details: [
                'Don\'t let silence make you uncomfortable',
                'Ask if they need more information',
                'Continue with confidence',
                'Use their body language as cues',
                'Stay engaged and positive'
              ],
              practice: 'Practice continuing conversations when others are quiet'
            }
          ]
        }
      ]
    }
  };

  const practiceExercises = {
    general: [
      {
        title: 'Elevator Pitch Practice',
        description: 'Perfect your 30-second introduction',
        exercise: 'Record yourself giving a 30-second elevator pitch. Include your background, key skills, and what you\'re looking for.',
        timeLimit: 1
      },
      {
        title: 'Company Research Deep Dive',
        description: 'Research a target company thoroughly',
        exercise: 'Pick a company you\'re interested in and spend 30 minutes researching. Write down 5 key facts and how they relate to your career goals.',
        timeLimit: 30
      }
    ],
    technical: [
      {
        title: 'Whiteboard Coding',
        description: 'Practice coding without an IDE',
        exercise: 'Solve a medium-difficulty algorithm problem on a whiteboard or paper. Explain your approach out loud.',
        timeLimit: 45
      },
      {
        title: 'System Design Practice',
        description: 'Design a simple system',
        exercise: 'Design a URL shortener like bit.ly. Draw the architecture and explain your choices.',
        timeLimit: 30
      }
    ],
    behavioral: [
      {
        title: 'STAR Story Development',
        description: 'Create compelling behavioral stories',
        exercise: 'Write out a STAR story for "Tell me about a time you overcame a significant challenge." Practice telling it in under 3 minutes.',
        timeLimit: 15
      },
      {
        title: 'Weakness Reframing',
        description: 'Turn weaknesses into growth opportunities',
        exercise: 'Identify a real weakness and practice explaining it positively, including steps you\'re taking to improve.',
        timeLimit: 10
      }
    ],
    tricky: [
      {
        title: 'Pressure Simulation',
        description: 'Practice under stress',
        exercise: 'Have someone ask you rapid-fire questions for 5 minutes. Focus on staying calm and giving thoughtful answers.',
        timeLimit: 5
      },
      {
        title: 'Salary Negotiation',
        description: 'Practice compensation discussions',
        exercise: 'Role-play a salary negotiation. Research market rates and practice justifying your desired range.',
        timeLimit: 15
      }
    ]
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.title}>
              <BookOpen size={32} />
              Tips & Tricks
            </h1>
            <p style={styles.subtitle}>
              Master your interviews with proven strategies and techniques
            </p>
          </div>
          
          {/* Search and Actions */}
          <div style={styles.headerActions}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search tips and strategies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button
              style={styles.practiceButton}
              onClick={() => setPracticeMode(!practiceMode)}
            >
              <Play size={16} />
              {practiceMode ? 'Exit Practice' : 'Practice Mode'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <div style={styles.contentGrid}>
            {/* Tips Section */}
            <div style={styles.tipsSection}>
              <h2 style={styles.sectionTitle}>{tips[activeTab].title}</h2>
              
              {tips[activeTab].sections.map((section, sectionIndex) => (
                <div key={sectionIndex} style={styles.section}>
                  <div style={styles.sectionHeader}>
                    {section.icon}
                    <h3 style={styles.sectionName}>{section.title}</h3>
                  </div>
                  
                  <div style={styles.tipsGrid}>
                    {section.tips.map((tip, tipIndex) => (
                      <div 
                        key={tipIndex} 
                        style={styles.tipCard}
                        onClick={() => setSelectedTip(tip)}
                      >
                        <h4 style={styles.tipTitle}>{tip.title}</h4>
                        <p style={styles.tipDescription}>{tip.description}</p>
                        <div style={styles.tipFooter}>
                          <span style={styles.viewDetails}>View Details</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Practice Exercises */}
            <div style={styles.practiceSection}>
              <h3 style={styles.practiceTitle}>
                <Play size={20} />
                Practice Exercises
              </h3>
              
              {practiceExercises[activeTab]?.map((exercise, index) => (
                <div key={index} style={styles.exerciseCard}>
                  <div style={styles.exerciseHeader}>
                    <h4 style={styles.exerciseTitle}>{exercise.title}</h4>
                    <div style={styles.timeLimit}>
                      <Clock size={14} />
                      {exercise.timeLimit} min
                    </div>
                  </div>
                  <p style={styles.exerciseDescription}>{exercise.description}</p>
                  <p style={styles.exerciseInstructions}>{exercise.exercise}</p>
                  <button style={styles.startExerciseBtn}>
                    <Play size={16} />
                    Start Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tip Detail Modal */}
        {selectedTip && (
          <div style={styles.modalOverlay} onClick={() => setSelectedTip(null)}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>{selectedTip.title}</h3>
                <button 
                  style={styles.closeBtn}
                  onClick={() => setSelectedTip(null)}
                >
                  ×
                </button>
              </div>
              
              <div style={styles.modalContent}>
                <p style={styles.modalDescription}>{selectedTip.description}</p>
                
                <div style={styles.detailsSection}>
                  <h4 style={styles.detailsTitle}>Key Points:</h4>
                  <ul style={styles.detailsList}>
                    {selectedTip.details.map((detail, index) => (
                      <li key={index} style={styles.detailItem}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div style={styles.practiceSection}>
                  <h4 style={styles.practiceLabel}>Practice Exercise:</h4>
                  <p style={styles.practiceText}>{selectedTip.practice}</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
  header: {
    padding: '32px',
    background: '#18181b',
    borderBottom: '1px solid #27272a'
  },
  headerContent: {
    maxWidth: '1200px'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '24px',
    maxWidth: '1200px'
  },
  searchContainer: {
    flex: 1,
    maxWidth: '400px'
  },
  searchInput: {
    width: '100%',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#edecf0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  practiceButton: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#edecf0',
    margin: '0 0 8px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#a1a1aa',
    margin: 0
  },
  tabsContainer: {
    display: 'flex',
    padding: '0 32px',
    background: '#18181b',
    borderBottom: '1px solid #27272a'
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: '16px 24px',
    color: '#a1a1aa',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease'
  },
  activeTab: {
    color: '#bef264',
    borderBottomColor: '#bef264'
  },
  content: {
    padding: '32px',
    maxWidth: '1200px'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '32px'
  },
  tipsSection: {},
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#edecf0',
    marginBottom: '24px'
  },
  section: {
    marginBottom: '40px'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  sectionName: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#edecf0',
    margin: 0
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  },
  tipCard: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  tipTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 8px 0'
  },
  tipDescription: {
    fontSize: '14px',
    color: '#a1a1aa',
    margin: '0 0 16px 0',
    lineHeight: '1.5'
  },
  tipFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewDetails: {
    fontSize: '12px',
    color: '#bef264',
    fontWeight: '500'
  },
  practiceSection: {
    background: '#18181b',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #27272a',
    height: 'fit-content'
  },
  practiceTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 20px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  exerciseCard: {
    background: '#27272a',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  exerciseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  exerciseTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#edecf0',
    margin: 0
  },
  timeLimit: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#a1a1aa'
  },
  exerciseDescription: {
    fontSize: '12px',
    color: '#a1a1aa',
    margin: '0 0 8px 0'
  },
  exerciseInstructions: {
    fontSize: '13px',
    color: '#edecf0',
    margin: '0 0 12px 0',
    lineHeight: '1.4'
  },
  startExerciseBtn: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
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
    zIndex: 1000
  },
  modal: {
    background: '#18181b',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
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
  modalTitle: {
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
    cursor: 'pointer'
  },
  modalContent: {
    padding: '24px',
    maxHeight: '60vh',
    overflowY: 'auto'
  },
  modalDescription: {
    fontSize: '16px',
    color: '#a1a1aa',
    margin: '0 0 24px 0',
    lineHeight: '1.5'
  },
  detailsSection: {
    marginBottom: '24px'
  },
  detailsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#edecf0',
    margin: '0 0 12px 0'
  },
  detailsList: {
    margin: 0,
    paddingLeft: '20px',
    color: '#a1a1aa'
  },
  detailItem: {
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  practiceLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#bef264',
    margin: '0 0 8px 0'
  },
  practiceText: {
    fontSize: '14px',
    color: '#edecf0',
    margin: 0,
    padding: '12px',
    background: '#27272a',
    borderRadius: '8px',
    lineHeight: '1.4'
  }
};

export default TipsAndTricks;