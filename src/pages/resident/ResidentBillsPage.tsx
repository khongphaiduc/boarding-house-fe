import React, { useState } from 'react';
import { CreditCard, Download, CheckCircle, Clock } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import { PaymentModal } from '../../components/resident/PaymentModal';
import type { ResidentBill } from '../../types/boardingHouse';

export const ResidentBillsPage: React.FC = () => {
  const { residentBills } = useBoardingHouse();
  const [selectedBillForPay, setSelectedBillForPay] = useState<ResidentBill | null>(null);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Hóa đơn tiền phòng & Dịch vụ</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Lịch sử chi tiết tiền phòng, điện, nước và dịch vụ hàng tháng của Phòng 101
        </p>
      </div>

      <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Kỳ thanh toán</th>
              <th>Tiền phòng</th>
              <th>Điện (kWh)</th>
              <th>Nước (m³)</th>
              <th>Dịch vụ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'right' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {residentBills.map((bill) => (
              <tr key={bill.id}>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{bill.month}</td>
                <td>{bill.roomPrice.toLocaleString('vi-VN')}đ</td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>{bill.electricity.total.toLocaleString('vi-VN')}đ</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({bill.electricity.used} kWh)</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>{bill.water.total.toLocaleString('vi-VN')}đ</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({bill.water.used} m³)</span>
                  </div>
                </td>
                <td>{(bill.internet + bill.cleaning).toLocaleString('vi-VN')}đ</td>
                <td style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.95rem' }}>
                  {bill.totalAmount.toLocaleString('vi-VN')}đ
                </td>
                <td>
                  {bill.status === 'paid' ? (
                    <span className="status-pill occupied">
                      <CheckCircle size={12} />
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="days-left-tag warning">
                      <Clock size={12} />
                      Chưa nộp (Hạn: {bill.dueDate})
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {bill.status === 'unpaid' ? (
                    <button
                      onClick={() => setSelectedBillForPay(bill)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '6px',
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <CreditCard size={14} />
                      <span>Thanh toán</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`Đang tải hóa đơn VAT điện tử: ${bill.month}`)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '6px',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <Download size={14} />
                      <span>Tải biên lai</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBillForPay && (
        <PaymentModal bill={selectedBillForPay} onClose={() => setSelectedBillForPay(null)} />
      )}
    </div>
  );
};
export default ResidentBillsPage;
