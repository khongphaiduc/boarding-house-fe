import React, { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

interface BoardingHeaderProps {
  onToggleSidebar: () => void;
}

export const BoardingHeader: React.FC<BoardingHeaderProps> = ({ onToggleSidebar }) => {
  const { searchQuery, setSearchQuery } = useBoardingHouse();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.75rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '480px' }}>
        {/* Mobile toggle */}
        <button
          onClick={onToggleSidebar}
          className="mobile-only-btn"
          style={{
            background: 'none',
            border: 'none',
            color: '#334155',
            cursor: 'pointer',
            padding: '0.4rem',
            display: 'none',
          }}
          aria-label="Mở menu"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={17}
            style={{
              position: 'absolute',
              left: '0.9rem',
              color: '#94a3b8',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm phòng, người thuê, hợp đồng..."
            style={{
              width: '100%',
              padding: '0.6rem 0.9rem 0.6rem 2.4rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              fontSize: '0.88rem',
              color: '#0f172a',
              outline: 'none',
              transition: 'border-color 0.15s ease, background-color 0.15s ease',
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = '#f8fafc';
              e.target.style.borderColor = '#e2e8f0';
            }}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}>
        {/* Notification Bell */}
        <button
          onClick={() => setShowNotificationMenu((prev) => !prev)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '0.5rem',
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          title="Thông báo"
          aria-label="Xem 3 thông báo mới"
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 700,
              width: '17px',
              height: '17px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 2px #ffffff',
            }}
          >
            3
          </span>
        </button>

        {/* Notification Dropdown */}
        {showNotificationMenu && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: '90px',
              marginTop: '0.5rem',
              width: '320px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.12)',
              border: '1px solid #e2e8f0',
              padding: '0.75rem 0',
              zIndex: 60,
            }}
          >
            <div
              style={{
                padding: '0.5rem 1rem',
                borderBottom: '1px solid #f1f5f9',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Thông báo mới</span>
              <span style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer' }}>Đã đọc tất cả</span>
            </div>
            <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #f8fafc',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Phòng 101 báo hỏng máy lạnh</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>10 phút trước</div>
              </div>
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #f8fafc',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Hợp đồng phòng 201 sắp hết hạn</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>2 giờ trước</div>
              </div>
              <div style={{ padding: '0.75rem 1rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>Nhận thanh toán tiền phòng 104</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Hôm nay</div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Badge (Right Top) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#1e3a8a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            N
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>
              Nguyễn Văn A
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Chủ nhà</span>
          </div>
        </div>
      </div>
    </header>
  );
};
