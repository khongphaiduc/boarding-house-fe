import React from 'react';
import { Zap, Droplets } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentUtilitiesPage: React.FC = () => {
  const { residentBills } = useBoardingHouse();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Chỉ số Điện & Nước</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Minh bạch công tơ điện và đồng hồ nước từng kỳ ghi số
        </p>
      </div>

      {/* 2 Utility Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Electricity Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Zap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Công tơ Điện</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>Đơn giá: 3.500đ / kWh</p>
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Chỉ số cũ</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                {residentBills[0].electricity.prev}
              </div>
            </div>
            <div style={{ borderRight: '1px solid #e2e8f0' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Chỉ số mới</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2563eb', marginTop: '0.2rem' }}>
                {residentBills[0].electricity.current}
              </div>
            </div>
            <div style={{ borderRight: '1px solid #e2e8f0' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tiêu thụ</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669', marginTop: '0.2rem' }}>
                {residentBills[0].electricity.used} kWh
              </div>
            </div>
          </div>
        </div>

        {/* Water Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#ecfdf5',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Droplets size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Đồng hồ Nước</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>Đơn giá: 25.000đ / m³</p>
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              borderRadius: '10px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-around',
              textAlign: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Chỉ số cũ</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                {residentBills[0].water.prev}
              </div>
            </div>
            <div style={{ borderRight: '1px solid #e2e8f0' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Chỉ số mới</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981', marginTop: '0.2rem' }}>
                {residentBills[0].water.current}
              </div>
            </div>
            <div style={{ borderRight: '1px solid #e2e8f0' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Tiêu thụ</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669', marginTop: '0.2rem' }}>
                {residentBills[0].water.used} m³
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.25rem 0.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
            Lịch sử theo dõi qua các tháng
          </h3>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Số điện cũ</th>
              <th>Số điện mới</th>
              <th>Điện tiêu thụ</th>
              <th>Số nước cũ</th>
              <th>Số nước mới</th>
              <th>Nước tiêu thụ</th>
              <th>Tổng tiền điện + nước</th>
            </tr>
          </thead>
          <tbody>
            {residentBills.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.month}</td>
                <td>{b.electricity.prev}</td>
                <td style={{ fontWeight: 600 }}>{b.electricity.current}</td>
                <td style={{ color: '#2563eb', fontWeight: 700 }}>{b.electricity.used} kWh</td>
                <td>{b.water.prev}</td>
                <td style={{ fontWeight: 600 }}>{b.water.current}</td>
                <td style={{ color: '#10b981', fontWeight: 700 }}>{b.water.used} m³</td>
                <td style={{ fontWeight: 700 }}>
                  {(b.electricity.total + b.water.total).toLocaleString('vi-VN')}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ResidentUtilitiesPage;
