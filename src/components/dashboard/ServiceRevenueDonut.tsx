import React from 'react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ServiceRevenueDonut: React.FC = () => {
  const { serviceRevenues } = useBoardingHouse();

  const size = 135;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate cumulative offsets for SVG multi-arc donut
  let cumulativePercent = 0;
  const arcs = serviceRevenues.map((item) => {
    const strokeDash = (item.percentage / 100) * circumference;
    const strokeOffset = circumference * 0.25 - (cumulativePercent / 100) * circumference;
    cumulativePercent += item.percentage;
    return {
      ...item,
      strokeDash,
      strokeOffset,
    };
  });

  return (
    <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
        Doanh thu theo dịch vụ
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {arcs.map((arc) => (
              <circle
                key={arc.service}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arc.strokeDash} ${circumference}`}
                strokeDashoffset={arc.strokeOffset}
              />
            ))}
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
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.1 }}>
              32.5M
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
              tháng này
            </span>
          </div>
        </div>

        {/* Breakdown List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1, minWidth: 0 }}>
          {serviceRevenues.map((item) => (
            <div
              key={item.service}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#475569', whiteSpace: 'nowrap' }}>{item.service}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>
                  {item.amount.toLocaleString('vi-VN')}đ
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
