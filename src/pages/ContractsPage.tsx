import React from 'react';
import { useBoardingHouse } from '../context/BoardingHouseContext';
import { Plus } from 'lucide-react';

export const ContractsPage: React.FC = () => {
  const { rooms } = useBoardingHouse();
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Hợp đồng thuê phòng</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Quản lý thời hạn thuê, gia hạn và tình trạng các hợp đồng đang hiệu lực
          </p>
        </div>
        <button
          onClick={() => alert('Chức năng tạo hợp đồng mới')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.55rem 1rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
          <span>Tạo hợp đồng</span>
        </button>
      </div>

      <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Mã HĐ</th>
              <th>Phòng</th>
              <th>Người thuê</th>
              <th>Giá thuê</th>
              <th>Thời hạn hợp đồng</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {occupiedRooms.map((room, idx) => (
              <tr key={room.id}>
                <td style={{ fontWeight: 600, color: '#2563eb' }}>HD-2026-{100 + idx}</td>
                <td style={{ fontWeight: 700 }}>Phòng {room.roomNumber}</td>
                <td>{room.tenantName} ({room.tenantPhone})</td>
                <td style={{ fontWeight: 600 }}>{room.price.toLocaleString('vi-VN')}đ/tháng</td>
                <td>{room.contractStart} - {room.contractEnd}</td>
                <td>
                  <span className="status-pill occupied">Đang hiệu lực</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => alert(`Gia hạn hợp đồng phòng ${room.roomNumber}`)}
                    style={{
                      background: 'none',
                      border: '1px solid #bfdbfe',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      borderRadius: '6px',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Gia hạn
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ContractsPage;
