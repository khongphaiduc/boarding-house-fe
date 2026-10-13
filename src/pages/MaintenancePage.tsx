import React from 'react';
import { useBoardingHouse } from '../context/BoardingHouseContext';

export const MaintenancePage: React.FC = () => {
  const { summary } = useBoardingHouse();

  const requests = [
    {
      id: 'req-1',
      room: '101',
      tenant: 'Trần Văn B',
      issue: 'Máy lạnh không hoạt động, chảy nước dàn lạnh',
      status: 'processing',
      date: '12/10/2026',
      priority: 'high',
    },
    {
      id: 'req-2',
      room: '203',
      tenant: 'Vũ Thị I',
      issue: 'Bóng đèn nhà vệ sinh bị chập chờn',
      status: 'processing',
      date: '11/10/2026',
      priority: 'medium',
    },
    {
      id: 'req-3',
      room: '305',
      tenant: 'Trần Thị G',
      issue: 'Vòi xịt bồn cầu bị rò rỉ nước',
      status: 'completed',
      date: '08/10/2026',
      priority: 'low',
    },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Yêu cầu sửa chữa & bảo trì</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          {summary.maintenanceRequests} yêu cầu sửa chữa ({summary.processingRequests} đang xử lý)
        </p>
      </div>

      <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Phòng</th>
              <th>Người báo</th>
              <th>Vấn đề</th>
              <th>Ngày báo</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td style={{ fontWeight: 700 }}>Phòng {req.room}</td>
                <td>{req.tenant}</td>
                <td style={{ color: '#334155' }}>{req.issue}</td>
                <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{req.date}</td>
                <td>
                  {req.status === 'processing' ? (
                    <span className="days-left-tag warning">Đang xử lý</span>
                  ) : (
                    <span className="days-left-tag normal" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
                      Đã hoàn thành
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => alert(`Cập nhật trạng thái sửa chữa phòng ${req.room}`)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid #bfdbfe',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Xử lý
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
export default MaintenancePage;
