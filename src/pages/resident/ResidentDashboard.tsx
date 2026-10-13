import React, { useState } from 'react';
import {
  CreditCard,
  Zap,
  Droplets,
  Calendar,
  AlertTriangle,
  Phone,
  MessageSquare,
  ShieldAlert,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import { PaymentModal } from '../../components/resident/PaymentModal';
import { Link } from 'react-router-dom';

export const ResidentDashboard: React.FC = () => {
  const { resident, residentBills, contract, maintenanceTickets, announcements } = useBoardingHouse();
  const [showPayModal, setShowPayModal] = useState(false);

  const currentBill = residentBills[0]; // October 2026
  const activeTicket = maintenanceTickets.find((t) => t.status !== 'completed');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Welcome Banner */}
      <div
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #e0f2fe 100%)',
          border: '1px solid #a7f3d0',
          padding: '1.5rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <img
            src={resident.avatar}
            alt={resident.name}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #10b981',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
            }}
          />
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
              Xin chào, {resident.name}! 👋
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#047857', margin: 0, fontWeight: 500 }}>
              Cư dân Phòng {resident.roomNumber} ({resident.roomType}) • Tầng {resident.floor} • Diện tích {resident.area}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to="/resident/maintenance"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            <AlertTriangle size={16} color="#ea580c" />
            <span>Báo sự cố phòng</span>
          </Link>

          {currentBill.status === 'unpaid' && (
            <button
              onClick={() => setShowPayModal(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.55rem 1.15rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)',
              }}
            >
              <CreditCard size={16} />
              <span>Thanh toán hóa đơn</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        {/* Bill Stat Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
              Tiền phòng {currentBill.month}
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: currentBill.status === 'unpaid' ? '#fef3c7' : '#ecfdf5',
                color: currentBill.status === 'unpaid' ? '#d97706' : '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CreditCard size={17} />
            </div>
          </div>

          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#0f172a' }}>
            {currentBill.totalAmount.toLocaleString('vi-VN')}đ
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
            {currentBill.status === 'unpaid' ? (
              <span className="days-left-tag warning">Chưa nộp (Hạn: {currentBill.dueDate})</span>
            ) : (
              <span className="status-pill occupied">Đã thanh toán</span>
            )}
            {currentBill.status === 'unpaid' && (
              <button
                onClick={() => setShowPayModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Trả ngay &rarr;
              </button>
            )}
          </div>
        </div>

        {/* Electricity */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
              Điện tiêu thụ tháng này
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={17} />
            </div>
          </div>

          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#0f172a' }}>
            {currentBill.electricity.used} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>kWh</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
            <span>Số mới: {currentBill.electricity.current}</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              {currentBill.electricity.total.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Water */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
              Nước tiêu thụ tháng này
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Droplets size={17} />
            </div>
          </div>

          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: '#0f172a' }}>
            {currentBill.water.used} <span style={{ fontSize: '1rem', fontWeight: 500, color: '#64748b' }}>m³</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
            <span>Số mới: {currentBill.water.current}</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>
              {currentBill.water.total.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Contract */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
              Thời hạn hợp đồng
            </span>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#f5f3ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Calendar size={17} />
            </div>
          </div>

          <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#0f172a' }}>
            {contract.endDate}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b' }}>
            <span>Mã: {contract.contractCode}</span>
            <span style={{ color: '#059669', fontWeight: 600 }}>Hiệu lực 1 năm</span>
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Bill Details & Active Maintenance */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '1.25rem',
        }}
      >
        {/* Left: Chi tiết hóa đơn tháng này */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Chi tiết hóa đơn {currentBill.month}
            </h3>
            <Link
              to="/resident/bills"
              style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
            >
              Lịch sử các tháng &rarr;
            </Link>
          </div>

          {/* Breakdown Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Tiền thuê phòng:</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                {currentBill.roomPrice.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <span style={{ color: '#64748b' }}>Tiền điện: </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  ({currentBill.electricity.used} kWh x {currentBill.electricity.rate.toLocaleString('vi-VN')}đ)
                </span>
              </div>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                {currentBill.electricity.total.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <span style={{ color: '#64748b' }}>Tiền nước: </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                  ({currentBill.water.used} m³ x {currentBill.water.rate.toLocaleString('vi-VN')}đ)
                </span>
              </div>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                {currentBill.water.total.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Internet tốc độ cao:</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                {currentBill.internet.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.45rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Rác & Vệ sinh chung:</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                {currentBill.cleaning.toLocaleString('vi-VN')} đ
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem 0 0',
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              <span>Tổng thanh toán:</span>
              <span style={{ color: '#2563eb' }}>
                {currentBill.totalAmount.toLocaleString('vi-VN')} đ
              </span>
            </div>
          </div>

          {currentBill.status === 'unpaid' ? (
            <button
              onClick={() => setShowPayModal(true)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#10b981',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
              }}
            >
              <CreditCard size={18} />
              <span>Quét mã VietQR chuyển khoản ngay</span>
            </button>
          ) : (
            <div
              style={{
                padding: '0.65rem',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                textAlign: 'center',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              ✓ Hóa đơn này đã được thanh toán
            </div>
          )}
        </div>

        {/* Right: Trạng thái sự cố & Hotline chủ nhà */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Active Maintenance Ticket */}
          <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                Sự cố phòng đang báo
              </h3>
              <Link
                to="/resident/maintenance"
                style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
              >
                Gửi yêu cầu &rarr;
              </Link>
            </div>

            {activeTicket ? (
              <div
                style={{
                  padding: '0.85rem',
                  borderRadius: '10px',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #fed7aa',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#9a3412' }}>
                    {activeTicket.title}
                  </span>
                  <span className="days-left-tag warning" style={{ fontSize: '0.7rem' }}>
                    Đang xử lý
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#7c2d12', margin: 0 }}>
                  {activeTicket.description}
                </p>
                <div style={{ fontSize: '0.72rem', color: '#9a3412', marginTop: '0.2rem' }}>
                  Gửi lúc: {activeTicket.createdAt}
                </div>
              </div>
            ) : (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                Không có sự cố nào đang báo. Thiết bị phòng hoạt động tốt!
              </div>
            )}
          </div>

          {/* Landlord Contact Box */}
          <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Liên hệ chủ trọ hỗ trợ
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                }}
              >
                N
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>
                  {contract.landlordName}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Chủ nhà / Quản lý trọ</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginTop: '0.25rem' }}>
              <a
                href={`tel:${contract.landlordPhone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: '#eff6ff',
                  color: '#2563eb',
                  border: '1px solid #bfdbfe',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Phone size={15} />
                <span>Gọi điện</span>
              </a>
              <button
                onClick={() => alert(`Liên hệ Zalo chủ nhà: ${contract.landlordZalo}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  border: '1px solid #a7f3d0',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <MessageSquare size={15} />
                <span>Nhắn Zalo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Announcements & Quick Rules */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '1.25rem',
        }}
      >
        {/* Latest Announcements */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Bảng tin nhà trọ mới nhất
            </h3>
            <Link
              to="/resident/announcements"
              style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
            >
              Xem tất cả &rarr;
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {announcements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                style={{
                  padding: '0.75rem 0.85rem',
                  borderRadius: '8px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                    {ann.title}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{ann.date}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Rules reminder */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
              Nội quy cần nhớ
            </h3>
            <Link
              to="/resident/rules"
              style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
            >
              Xem nội quy &rarr;
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={15} color="#ea580c" />
              <span>Khóa cổng an ninh tự động sau 23h00 (mở bằng vân tay).</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={15} color="#10b981" />
              <span>Đổ rác trước 21h00 tại khu tập kết tầng trệt.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={15} color="#ef4444" />
              <span>Tắt aptomat điều hòa và bình nóng lạnh khi vắng nhà.</span>
            </div>
          </div>
        </div>
      </div>

      {showPayModal && <PaymentModal bill={currentBill} onClose={() => setShowPayModal(false)} />}
    </div>
  );
};
export default ResidentDashboard;
