import React from 'react';
import { RoomListTable } from '../components/dashboard/RoomListTable';
import { StatCards } from '../components/dashboard/StatCards';

export const RoomsPage: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Quản lý phòng trọ</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Theo dõi chi tiết danh sách, tình trạng phòng, giá thuê và thông tin người ở
          </p>
        </div>
      </div>

      <StatCards />
      <RoomListTable />
    </div>
  );
};
export default RoomsPage;
