import React, { useState } from 'react';
import {
  Search,
  Mail,
  Send,
  Eye,
  CheckCircle,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/feedback/LoadingSpinner';
import { useApp } from '../hooks/useApp';

export const ComponentsPage: React.FC = () => {
  const { addNotification } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const triggerLoading = () => {
    setBtnLoading(true);
    addNotification('Bắt đầu xử lý tác vụ bất đồng bộ...', 'info');
    setTimeout(() => {
      setBtnLoading(false);
      addNotification('Xử lý thành công!', 'success');
    }, 2000);
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>UI Components Showcase</h1>
        <p>Bộ thư viện giao diện được xây dựng từ Vanilla CSS, dễ dàng tùy biến và tối ưu chuẩn TypeScript.</p>
      </div>

      {/* Button Section */}
      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem' }}>1. Buttons & Variants</h3>
            <Badge variant="primary">Custom UI</Badge>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
              Kiểu dáng (Variants):
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>
              Kích thước & Trạng thái (Sizes & Loading):
            </span>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button
                variant="primary"
                isLoading={btnLoading}
                onClick={triggerLoading}
                leftIcon={<Flame size={16} />}
              >
                {btnLoading ? 'Đang gửi...' : 'Bấm thử Loading State'}
              </Button>
              <Button variant="primary" disabled>
                Disabled Button
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Badges Section */}
      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem' }}>2. Status Badges</h3>
            <Badge variant="success">Labels</Badge>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.9rem' }}>Các loại huy hiệu trạng thái có hỗ trợ dot pulse và bảng màu linh hoạt:</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Badge variant="primary" dot>Primary Active</Badge>
            <Badge variant="success" dot>Success Online</Badge>
            <Badge variant="warning" dot>Warning Pending</Badge>
            <Badge variant="danger" dot>Danger Failed</Badge>
            <Badge variant="info" dot>Info Processing</Badge>
          </div>
        </div>
      </Card>

      {/* Form Inputs Section */}
      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem' }}>3. Form Inputs & Text Fields</h3>
            <Badge variant="info">Forms</Badge>
          </div>
        }
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <Input
            label="Ô tìm kiếm có icon"
            placeholder="Nhập từ khóa cần tìm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={18} />}
            helperText="Nhập từ khóa và kiểm tra debounce"
          />

          <Input
            label="Email công việc"
            type="email"
            placeholder="name@company.com"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            leftIcon={<Mail size={18} />}
            rightIcon={<Send size={16} />}
            helperText="Chúng tôi không bao giờ chia sẻ email của bạn."
          />

          <Input
            label="Trường hợp báo lỗi (Error State)"
            defaultValue="invalid-format-domain"
            error="Vui lòng nhập định dạng tên miền hợp lệ!"
            leftIcon={<AlertTriangle size={18} color="var(--color-danger)" />}
          />
        </div>
      </Card>

      {/* Modal & Dialog Section */}
      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem' }}>4. Modals & Dialogs</h3>
            <Badge variant="warning">Feedback</Badge>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.9rem' }}>
            Hộp thoại Modal hỗ trợ đóng bằng phím ESC, click ra ngoài nền mờ blur, và animation mượt mà:
          </p>
          <div>
            <Button variant="primary" leftIcon={<Eye size={16} />} onClick={() => setIsModalOpen(true)}>
              Mở Modal Demo
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading Spinners */}
      <Card
        header={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem' }}>5. Loading Spinner Feedback</h3>
            <Badge variant="primary">Spinners</Badge>
          </div>
        }
      >
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'space-around' }}>
          <LoadingSpinner size={24} text="Đang đồng bộ..." />
          <LoadingSpinner size={36} text="Đang tải dữ liệu lớn..." />
        </div>
      </Card>

      {/* Interactive Modal Instance */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thông báo xác nhận hệ thống"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Hủy bỏ
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(false);
                addNotification('Đã xác nhận thành công từ Modal!', 'success');
              }}
            >
              Xác nhận tiếp tục
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Đây là Modal component có sẵn trong thư mục <code>src/components/common/Modal.tsx</code>. 
            Bạn có thể dễ dàng nhúng bất kỳ biểu mẫu hay nội dung chi tiết nào vào đây.
          </p>
          <div
            style={{
              padding: '0.875rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
            }}
          >
            <CheckCircle size={20} color="var(--color-success)" />
            <span style={{ fontSize: '0.85rem' }}>Hỗ trợ phím tắt ESC và click ngoài để đóng.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
