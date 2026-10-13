import React from 'react';
import { X } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

interface TasksModalProps {
  onClose: () => void;
}

export const TasksModal: React.FC<TasksModalProps> = ({ onClose }) => {
  const { tasks } = useBoardingHouse();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          boxShadow: '0 20px 35px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
            Tất cả việc cần làm hôm nay
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                  {task.title}
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 400, marginTop: '0.15rem' }}>
                    {task.subtitle}
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert(`Đã xử lý: ${task.title}`)}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  border: '1px solid #bfdbfe',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Xử lý ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
