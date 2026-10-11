import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  style,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              left: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={`custom-input ${className}`}
          style={{
            width: '100%',
            padding: '0.625rem 0.875rem',
            paddingLeft: leftIcon ? '2.5rem' : '0.875rem',
            paddingRight: rightIcon ? '2.5rem' : '0.875rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: `1px solid ${error ? 'var(--color-danger)' : 'var(--border-subtle)'}`,
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-sans)',
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            ...style,
          }}
          {...props}
        />

        {rightIcon && (
          <span
            style={{
              position: 'absolute',
              right: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-muted)',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--color-danger)' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{helperText}</span>
      ) : null}
    </div>
  );
};
