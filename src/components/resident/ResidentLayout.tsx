import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import {
  Home,
  Receipt,
  Zap,
  FileText,
  Wrench,
  Bell,
  BookOpen,
  ArrowLeftRight,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentLayout: React.FC = () => {
  const { resident, residentBills } = useBoardingHouse();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unpaidBillsCount = residentBills.filter((b) => b.status === 'unpaid').length;

  const residentNavItems = [
    { name: 'Tổng quan phòng', path: '/resident', icon: Home, end: true },
    { name: 'Hóa đơn tiền phòng', path: '/resident/bills', icon: Receipt, badge: unpaidBillsCount > 0 ? unpaidBillsCount : null },
    { name: 'Chỉ số điện & nước', path: '/resident/utilities', icon: Zap },
    { name: 'Hợp đồng thuê', path: '/resident/contract', icon: FileText },
    { name: 'Báo sự cố & sửa chữa', path: '/resident/maintenance', icon: Wrench },
    { name: 'Bảng tin & Thông báo', path: '/resident/announcements', icon: Bell },
    { name: 'Nội quy nhà trọ', path: '/resident/rules', icon: BookOpen },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6fa' }}>
      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
          }}
        />
      )}

      {/* Resident Sidebar */}
      <aside
        className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          backgroundColor: '#0f172a',
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
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
                Cư Dân Trọ
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Phòng {resident.roomNumber} - {resident.name}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(false)}
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

        {/* Navigation List */}
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
          {residentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.95rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  backgroundColor: isActive ? '#059669' : 'transparent',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <Icon size={19} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '999px',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.45rem',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Switch Role Button to Landlord view */}
        <div
          style={{
            padding: '1rem 0.85rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(37, 99, 235, 0.18)',
              color: '#93c5fd',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '0.6rem 0.75rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background-color 0.15s ease',
            }}
          >
            <ArrowLeftRight size={16} />
            <span>Chuyển sang góc nhìn Chủ nhà</span>
          </Link>

          {/* Resident profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.25rem 0.5rem' }}>
            <img
              src={resident.avatar}
              alt={resident.name}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #10b981',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff', lineHeight: 1.2 }}>
                {resident.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Cư dân Phòng {resident.roomNumber}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        {/* Resident Header */}
        <header
          style={{
            height: '64px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="mobile-only-btn"
              style={{
                background: 'none',
                border: 'none',
                color: '#334155',
                cursor: 'pointer',
                padding: '0.4rem',
              }}
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a' }}>
                Cổng thông tin Cư dân
              </span>
              <span
                style={{
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                Phòng {resident.roomNumber}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '0.45rem 0.85rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <ArrowLeftRight size={14} />
              <span>Về giao diện Chủ nhà</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <img
                src={resident.avatar}
                alt={resident.name}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #10b981',
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                {resident.name}
              </span>
            </div>
          </div>
        </header>

        {/* Content View */}
        <main style={{ flex: 1, padding: '1.5rem 1.75rem' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default ResidentLayout;
