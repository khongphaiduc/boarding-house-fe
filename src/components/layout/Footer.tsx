import React from 'react';
import { Heart, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '1.5rem var(--space-6)',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={16} color="var(--color-primary)" />
          <span>React 19 Base Starter Template</span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Built with <Heart size={14} color="var(--color-danger)" /> for high-performance development
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span>Vite + TypeScript + Strict Mode</span>
          <span>•</span>
          <span>Ready for Production</span>
        </div>
      </div>
    </footer>
  );
};
