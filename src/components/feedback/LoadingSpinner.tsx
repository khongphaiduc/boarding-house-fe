import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 28, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '2rem',
        color: 'var(--color-primary)',
      }}
    >
      <Loader2 size={size} className="animate-spin" />
      {text && <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{text}</span>}
    </div>
  );
};
