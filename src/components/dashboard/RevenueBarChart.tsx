import React, { useState } from 'react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const RevenueBarChart: React.FC = () => {
  const { revenueMonths } = useBoardingHouse();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4); // Default to Th8 (index 4) as in mockup

  const maxVal = 50000000; // 50M
  const chartHeight = 160;

  return (
    <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1.5 }}>
      {/* Header & Legend */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
          Doanh thu 6 tháng gần nhất
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
            <span>Doanh thu</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748b' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span>Chi phí</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas / SVG Container */}
      <div style={{ position: 'relative', marginTop: '0.5rem', userSelect: 'none' }}>
        {/* Y-Axis Grid Lines & Labels */}
        <div style={{ position: 'relative', height: `${chartHeight}px`, marginLeft: '32px' }}>
          {[50, 40, 30, 20, 10, 0].map((val) => {
            const topPercent = (1 - val / 50) * 100;
            return (
              <div
                key={val}
                style={{
                  position: 'absolute',
                  top: `${topPercent}%`,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '-34px',
                    fontSize: '0.7rem',
                    color: '#94a3b8',
                    transform: 'translateY(-50%)',
                    width: '28px',
                    textAlign: 'right',
                  }}
                >
                  {val === 0 ? '0' : `${val}M`}
                </span>
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid #f1f5f9',
                  }}
                />
              </div>
            );
          })}

          {/* Bars Row */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              paddingLeft: '10px',
              paddingRight: '10px',
            }}
          >
            {revenueMonths.map((item, index) => {
              const revHeight = (item.revenue / maxVal) * chartHeight;
              const expHeight = (item.expense / maxVal) * chartHeight;
              const isSelected = hoveredIndex === index;

              return (
                <div
                  key={item.month}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '4px',
                    height: '100%',
                    position: 'relative',
                    cursor: 'pointer',
                    padding: '0 4px',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => setHoveredIndex(index)}
                >
                  {/* Revenue Bar */}
                  <div
                    style={{
                      width: '14px',
                      height: `${revHeight}px`,
                      backgroundColor: '#2563eb',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      transition: 'height 0.3s ease, filter 0.15s ease',
                      filter: isSelected ? 'brightness(1.1)' : 'none',
                    }}
                  />

                  {/* Expense Bar */}
                  <div
                    style={{
                      width: '14px',
                      height: `${expHeight}px`,
                      backgroundColor: '#10b981',
                      borderTopLeftRadius: '3px',
                      borderTopRightRadius: '3px',
                      transition: 'height 0.3s ease, filter 0.15s ease',
                      filter: isSelected ? 'brightness(1.1)' : 'none',
                    }}
                  />

                  {/* Tooltip Popup on active bar */}
                  {isSelected && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: `${Math.max(revHeight, expHeight) + 12}px`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#ffffff',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
                        border: '1px solid #e2e8f0',
                        zIndex: 20,
                        whiteSpace: 'nowrap',
                        fontSize: '0.75rem',
                        lineHeight: 1.4,
                        pointerEvents: 'none',
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.2rem' }}>
                        {item.label}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#2563eb' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                        <span>Doanh thu: {item.revenue.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span>Chi phí: {item.expense.toLocaleString('vi-VN')}đ</span>
                      </div>
                      {/* Little tooltip caret */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-5px',
                          left: '50%',
                          transform: 'translateX(-50%) rotate(45deg)',
                          width: '10px',
                          height: '10px',
                          backgroundColor: '#ffffff',
                          borderRight: '1px solid #e2e8f0',
                          borderBottom: '1px solid #e2e8f0',
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* X-Axis Month Labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginLeft: '32px',
            marginTop: '0.5rem',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {revenueMonths.map((item, index) => (
            <span
              key={item.month}
              onClick={() => setHoveredIndex(index)}
              style={{
                fontSize: '0.75rem',
                color: hoveredIndex === index ? '#2563eb' : '#64748b',
                fontWeight: hoveredIndex === index ? 600 : 400,
                cursor: 'pointer',
                textAlign: 'center',
                width: '32px',
              }}
            >
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
