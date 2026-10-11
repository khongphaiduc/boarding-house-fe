import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const getStyles = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      borderRadius: 'var(--radius-md)',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled || isLoading ? 0.65 : 1,
      transition: 'all var(--transition-fast)',
      border: '1px solid transparent',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    };

    const sizeStyles = {
      sm: { padding: '0.4rem 0.8rem', fontSize: '0.85rem' },
      md: { padding: '0.625rem 1.25rem', fontSize: '0.95rem' },
      lg: { padding: '0.85rem 1.75rem', fontSize: '1.05rem' },
    }[size];

    let variantStyles: React.CSSProperties = {};

    switch (variant) {
      case 'primary':
        variantStyles = {
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          boxShadow: '0 2px 10px var(--color-primary-glow)',
        };
        break;
      case 'secondary':
        variantStyles = {
          backgroundColor: 'var(--bg-surface-elevated)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-subtle)',
        };
        break;
      case 'outline':
        variantStyles = {
          backgroundColor: 'transparent',
          color: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
        };
        break;
      case 'ghost':
        variantStyles = {
          backgroundColor: 'transparent',
          color: 'var(--text-primary)',
        };
        break;
      case 'danger':
        variantStyles = {
          backgroundColor: 'var(--color-danger)',
          color: '#ffffff',
        };
        break;
    }

    return { ...base, ...sizeStyles, ...variantStyles, ...style };
  };

  return (
    <button
      className={`custom-btn ${className}`}
      disabled={disabled || isLoading}
      style={getStyles()}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
