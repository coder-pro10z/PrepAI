import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Target, 
  Mic,
  Globe,
  Brain,
  User
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/history', icon: Target, label: 'History' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Brain size={20} color="#09090b" />
          </div>
          <span style={styles.logoText}>InterviewAI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.menuItem,
                ...(active ? styles.menuItemActive : {})
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      {user && (
        <div style={styles.footer}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>
              <User size={16} color="#09090b" />
            </div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user.name || 'User'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  sidebar: {
    width: '240px',
    height: '100vh',
    background: '#18181b',
    borderRight: '1px solid #27272a',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000
  },
  header: {
    padding: '20px 16px',
    borderBottom: '1px solid #27272a'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#edecf0'
  },
  nav: {
    flex: 1,
    padding: '16px 0',
    overflowY: 'auto'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 16px',
    color: '#a1a1aa',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '500',
    margin: '2px 8px',
    borderRadius: '6px'
  },
  menuItemActive: {
    background: 'linear-gradient(135deg, rgba(190, 242, 100, 0.15), rgba(132, 204, 22, 0.1))',
    color: '#bef264'
  },
  footer: {
    padding: '16px',
    borderTop: '1px solid #27272a'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    background: '#27272a',
    borderRadius: '6px'
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    background: 'linear-gradient(135deg, #bef264, #84cc16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    color: '#edecf0',
    fontSize: '13px',
    fontWeight: '600'
  }
};

export default Sidebar;