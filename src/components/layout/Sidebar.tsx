import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Home, Layers, Settings, Code, GitFork, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'UI Components', path: '/components', icon: Layers },
    { name: 'Cài đặt', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="mobile-backdrop"
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
        />
      )}

      <aside
        className={`app-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - var(--header-height))',
          position: 'sticky',
          top: 'var(--header-height)',
          zIndex: 95,
          transition: 'transform var(--transition-normal), background-color var(--transition-normal)',
        }}
      >
        <div style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              padding: '0 0.75rem',
              marginBottom: '0.25rem',
            }}
          >
            Điều hướng chính
          </span>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === '/'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                })}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* System Stack Info Card */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div
            style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.625rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Base Tech Stack
              </span>
              <Badge variant="success" dot>Ready</Badge>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Code size={13} color="var(--color-primary)" />
                <span>React 19 + TypeScript</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <GitFork size={13} color="var(--color-secondary)" />
                <span>Vite 8.x Bundler</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={13} color="var(--color-success)" />
                <span>React Router v7 / v6</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
