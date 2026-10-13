import React from 'react';
import { FileText, Download, RefreshCw, ShieldCheck } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentContractPage: React.FC = () => {
  const { resident, contract } = useBoardingHouse();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Hợp đồng thuê phòng</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
            Hợp đồng số <strong>{contract.contractCode}</strong> • Trạng thái: Đang hiệu lực
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => alert('Đang xuất file hợp đồng điện tử PDF có chữ ký số...')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Download size={15} />
            <span>Tải hợp đồng PDF</span>
          </button>
          <button
            onClick={() => alert('Yêu cầu gia hạn hợp đồng đã được gửi đến chủ nhà Nguyễn Văn A!')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={15} />
            <span>Gia hạn hợp đồng</span>
          </button>
        </div>
      </div>

      {/* Contract Detail Card */}
      <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                Hợp đồng thuê nhà ở số {contract.contractCode}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Ký kết ngày {contract.startDate}
              </div>
            </div>
          </div>
          <span className="status-pill occupied">
            <ShieldCheck size={14} />
            Đang hiệu lực
          </span>
        </div>

        {/* 2 Columns Parties */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Landlord Side */}
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Bên A (Bên cho thuê)
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{contract.landlordName}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>Vai trò: Chủ sở hữu / Quản lý nhà trọ</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>SĐT liên hệ: {contract.landlordPhone}</div>
          </div>

          {/* Tenant Side */}
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Bên B (Bên thuê phòng)
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{resident.name}</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>Phòng thuê: Phòng {resident.roomNumber} ({resident.roomType})</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>SĐT đăng ký: {resident.phone}</div>
          </div>
        </div>

        {/* Terms Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Thời hạn thuê</div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '0.2rem' }}>
              {contract.startDate} - {contract.endDate}
            </div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Giá thuê hàng tháng</div>
            <div style={{ fontWeight: 700, color: '#2563eb', marginTop: '0.2rem' }}>
              {contract.monthlyRent.toLocaleString('vi-VN')} đ / tháng
            </div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tiền đặt cọc đã nộp</div>
            <div style={{ fontWeight: 700, color: '#10b981', marginTop: '0.2rem' }}>
              {contract.deposit.toLocaleString('vi-VN')} đ
            </div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Kỳ hạn nộp tiền</div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginTop: '0.2rem' }}>
              Từ ngày 10 đến 15 hàng tháng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResidentContractPage;
