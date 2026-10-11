import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '380px',
        width: 'calc(100% - 3rem)',
        pointerEvents: 'none',
      }}
    >
      {notifications.map((item) => {
        const getIconAndBorder = () => {
          switch (item.type) {
            case 'success':
              return {
                icon: <CheckCircle2 size={18} color="var(--color-success)" />,
                borderColor: 'var(--color-success)',
              };
            case 'warning':
              return {
                icon: <AlertTriangle size={18} color="var(--color-warning)" />,
                borderColor: 'var(--color-warning)',
              };
            case 'error':
              return {
                icon: <AlertCircle size={18} color="var(--color-danger)" />,
                borderColor: 'var(--color-danger)',
              };
            case 'info':
            default:
              return {
                icon: <Info size={18} color="var(--color-info)" />,
                borderColor: 'var(--color-info)',
              };
          }
        };

        const { icon, borderColor } = getIconAndBorder();

        return (
          <div
            key={item.id}
            className="animate-fade-in"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              padding: '0.875rem 1rem',
              backgroundColor: 'var(--bg-surface)',
              border: `1px solid var(--border-subtle)`,
              borderLeft: `4px solid ${borderColor}`,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              {icon}
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {item.message}
              </span>
            </div>
            <button
              onClick={() => removeNotification(item.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
              aria-label="Đóng thông báo"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
