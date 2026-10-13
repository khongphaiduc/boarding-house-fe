import React from 'react';

export const NotificationsPage: React.FC = () => {
  const notifs = [
    { id: '1', title: 'Phòng 101 báo hỏng máy lạnh', desc: 'Máy lạnh không mát và bị rỉ nước.', time: '10 phút trước', type: 'danger' },
    { id: '2', title: 'Hợp đồng phòng 201 sắp hết hạn', desc: 'Còn 8 ngày là đến hạn hợp đồng cần liên hệ gia hạn.', time: '2 giờ trước', type: 'warning' },
    { id: '3', title: 'Nhận thanh toán tiền phòng 104', desc: 'Nguyễn Văn D đã thanh toán 3.500.000đ qua chuyển khoản.', time: 'Hôm nay', type: 'success' },
    { id: '4', title: 'Nhắc nhở chốt số điện nước', desc: 'Ngày 15 hàng tháng sẽ chốt chỉ số công tơ điện nước.', time: '1 ngày trước', type: 'info' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Trung tâm thông báo</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Thông báo hệ thống và tin nhắn từ khách thuê</p>
      </div>

      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {notifs.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem' }}>{n.title}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{n.desc}</div>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NotificationsPage;
