import React from 'react';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { StatCards } from '../components/dashboard/StatCards';
import { RevenueBarChart } from '../components/dashboard/RevenueBarChart';
import { RoomStatusDonut } from '../components/dashboard/RoomStatusDonut';
import { TodoListWidget } from '../components/dashboard/TodoListWidget';
import { ServiceRevenueDonut } from '../components/dashboard/ServiceRevenueDonut';
import { ExpiringContractsWidget } from '../components/dashboard/ExpiringContractsWidget';
import { RoomListTable } from '../components/dashboard/RoomListTable';

export const Dashboard: React.FC = () => {
  return (
    <div
      className="dashboard-main-grid animate-fade-in"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: '1.25rem',
        alignItems: 'start',
      }}
    >
      {/* Left Main Content Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
        {/* 1. Hero Greeting Banner */}
        <HeroBanner />

        {/* 2. Four KPI Stat Cards */}
        <StatCards />

        {/* 3. Two Charts Row: 6-Month Revenue & Room Occupancy Status */}
        <div
          style={{
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <RevenueBarChart />
          <RoomStatusDonut />
        </div>

        {/* 4. Room Management Table */}
        <RoomListTable />
      </div>

      {/* Right Column: Widgets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: 0 }}>
        {/* 1. Việc cần làm hôm nay */}
        <TodoListWidget />

        {/* 2. Doanh thu theo dịch vụ */}
        <ServiceRevenueDonut />

        {/* 3. Hợp đồng sắp hết hạn */}
        <ExpiringContractsWidget />
      </div>
    </div>
  );
};
export default Dashboard;
