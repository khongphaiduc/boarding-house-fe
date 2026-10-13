import React from 'react';
import { X, RefreshCw } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

interface ContractsModalProps {
  onClose: () => void;
}

export const ContractsModal: React.FC<ContractsModalProps> = ({ onClose }) => {
  const { expiringContracts } = useBoardingHouse();

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
          maxWidth: '560px',
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
            Danh sách hợp đồng sắp hết hạn
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

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '440px', overflowY: 'auto' }}>
          {expiringContracts.map((item) => (
            <div
              key={item.id}
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
                <img
                  src={item.tenantAvatar}
                  alt={item.tenantName}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
                    Phòng {item.roomNumber} - {item.tenantName}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Ngày hết hạn: <span style={{ fontWeight: 600 }}>{item.expiryDate}</span> (Còn {item.daysLeft} ngày)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => alert(`Gia hạn hợp đồng phòng ${item.roomNumber}`)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    border: '1px solid #bfdbfe',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <RefreshCw size={13} />
                  <span>Gia hạn</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
