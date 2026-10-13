import React from 'react';
import { X, User, Phone, Calendar } from 'lucide-react';
import type { Room } from '../../types/boardingHouse';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

interface RoomDetailModalProps {
  room: Room;
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose }) => {
  const { updateRoom } = useBoardingHouse();

  const handleStatusChange = (newStatus: Room['status']) => {
    updateRoom(room.id, { status: newStatus });
    onClose();
  };

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
          maxWidth: '460px',
          boxShadow: '0 20px 35px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
              Chi tiết Phòng {room.roomNumber}
            </span>
          </div>
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

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Room Image */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', height: '140px', backgroundColor: '#f1f5f9' }}>
            <img
              src={room.image}
              alt={`Phòng ${room.roomNumber}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Details list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.85rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Loại phòng</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '0.2rem' }}>{room.type}</div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Giá thuê</div>
              <div style={{ fontWeight: 600, color: '#2563eb', marginTop: '0.2rem' }}>
                {room.price.toLocaleString('vi-VN')}đ / tháng
              </div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Tầng</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '0.2rem' }}>Tầng {room.floor}</div>
            </div>

            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Trạng thái</div>
              <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '0.2rem' }}>
                {room.status === 'occupied' ? 'Đang thuê' : room.status === 'available' ? 'Phòng trống' : 'Bảo trì'}
              </div>
            </div>
          </div>

          {/* Tenant Information if occupied */}
          {room.status === 'occupied' && (
            <div
              style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>Thông tin người thuê</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <User size={15} color="#2563eb" />
                <span>{room.tenantName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Phone size={15} color="#10b981" />
                <span>{room.tenantPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                <Calendar size={15} color="#f59e0b" />
                <span>Hợp đồng: {room.contractStart} - {room.contractEnd}</span>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {room.status !== 'occupied' && (
              <button
                onClick={() => handleStatusChange('occupied')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Đánh dấu Đang thuê
              </button>
            )}
            {room.status !== 'available' && (
              <button
                onClick={() => handleStatusChange('available')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  color: '#475569',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Chuyển thành Trống
              </button>
            )}
            {room.status !== 'maintenance' && (
              <button
                onClick={() => handleStatusChange('maintenance')}
                style={{
                  flex: 1,
                  padding: '0.55rem',
                  borderRadius: '8px',
                  border: '1px solid #fecaca',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Báo bảo trì
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
