import React, { useState } from 'react';
import { X, Plus, Home } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import { roomImages } from '../../assets/mockImages';
import type { RoomStatus } from '../../types/boardingHouse';

interface AddRoomModalProps {
  onClose: () => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({ onClose }) => {
  const { addRoom } = useBoardingHouse();
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('Phòng đơn');
  const [price, setPrice] = useState('2500000');
  const [floor, setFloor] = useState('1');
  const [status, setStatus] = useState<RoomStatus>('available');
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    addRoom({
      roomNumber: roomNumber.trim(),
      type,
      price: Number(price) || 2500000,
      floor: Number(floor) || 1,
      status,
      tenantName: status === 'occupied' && tenantName ? tenantName : undefined,
      tenantPhone: status === 'occupied' && tenantPhone ? tenantPhone : undefined,
      contractStart: status === 'occupied' ? '13/10/2026' : undefined,
      contractEnd: status === 'occupied' ? '12/10/2027' : undefined,
      image: roomImages[Math.floor(Math.random() * roomImages.length)],
    });

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
          maxWidth: '480px',
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
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Home size={18} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Thêm phòng trọ mới</h3>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Số phòng *
              </label>
              <input
                type="text"
                required
                placeholder="VD: 106, 206"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Tầng
              </label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="1">Tầng 1</option>
                <option value="2">Tầng 2</option>
                <option value="3">Tầng 3</option>
                <option value="4">Tầng 4</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Loại phòng
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              >
                <option value="Phòng đơn">Phòng đơn</option>
                <option value="Phòng đôi">Phòng đôi</option>
                <option value="Phòng VIP">Phòng VIP</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Giá thuê (VNĐ/tháng)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="50000"
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Trạng thái ban đầu
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="status"
                  value="available"
                  checked={status === 'available'}
                  onChange={() => setStatus('available')}
                />
                Phòng trống
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="status"
                  value="occupied"
                  checked={status === 'occupied'}
                  onChange={() => setStatus('occupied')}
                />
                Đang thuê
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="status"
                  value="maintenance"
                  checked={status === 'maintenance'}
                  onChange={() => setStatus('maintenance')}
                />
                Bảo trì
              </label>
            </div>
          </div>

          {status === 'occupied' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Tên người thuê
                </label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn X"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="VD: 0912 345 678"
                  value={tenantPhone}
                  onChange={(e) => setTenantPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.55rem 1.15rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#64748b',
                cursor: 'pointer',
              }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#2563eb',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <Plus size={16} />
              Lưu phòng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
