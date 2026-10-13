import React from 'react';
import { Calendar } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentAnnouncementsPage: React.FC = () => {
  const { announcements } = useBoardingHouse();

  const getTagStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return { bg: '#fee2e2', color: '#dc2626', label: 'Khẩn cấp' };
      case 'reminder':
        return { bg: '#ffedd5', color: '#ea580c', label: 'Lưu ý' };
      default:
        return { bg: '#eff6ff', color: '#2563eb', label: 'Thông báo' };
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Bảng tin & Thông báo từ Chủ nhà</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Các thông báo chính thức về vận hành, vệ sinh, bảo trì và an ninh khu trọ
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '840px' }}>
        {announcements.map((ann) => {
          const tag = getTagStyle(ann.type);
          return (
            <div
              key={ann.id}
              className="dashboard-card"
              style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span
                    style={{
                      backgroundColor: tag.bg,
                      color: tag.color,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    {tag.label}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                    {ann.title}
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8', fontSize: '0.78rem' }}>
                  <Calendar size={14} />
                  <span>{ann.date}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#334155', margin: 0, lineHeight: 1.5 }}>
                {ann.content}
              </p>

              <div style={{ fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                Người đăng: <strong>{ann.author}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ResidentAnnouncementsPage;
