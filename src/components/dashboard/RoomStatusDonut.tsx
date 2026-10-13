import React from 'react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const RoomStatusDonut: React.FC = () => {
  const { summary } = useBoardingHouse();

  const total = summary.totalRooms || 1;
  const occupiedPct = Math.round((summary.occupiedRooms / total) * 100);
  const vacantPct = Math.round((summary.vacantRooms / total) * 100);
  const maintenancePct = Math.round((summary.maintenanceRooms / total) * 100);

  // SVG Donut calculation
  const size = 140;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Offsets for stroke-dasharray
  const occupiedDash = (occupiedPct / 100) * circumference;
  const vacantDash = (vacantPct / 100) * circumference;
  const occupiedOffset = circumference * 0.25; // start from top
  const vacantOffset = occupiedOffset - occupiedDash;

  return (
    <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
        Tình trạng phòng
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '1rem',
          flex: 1,
        }}
      >
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />

            {/* Occupied Slice (Blue) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#2563eb"
              strokeWidth={strokeWidth}
              strokeDasharray={`${occupiedDash} ${circumference}`}
              strokeDashoffset={occupiedOffset}
              strokeLinecap="round"
            />

            {/* Vacant Slice (Light Slate / Blue) */}
            {vacantPct > 0 && (
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth={strokeWidth}
                strokeDasharray={`${vacantDash} ${circumference}`}
                strokeDashoffset={vacantOffset}
              />
            )}
          </svg>

          {/* Center Text */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
              {summary.totalRooms}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
              tổng phòng
            </span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
              <span style={{ color: '#475569' }}>Đang thuê</span>
            </div>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              {summary.occupiedRooms} ({occupiedPct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#cbd5e1' }} />
              <span style={{ color: '#475569' }}>Phòng trống</span>
            </div>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              {summary.vacantRooms} ({vacantPct}%)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
              <span style={{ color: '#475569' }}>Bảo trì</span>
            </div>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              {summary.maintenanceRooms} ({maintenancePct}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
