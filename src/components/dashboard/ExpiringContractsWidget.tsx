import React, { useState } from 'react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import { ContractsModal } from '../modals/ContractsModal';

export const ExpiringContractsWidget: React.FC = () => {
  const { expiringContracts } = useBoardingHouse();
  const [showModal, setShowModal] = useState(false);

  const getBadgeStyle = (daysLeft: number) => {
    if (daysLeft <= 10) {
      return {
        backgroundColor: '#fee2e2',
        color: '#ef4444',
      };
    }
    if (daysLeft <= 20) {
      return {
        backgroundColor: '#ffedd5',
        color: '#ea580c',
      };
    }
    if (daysLeft <= 25) {
      return {
        backgroundColor: '#fef3c7',
        color: '#d97706',
      };
    }
    return {
      backgroundColor: '#fef3c7',
      color: '#b45309',
    };
  };

  return (
    <>
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Hợp đồng sắp hết hạn
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

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {expiringContracts.slice(0, 5).map((item) => (
            <div
              key={item.id}
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.35rem 0.25rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={item.tenantAvatar}
                  alt={item.tenantName}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.25 }}>
                    Phòng {item.roomNumber}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                    {item.tenantName}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    Hết hạn: {item.expiryDate}
                  </span>
                </div>
              </div>

              {/* Days left badge */}
              <div
                style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  ...getBadgeStyle(item.daysLeft),
                }}
              >
                {item.daysLeft} ngày
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <ContractsModal onClose={() => setShowModal(false)} />}
    </>
  );
};
