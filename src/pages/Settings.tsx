import React, { useState } from 'react';
import { Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [houseName, setHouseName] = useState('Nhà Trọ Xanh');
  const [address, setAddress] = useState('123 Đường Số 5, Phường Linh Trung, TP. Thủ Đức, TP. HCM');
  const [hostPhone, setHostPhone] = useState('0909 888 999');
  const [bankAccount, setBankAccount] = useState('19036548888 - Techcombank (NGUYEN VAN A)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Cài đặt hệ thống nhà trọ</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Thiết lập thông tin chung và cấu hình thanh toán</p>
      </div>

      <form onSubmit={handleSave} className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Tên khu trọ
          </label>
          <input
            type="text"
            value={houseName}
            onChange={(e) => setHouseName(e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
            Địa chỉ nhà trọ
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Số điện thoại chủ trọ
            </label>
            <input
              type="text"
              value={hostPhone}
              onChange={(e) => setHostPhone(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Tài khoản nhận tiền (STK - Ngân hàng)
            </label>
            <input
              type="text"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
          {saved ? (
            <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Đã lưu cài đặt thành công!</span>
          ) : <span />}
          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '0.55rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Save size={16} />
            <span>Lưu thay đổi</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Settings;
