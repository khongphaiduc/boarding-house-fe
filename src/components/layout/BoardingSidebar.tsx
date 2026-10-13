import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  DoorOpen,
  FileText,
  Users,
  CircleDollarSign,
  Package,
  Wrench,
  Bell,
  PieChart,
  Settings,
  ChevronRight,
  X,
} from 'lucide-react';
import { userAvatars } from '../../assets/mockImages';

interface BoardingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoardingSidebar: React.FC<BoardingSidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Tổng quan', path: '/', icon: Home },
    { name: 'Phòng trọ', path: '/rooms', icon: DoorOpen },
    { name: 'Hợp đồng', path: '/contracts', icon: FileText },
    { name: 'Người thuê', path: '/tenants', icon: Users },
    { name: 'Thu chi', path: '/finances', icon: CircleDollarSign },
    { name: 'Dịch vụ', path: '/services', icon: Package },
    { name: 'Yêu cầu sửa chữa', path: '/maintenance', icon: Wrench },
    { name: 'Thông báo', path: '/notifications', icon: Bell },
    { name: 'Báo cáo', path: '/reports', icon: PieChart },
    { name: 'Cài đặt', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
          }}
        />
      )}

      <aside
        className={`sidebar-container ${isOpen ? 'open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--sidebar-bg)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexShrink: 0,
          zIndex: 95,
          userSelect: 'none',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
              }}
            >
              <Home size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Nhà Trọ
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Quản lý dễ dàng</div>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="mobile-only-btn"
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === '/'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.75rem 0.95rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#2563eb' : 'transparent',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                })}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.classList.contains('active')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer User Profile Card */}
        <div
          style={{
            padding: '1rem 0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.65rem',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={userAvatars.host}
                alt="Nguyễn Văn A"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #3b82f6',
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}>
                  Nguyễn Văn A
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Chủ nhà</span>
              </div>
            </div>
            <ChevronRight size={16} color="#64748b" />
          </div>
        </div>
      </aside>
    </>
  );
};
