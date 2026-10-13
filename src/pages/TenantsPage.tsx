import React from 'react';
import { useBoardingHouse } from '../context/BoardingHouseContext';
import { Phone, Calendar } from 'lucide-react';

export const TenantsPage: React.FC = () => {
  const { rooms } = useBoardingHouse();
  const tenants = rooms.filter((r) => r.status === 'occupied');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Danh sách người thuê trọ</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Tổng cộng {tenants.length} khách thuê hiện đang lưu trú
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        {tenants.map((room) => (
          <div key={room.id} className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img
                src={room.tenantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                alt={room.tenantName}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#0f172a' }}>{room.tenantName}</div>
                <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600 }}>Phòng {room.roomNumber} ({room.type})</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#10b981" />
                <span>{room.tenantPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={14} color="#f59e0b" />
                <span>Hợp đồng: {room.contractStart} - {room.contractEnd}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default TenantsPage;
