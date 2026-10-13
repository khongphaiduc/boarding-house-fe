import React from 'react';
import { Sun } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #e0f2fe 0%, #edf7ff 50%, #eff6ff 100%)',
        border: '1px solid #bfdbfe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        minHeight: '115px',
        boxShadow: '0 2px 8px rgba(37, 99, 235, 0.05)',
      }}
    >
      {/* Left Greeting */}
      <div
        style={{
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.15rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(254, 240, 138, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#eab308',
            flexShrink: 0,
            boxShadow: '0 0 16px rgba(234, 179, 8, 0.25)',
          }}
        >
          <Sun size={26} />
        </div>

        <div>
          <h2
            style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '0.2rem',
              letterSpacing: '-0.01em',
            }}
          >
            Chào mừng trở lại, Nguyễn Văn A!
          </h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: '#64748b',
              margin: 0,
              fontWeight: 400,
            }}
          >
            Hôm nay là Thứ 2, 12 tháng 10, 2026
          </p>
        </div>
      </div>

      {/* Right Townhouse Image Banner */}
      <div
        style={{
          position: 'relative',
          height: '115px',
          width: '45%',
          minWidth: '220px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {/* Soft gradient mask on left of image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #edf7ff 0%, rgba(237, 247, 255, 0.8) 15%, transparent 60%)',
            zIndex: 1,
          }}
        />
        <img
          src="/images/banner.jpg"
          alt="Nhà trọ hiện đại"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
          onError={(e) => {
            // Fallback in case local file not ready
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80';
          }}
        />
      </div>
    </div>
  );
};
