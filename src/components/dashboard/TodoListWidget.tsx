import React, { useState } from 'react';
import { FileText, Receipt, Wrench, UserMinus } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import { TasksModal } from '../modals/TasksModal';

export const TodoListWidget: React.FC = () => {
  const { tasks } = useBoardingHouse();
  const [showModal, setShowModal] = useState(false);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText size={18} color="#ea580c" />;
      case 'invoice':
        return <Receipt size={18} color="#ea580c" />;
      case 'repair':
        return <Wrench size={18} color="#dc2626" />;
      case 'moveout':
        return <UserMinus size={18} color="#7c3aed" />;
      default:
        return <FileText size={18} color="#ea580c" />;
    }
  };

  const getTaskBg = (type: string) => {
    switch (type) {
      case 'contract':
      case 'invoice':
        return '#fff7ed';
      case 'repair':
        return '#fef2f2';
      case 'moveout':
        return '#f5f3ff';
      default:
        return '#fff7ed';
    }
  };

  return (
    <>
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Việc cần làm hôm nay
          </h3>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Xem tất cả
          </button>
        </div>

        {/* List of Tasks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                cursor: 'pointer',
                borderRadius: '8px',
                padding: '0.35rem 0.25rem',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              {/* Icon */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: getTaskBg(task.iconType),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {getTaskIcon(task.iconType)}
              </div>

              {/* Text */}
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#0f172a',
                    lineHeight: 1.25,
                  }}
                >
                  {task.title}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {task.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <TasksModal onClose={() => setShowModal(false)} />}
    </>
  );
};
