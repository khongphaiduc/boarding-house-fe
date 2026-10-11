import React from 'react';
import { Sun, Moon, Bell, Menu, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useApp } from '../../hooks/useApp';
import { Button } from '../common/Button';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, notifications, addNotification } = useApp();

  const handleTestNotification = () => {
    addNotification('Đây là thông báo mẫu tương tác!', 'info');
  };

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        transition: 'background-color var(--transition-normal)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="mobile-only-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--radius-sm)',
          }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              ReactBase<span style={{ color: 'var(--color-primary)' }}>.TS</span>
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Test Notification Trigger */}
        <button
          onClick={handleTestNotification}
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.5rem',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
          title="Thử nghiệm thông báo"
          aria-label="Xem thông báo"
        >
          <Bell size={18} />
          {notifications.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                backgroundColor: 'var(--color-danger)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {notifications.length}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleTheme}
          aria-label="Chuyển đổi giao diện Sáng / Tối"
          style={{ padding: '0.5rem', minWidth: '38px', height: '38px' }}
        >
          {theme === 'dark' ? <Sun size={18} color="#fbbf24" /> : <Moon size={18} color="#6366f1" />}
        </Button>

        {/* User Avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            paddingLeft: '0.5rem',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--color-primary)',
            }}
          />
          <div className="desktop-user-info" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {user.name}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
