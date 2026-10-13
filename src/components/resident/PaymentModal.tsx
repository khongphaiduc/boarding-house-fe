import React, { useState } from 'react';
import { X, CheckCircle, QrCode, Copy, ShieldCheck } from 'lucide-react';
import type { ResidentBill } from '../../types/boardingHouse';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

interface PaymentModalProps {
  bill: ResidentBill;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ bill, onClose }) => {
  const { payBill } = useBoardingHouse();
  const [copied, setCopied] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const transferContent = `PHONG 101 TIEN NHA ${bill.month.toUpperCase()}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPaid = () => {
    payBill(bill.id);
    setPaidSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '1rem',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 20px 35px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <QrCode size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                Thanh toán tiền phòng
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                {bill.month} - Phòng 101
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
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

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {paidSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                Thanh toán thành công!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Hệ thống đã ghi nhận thanh toán tiền phòng {bill.month}. Cảm ơn bạn!
              </p>
            </div>
          ) : (
            <>
              {/* QR Code Graphic Box */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1.5px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                {/* Simulated VietQR Canvas/SVG */}
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    backgroundColor: '#ffffff',
                    padding: '8px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="144" height="144" viewBox="0 0 144 144" fill="none">
                    <rect width="144" height="144" fill="white" />
                    {/* QR Finder patterns */}
                    <rect x="8" y="8" width="40" height="40" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                    <rect x="20" y="20" width="16" height="16" fill="#0f172a" />
                    <rect x="96" y="8" width="40" height="40" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                    <rect x="108" y="20" width="16" height="16" fill="#0f172a" />
                    <rect x="8" y="96" width="40" height="40" rx="4" stroke="#0f172a" strokeWidth="6" fill="none" />
                    <rect x="20" y="108" width="16" height="16" fill="#0f172a" />
                    {/* Simulated data dots */}
                    <path
                      d="M56 16h8v8h-8zM72 16h16v8h-16zM56 32h8v16h-8zM72 40h8v8h-8zM88 40h8v8h-8zM16 56h8v8h-8zM32 56h16v8h-16zM56 56h8v8h-8zM72 56h8v16h-8zM96 56h16v8h-16zM120 56h8v16h-8zM8 72h16v8h-16zM40 72h8v8h-8zM56 72h8v16h-8zM88 72h16v8h-16zM112 72h8v8h-8zM24 88h16v8h-16zM72 88h8v8h-8zM96 88h8v8h-8zM120 88h8v8h-8zM56 104h8v8h-8zM72 104h16v8h-16zM104 104h8v8h-8zM56 120h16v8h-16zM88 120h8v8h-8zM112 120h16v8h-16z"
                      fill="#0f172a"
                    />
                    <circle cx="72" cy="72" r="14" fill="#2563eb" />
                    <path d="M67 72l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Quét mã VietQR bằng app Ngân hàng</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2563eb', marginTop: '0.2rem' }}>
                    {bill.totalAmount.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              {/* Bank Info Table */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  fontSize: '0.82rem',
                  backgroundColor: '#f8fafc',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Ngân hàng:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>Techcombank</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Số tài khoản:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a', letterSpacing: '0.02em' }}>19036548888</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('19036548888')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563eb',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Sao chép STK"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Chủ tài khoản:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>NGUYEN VAN A</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Nội dung CK:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: 600, color: '#ea580c' }}>{transferContent}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(transferContent)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#2563eb',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      title="Sao chép nội dung"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {copied && (
                <div style={{ fontSize: '0.78rem', color: '#059669', textAlign: 'center', fontWeight: 600 }}>
                  Đã sao chép vào bộ nhớ tạm!
                </div>
              )}

              {/* Confirm Paid Button */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#64748b',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPaid}
                  style={{
                    flex: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)',
                  }}
                >
                  <ShieldCheck size={17} />
                  <span>Tôi đã chuyển khoản</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
