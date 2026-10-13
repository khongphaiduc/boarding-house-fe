import React from 'react';
import { Zap, Droplets, Wifi, Sparkles } from 'lucide-react';

export const ServicesPage: React.FC = () => {

  const services = [
    { name: 'Tiền điện', unitPrice: '3.500đ / kWh', icon: Zap, color: '#06b6d4' },
    { name: 'Tiền nước', unitPrice: '25.000đ / m³', icon: Droplets, color: '#10b981' },
    { name: 'Internet cáp quang', unitPrice: '100.000đ / phòng / tháng', icon: Wifi, color: '#8b5cf6' },
    { name: 'Rác & Vệ sinh chung', unitPrice: '50.000đ / phòng / tháng', icon: Sparkles, color: '#f59e0b' },
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Dịch vụ & Tiện ích</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Đơn giá điện, nước, internet và dịch vụ phụ trợ</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div key={srv.name} className="dashboard-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: `${srv.color}15`,
                  color: srv.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>{srv.name}</div>
                <div style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.15rem' }}>{srv.unitPrice}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ServicesPage;
