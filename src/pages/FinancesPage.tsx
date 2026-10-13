import React from 'react';
import { useBoardingHouse } from '../context/BoardingHouseContext';
import { RevenueBarChart } from '../components/dashboard/RevenueBarChart';
import { ServiceRevenueDonut } from '../components/dashboard/ServiceRevenueDonut';

export const FinancesPage: React.FC = () => {
  const { summary } = useBoardingHouse();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Quản lý thu chi</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Doanh thu hiện tại tháng này: <strong>{summary.currentMonthRevenue.toLocaleString('vi-VN')}đ</strong> (tăng {summary.growthPercent}%)
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        <RevenueBarChart />
        <ServiceRevenueDonut />
      </div>
    </div>
  );
};
export default FinancesPage;
