// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div style={styles.container}>
//       <div style={styles.hero}>
//         <div style={styles.heroContent}>
//           <div style={styles.badge}>
//             <span style={styles.badgeIcon}>✨</span>
//             <span>AI-Powered Interview Practice</span>
//           </div>
          
//           <h1 style={styles.title}>
//             Master Your Next
//             <span style={styles.gradient}> Interview</span>
//           </h1>
          
//           <p style={styles.subtitle}>
//             Practice with our AI interviewer, get personalized feedback, and land your dream job. 
//             Tailored questions for every role and experience level.
//           </p>
          
//           <div style={styles.cta}>
//             {user ? (
//               <Link to="/dashboard" style={styles.primaryButton}>
//                 <span>Continue Practice</span>
//                 <span style={styles.buttonIcon}>→</span>
//               </Link>
//             ) : (
//               <div style={styles.buttonGroup}>
//                 <Link to="/register" style={styles.primaryButton}>
//                   <span>Start Free Trial</span>
//                   <span style={styles.buttonIcon}>→</span>
//                 </Link>
//                 <Link to="/login" style={styles.secondaryButton}>
//                   Sign In
//                 </Link>
//               </div>
//             )}
//           </div>
          
//           <div style={styles.stats}>
//             <div style={styles.stat}>
//               <div style={styles.statNumber}>10K+</div>
//               <div style={styles.statLabel}>Interviews Completed</div>
//             </div>
//             <div style={styles.stat}>
//               <div style={styles.statNumber}>95%</div>
//               <div style={styles.statLabel}>Success Rate</div>
//             </div>
//             <div style={styles.stat}>
//               <div style={styles.statNumber}>50+</div>
//               <div style={styles.statLabel}>Job Roles Covered</div>
//             </div>
//           </div>
//         </div>
        
//         <div style={styles.heroVisual}>
//           <div style={styles.mockupContainer}>
//             <div style={styles.mockup}>
//               <div style={styles.mockupHeader}>
//                 <div style={styles.mockupDots}>
//                   <span style={styles.dot}></span>
//                   <span style={styles.dot}></span>
//                   <span style={styles.dot}></span>
//                 </div>
//               </div>
//               <div style={styles.mockupContent}>
//                 <div style={styles.chatBubble}>
//                   <div style={styles.aiMessage}>
//                     Tell me about a challenging project you worked on recently.
//                   </div>
//                 </div>
//                 <div style={styles.chatBubble}>
//                   <div style={styles.userMessage}>
//                     I led the development of a real-time analytics dashboard...
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div style={styles.features}>
//         <div style={styles.featuresHeader}>
//           <h2 style={styles.featuresTitle}>Everything you need to ace your interview</h2>
//           <p style={styles.featuresSubtitle}>
//             Comprehensive interview preparation powered by advanced AI
//           </p>
//         </div>
        
//         <div style={styles.featuresGrid}>
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>🎯</div>
//             <h3 style={styles.featureTitle}>Role-Based Questions</h3>
//             <p style={styles.featureDescription}>
//               Get questions tailored to your specific job role, from frontend development to data science
//             </p>
//           </div>
          
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>🤖</div>
//             <h3 style={styles.featureTitle}>AI Interviewer</h3>
//             <p style={styles.featureDescription}>
//               Practice with an intelligent AI that asks follow-up questions and adapts to your responses
//             </p>
//           </div>
          
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>📊</div>
//             <h3 style={styles.featureTitle}>Performance Analytics</h3>
//             <p style={styles.featureDescription}>
//               Track your progress with detailed analytics and personalized improvement recommendations
//             </p>
//           </div>
          
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>💻</div>
//             <h3 style={styles.featureTitle}>Coding Challenges</h3>
//             <p style={styles.featureDescription}>
//               Practice technical interviews with real coding problems in multiple programming languages
//             </p>
//           </div>
          
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>🎭</div>
//             <h3 style={styles.featureTitle}>Behavioral Questions</h3>
//             <p style={styles.featureDescription}>
//               Master behavioral interviews with STAR method guidance and personalized feedback
//             </p>
//           </div>
          
//           <div style={styles.feature}>
//             <div style={styles.featureIcon}>📈</div>
//             <h3 style={styles.featureTitle}>Progress Tracking</h3>
//             <p style={styles.featureDescription}>
//               Monitor your improvement over time with comprehensive session history and insights
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: '#0a0a0a',
//     color: '#fff'
//   },
//   hero: {
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr',
//     alignItems: 'center',
//     minHeight: '100vh',
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '0 2rem',
//     gap: '4rem'
//   },
//   heroContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '2rem'
//   },
//   badge: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     background: 'rgba(99, 102, 241, 0.1)',
//     border: '1px solid rgba(99, 102, 241, 0.3)',
//     borderRadius: '24px',
//     padding: '8px 16px',
//     fontSize: '14px',
//     color: '#6366f1',
//     fontWeight: '500',
//     width: 'fit-content'
//   },
//   badgeIcon: {
//     fontSize: '16px'
//   },
//   title: {
//     fontSize: '64px',
//     fontWeight: '800',
//     lineHeight: '1.1',
//     color: '#fff',
//     margin: 0
//   },
//   gradient: {
//     background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text'
//   },
//   subtitle: {
//     fontSize: '20px',
//     color: '#999',
//     lineHeight: '1.6',
//     maxWidth: '500px'
//   },
//   cta: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem'
//   },
//   buttonGroup: {
//     display: 'flex',
//     gap: '1rem',
//     alignItems: 'center'
//   },
//   primaryButton: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '8px',
//     background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//     color: '#fff',
//     padding: '16px 32px',
//     borderRadius: '12px',
//     textDecoration: 'none',
//     fontSize: '16px',
//     fontWeight: '600',
//     transition: 'all 0.3s ease',
//     border: 'none',
//     cursor: 'pointer'
//   },
//   secondaryButton: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     background: 'rgba(255, 255, 255, 0.05)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     color: '#fff',
//     padding: '16px 32px',
//     borderRadius: '12px',
//     textDecoration: 'none',
//     fontSize: '16px',
//     fontWeight: '600',
//     transition: 'all 0.3s ease'
//   },
//   buttonIcon: {
//     fontSize: '18px',
//     transition: 'transform 0.3s ease'
//   },
//   stats: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '2rem',
//     marginTop: '2rem'
//   },
//   stat: {
//     textAlign: 'center'
//   },
//   statNumber: {
//     fontSize: '32px',
//     fontWeight: '700',
//     color: '#6366f1',
//     marginBottom: '4px'
//   },
//   statLabel: {
//     fontSize: '14px',
//     color: '#666',
//     fontWeight: '500'
//   },
//   heroVisual: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   mockupContainer: {
//     position: 'relative'
//   },
//   mockup: {
//     background: 'rgba(255, 255, 255, 0.05)',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     borderRadius: '16px',
//     width: '400px',
//     height: '500px',
//     overflow: 'hidden'
//   },
//   mockupHeader: {
//     background: 'rgba(255, 255, 255, 0.05)',
//     padding: '16px',
//     borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
//   },
//   mockupDots: {
//     display: 'flex',
//     gap: '8px'
//   },
//   dot: {
//     width: '12px',
//     height: '12px',
//     borderRadius: '50%',
//     background: '#333'
//   },
//   mockupContent: {
//     padding: '24px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px'
//   },
//   chatBubble: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   aiMessage: {
//     background: 'rgba(99, 102, 241, 0.1)',
//     border: '1px solid rgba(99, 102, 241, 0.3)',
//     borderRadius: '12px 12px 12px 4px',
//     padding: '12px 16px',
//     color: '#fff',
//     fontSize: '14px',
//     maxWidth: '80%'
//   },
//   userMessage: {
//     background: 'rgba(16, 185, 129, 0.1)',
//     border: '1px solid rgba(16, 185, 129, 0.3)',
//     borderRadius: '12px 12px 4px 12px',
//     padding: '12px 16px',
//     color: '#fff',
//     fontSize: '14px',
//     maxWidth: '80%',
//     alignSelf: 'flex-end'
//   },
//   features: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '8rem 2rem'
//   },
//   featuresHeader: {
//     textAlign: 'center',
//     marginBottom: '4rem'
//   },
//   featuresTitle: {
//     fontSize: '48px',
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: '1rem'
//   },
//   featuresSubtitle: {
//     fontSize: '20px',
//     color: '#999',
//     maxWidth: '600px',
//     margin: '0 auto'
//   },
//   featuresGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
//     gap: '2rem'
//   },
//   feature: {
//     background: 'rgba(255, 255, 255, 0.05)',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     borderRadius: '16px',
//     padding: '2rem',
//     transition: 'all 0.3s ease'
//   },
//   featureIcon: {
//     fontSize: '48px',
//     marginBottom: '1rem'
//   },
//   featureTitle: {
//     fontSize: '24px',
//     fontWeight: '600',
//     color: '#fff',
//     marginBottom: '1rem'
//   },
//   featureDescription: {
//     fontSize: '16px',
//     color: '#999',
//     lineHeight: '1.6'
//   }
// };

// export default Home;