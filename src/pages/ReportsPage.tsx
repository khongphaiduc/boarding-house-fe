import React from 'react';
import { RevenueBarChart } from '../components/dashboard/RevenueBarChart';
import { ServiceRevenueDonut } from '../components/dashboard/ServiceRevenueDonut';
import { RoomStatusDonut } from '../components/dashboard/RoomStatusDonut';

export const ReportsPage: React.FC = () => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Báo cáo & Thống kê</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Tổng hợp số liệu kinh doanh và tỷ lệ lấp đầy</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <RevenueBarChart />
        <RoomStatusDonut />
        <ServiceRevenueDonut />
      </div>
    </div>
  );
};
export default ReportsPage;
