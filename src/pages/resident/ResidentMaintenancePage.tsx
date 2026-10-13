import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';

export const ResidentMaintenancePage: React.FC = () => {
  const { maintenanceTickets, createMaintenanceTicket, resident } = useBoardingHouse();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Điện lạnh');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('high');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createMaintenanceTicket({
      roomNumber: resident.roomNumber,
      title: title.trim(),
      category,
      priority,
      description: description.trim(),
    });

    setTitle('');
    setDescription('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="days-left-tag normal">Chờ tiếp nhận</span>;
      case 'in_progress':
        return <span className="days-left-tag warning">Đang xử lý</span>;
      case 'completed':
        return <span className="status-pill occupied">Đã hoàn thành</span>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>Báo sự cố & Yêu cầu sửa chữa</h2>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Gửi yêu cầu hỗ trợ kỹ thuật trực tiếp tới chủ nhà và theo dõi tiến độ xử lý
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.25rem', alignItems: 'start' }}>
        {/* Form gửi sự cố */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Gửi yêu cầu mới</h3>

          {submitted && (
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.85rem', fontWeight: 600 }}>
              ✓ Đã gửi yêu cầu thành công! Chủ nhà sẽ liên hệ xử lý sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Tiêu đề sự cố *
              </label>
              <input
                type="text"
                required
                placeholder="VD: Máy giặt không vắt, vòi nước rỉ..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Danh mục
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="Điện lạnh">Điện lạnh (Điều hòa)</option>
                  <option value="Thiết bị điện">Thiết bị điện (Đèn, ổ cắm)</option>
                  <option value="Cấp thoát nước">Cấp thoát nước</option>
                  <option value="Khóa & Cửa">Khóa & Cửa</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                  Mức độ ưu tiên
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <option value="high">Khẩn cấp (Cần sửa ngay)</option>
                  <option value="medium">Bình thường (Trong 24-48h)</option>
                  <option value="low">Thấp (Khi rảnh)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                Mô tả chi tiết tình trạng
              </label>
              <textarea
                rows={3}
                placeholder="Mô tả cụ thể hiện tượng, vị trí để thợ chuẩn bị dụng cụ phù hợp..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
              }}
            >
              <Plus size={16} />
              <span>Gửi yêu cầu sửa chữa</span>
            </button>
          </form>
        </div>

        {/* Lịch sử yêu cầu đã gửi */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
            Lịch sử yêu cầu của Phòng {resident.roomNumber}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {maintenanceTickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{
                  padding: '1rem',
                  borderRadius: '10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                    {ticket.title}
                  </span>
                  {getStatusBadge(ticket.status)}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
                  {ticket.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  <span>Danh mục: {ticket.category}</span>
                  <span>Gửi lúc: {ticket.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResidentMaintenancePage;
