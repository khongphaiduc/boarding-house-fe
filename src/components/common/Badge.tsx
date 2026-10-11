import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  children: React.ReactNode;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
  dot = false,
  style,
  ...props
}) => {
  const getBadgeStyle = (): React.CSSProperties => {
    const colorMap = {
      primary: {
        bg: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        dotColor: 'var(--color-primary)',
      },
      success: {
        bg: 'var(--color-success-bg)',
        color: 'var(--color-success)',
        dotColor: 'var(--color-success)',
      },
      warning: {
        bg: 'var(--color-warning-bg)',
        color: 'var(--color-warning)',
        dotColor: 'var(--color-warning)',
      },
      danger: {
        bg: 'var(--color-danger-bg)',
        color: 'var(--color-danger)',
        dotColor: 'var(--color-danger)',
      },
      info: {
        bg: 'var(--color-info-bg)',
        color: 'var(--color-info)',
        dotColor: 'var(--color-info)',
      },
    }[variant];

    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.375rem',
      padding: '0.25rem 0.65rem',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.78rem',
      fontWeight: 600,
      backgroundColor: colorMap.bg,
      color: colorMap.color,
      letterSpacing: '0.01em',
      ...style,
    };
  };

  return (
    <span style={getBadgeStyle()} {...props}>
      {dot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
      {children}
    </span>
  );
};
