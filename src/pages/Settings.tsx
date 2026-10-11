import React, { useState } from 'react';
import { Sun, Moon, Save, User as UserIcon, Shield, Sliders, Server } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { useTheme } from '../hooks/useTheme';
import { useApp } from '../hooks/useApp';
import { config } from '../config';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, updateUser, addNotification } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    addNotification('Thông tin hồ sơ đã được lưu thành công!', 'success');
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Cài đặt hệ thống (Settings)</h1>
        <p>Quản lý cấu hình giao diện, thông tin người dùng và các tùy chọn ứng dụng.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Appearance Settings */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sliders size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Giao diện & Theme</h3>
              </div>
              <Badge variant="primary">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</Badge>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.9rem' }}>
              Chọn tông màu hiển thị phù hợp. Cấu hình sẽ tự động được lưu vào <code>localStorage</code>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* Dark Option */}
              <div
                onClick={() => setTheme('dark')}
                style={{
                  cursor: 'pointer',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${theme === 'dark' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: '#090d16',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: theme === 'dark' ? 'var(--shadow-glow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Moon size={24} color="#818cf8" />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Dark Theme</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Hiện đại, êm dịu cho mắt</span>
              </div>

              {/* Light Option */}
              <div
                onClick={() => setTheme('light')}
                style={{
                  cursor: 'pointer',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${theme === 'light' ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  alignItems: 'center',
                  textAlign: 'center',
                  boxShadow: theme === 'light' ? 'var(--shadow-glow)' : 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Sun size={24} color="#f59e0b" />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Light Theme</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sáng rõ, độ tương phản cao</span>
              </div>
            </div>
          </div>
        </Card>

        {/* User Profile Form */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserIcon size={18} color="var(--color-secondary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Hồ sơ tài khoản</h3>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          }
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Họ và tên"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Vai trò (Role)"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />

            <Input
              label="Đường dẫn Avatar URL"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />

            <div style={{ marginTop: '0.5rem' }}>
              <Button type="submit" variant="primary" leftIcon={<Save size={16} />}>
                Lưu thay đổi
              </Button>
            </div>
          </form>
        </Card>

        {/* Preferences Toggle */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={18} color="var(--color-accent)" />
              <h3 style={{ fontSize: '1.1rem' }}>Tùy chọn ứng dụng</h3>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <span style={{ fontWeight: 600, display: 'block', fontSize: '0.92rem' }}>
                  Bật thông báo Toast trong app
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Hiển thị phản hồi tự động góc dưới màn hình
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
              />
            </label>

            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '0.5rem 0',
              }}
            >
              <div>
                <span style={{ fontWeight: 600, display: 'block', fontSize: '0.92rem' }}>
                  Hiệu ứng âm thanh Audio Feedback
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Phát âm thanh nhẹ khi hoàn thành tương tác
                </span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-primary)' }}
              />
            </label>
          </div>
        </Card>

        {/* Environment & Configuration Card */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Server size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Môi trường & Cấu hình (Environment)</h3>
              </div>
              <Badge variant={config.env === 'production' ? 'warning' : 'primary'}>
                {config.env.toUpperCase()}
              </Badge>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tệp cấu hình đang nạp:</span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                  src/config/{config.env}.json
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Backend API URL:</span>
                <code style={{ fontSize: '0.82rem', backgroundColor: 'transparent', color: 'var(--text-main)' }}>
                  {config.api.baseUrl}
                </code>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tên ứng dụng:</span>
                <span style={{ fontSize: '0.85rem' }}>{config.appName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phiên bản (Version):</span>
                <span style={{ fontSize: '0.85rem' }}>v{config.version}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant={config.features.enableMockData ? 'info' : 'warning'}>
                Mock Data: {config.features.enableMockData ? 'ON' : 'OFF'}
              </Badge>
              <Badge variant={config.features.enableDebugLogs ? 'info' : 'warning'}>
                Debug Logs: {config.features.enableDebugLogs ? 'ON' : 'OFF'}
              </Badge>
              <Badge variant="success">
                Auto Refresh: {config.features.autoRefreshInterval / 1000}s
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
