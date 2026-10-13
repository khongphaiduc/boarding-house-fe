import React from 'react';
import { Home, Users, Banknote, Wrench, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const StatCards: React.FC = () => {
  const { summary } = useBoardingHouse();

  const occupancyRate = summary.totalRooms > 0
    ? Math.round((summary.occupiedRooms / summary.totalRooms) * 100)
    : 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '1rem',
      }}
    >
      {/* Card 1: Tổng số phòng */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Home size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Tổng số phòng
          </span>
        </div>

        <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
          {summary.totalRooms}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
          <span>{summary.occupiedRooms} phòng có người ở</span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
          <div
            style={{
              flex: 1,
              height: '6px',
              backgroundColor: '#e2e8f0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${occupancyRate}%`,
                height: '100%',
                backgroundColor: '#10b981',
                borderRadius: '999px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
            {occupancyRate}%
          </span>
        </div>
      </div>

      {/* Card 2: Người thuê */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Người thuê
          </span>
        </div>

        <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
          {summary.tenants}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
          <span>{summary.vacantRooms} phòng trống</span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
          <div
            style={{
              flex: 1,
              height: '6px',
              backgroundColor: '#e2e8f0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${occupancyRate}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                borderRadius: '999px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
            {occupancyRate}%
          </span>
        </div>
      </div>

      {/* Card 3: Doanh thu tháng này */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#ecfdf5',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Banknote size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Doanh thu tháng này
          </span>
        </div>

        <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
          {summary.currentMonthRevenue.toLocaleString('vi-VN')}đ
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.78rem',
            color: '#059669',
            marginTop: 'auto',
            paddingTop: '0.25rem',
          }}
        >
          <ArrowUpRight size={15} strokeWidth={2.5} />
          <span style={{ fontWeight: 600 }}>{summary.growthPercent}%</span>
          <span style={{ color: '#64748b' }}>so với tháng trước</span>
        </div>
      </div>

      {/* Card 4: Yêu cầu sửa chữa */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#fef2f2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Wrench size={20} />
          </div>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
            Yêu cầu sửa chữa
          </span>
        </div>

        <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
          {summary.maintenanceRequests}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.78rem',
            color: '#dc2626',
            marginTop: 'auto',
            paddingTop: '0.25rem',
          }}
        >
          <AlertTriangle size={14} color="#dc2626" />
          <span style={{ fontWeight: 600 }}>{summary.processingRequests} đang xử lý</span>
        </div>
      </div>
    </div>
  );
};
