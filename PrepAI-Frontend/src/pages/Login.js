import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Brain, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>
            <Brain size={32} color="#bef264" />
          </div>
          <h1 style={styles.logoText}>InterviewAI</h1>
          <p style={styles.logoSubtext}>Master Your Interviews</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to continue your interview preparation</p>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <Mail size={20} style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <Lock size={20} style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={styles.footer}>
            <span style={styles.footerText}>Don't have an account? </span>
            <Link to="/register" style={styles.footerLink}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#09090b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '12px',
    padding: '32px',
    width: '100%',
    maxWidth: '380px'
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  logoIcon: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#edecf0',
    margin: '0 0 2px 0'
  },
  logoSubtext: {
    fontSize: '13px',
    color: '#a1a1aa',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#edecf0',
    textAlign: 'center',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: '#a1a1aa',
    textAlign: 'center',
    margin: 0
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '6px',
    padding: '10px',
    color: '#ef4444',
    fontSize: '13px',
    textAlign: 'center'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#a1a1aa',
    zIndex: 1
  },
  input: {
    width: '100%',
    padding: '14px 14px 14px 44px',
    background: '#09090b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    color: '#edecf0',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  eyeButton: {
    position: 'absolute',
    right: '14px',
    background: 'none',
    border: 'none',
    color: '#a1a1aa',
    cursor: 'pointer',
    padding: '2px'
  },
  submitButton: {
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    color: '#09090b',
    border: 'none',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '4px'
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  footer: {
    textAlign: 'center',
    marginTop: '16px'
  },
  footerText: {
    color: '#a1a1aa',
    fontSize: '13px'
  },
  footerLink: {
    color: '#bef264',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '13px'
  }
};

// Add focus styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  input:focus {
    border-color: #bef264 !important;
    box-shadow: 0 0 0 3px rgba(190, 242, 100, 0.1) !important;
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(190, 242, 100, 0.3);
  }
`;
document.head.appendChild(styleSheet);

export default Login;