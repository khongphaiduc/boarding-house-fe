import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  interactive = false,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      className={`glass-card ${interactive ? 'interactive-card' : ''} ${className}`}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        ...style,
      }}
      {...props}
    >
      {header && (
        <div
          style={{
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '0.75rem',
            marginBottom: '0.25rem',
          }}
        >
          {header}
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {footer && (
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.75rem',
            marginTop: '0.25rem',
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
