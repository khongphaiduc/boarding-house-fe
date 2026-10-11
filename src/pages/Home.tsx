import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle,
  Copy,
  Layers,
  Code2,
  FolderTree,
  Compass,
  Moon,
  Component,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useApp } from '../hooks/useApp';
import { mockFeatures } from '../services/mockData';

const featureIconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={22} color="var(--color-primary)" />,
  FolderTree: <FolderTree size={22} color="var(--color-secondary)" />,
  Compass: <Compass size={22} color="var(--color-accent)" />,
  Moon: <Moon size={22} color="#fbbf24" />,
  Component: <Component size={22} color="var(--color-success)" />,
  Sparkles: <Sparkles size={22} color="#f43f5e" />,
};

export const Home: React.FC = () => {
  const { addNotification } = useApp();
  const [copied, setCopied] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const command = 'npm run dev';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    addNotification('Đã sao chép lệnh khởi chạy vào Clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '3rem 1rem 1.5rem',
          gap: '1.25rem',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Badge variant="primary" dot>
            Production-Ready Architecture
          </Badge>
          <Badge variant="success">React 19 + TypeScript</Badge>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', maxWidth: '850px', lineHeight: 1.15 }}>
          Khởi đầu dự án nhanh chóng cùng <br />
          <span className="gradient-text">React Base Architecture</span>
        </h1>

        <p style={{ fontSize: '1.15rem', maxWidth: '640px', color: 'var(--text-secondary)' }}>
          Mẫu dự án chuẩn chỉnh với đầy đủ <strong>React Router</strong>, kiến trúc phân tầng 
          thư mục rõ ràng, hệ thống Design Tokens Dark/Light và các Reusable Components hiện đại.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/dashboard">
            <Button size="lg" rightIcon={<ArrowRight size={18} />}>
              Khám phá Dashboard
            </Button>
          </Link>
          <Link to="/components">
            <Button variant="secondary" size="lg" leftIcon={<Layers size={18} />}>
              Xem Bộ Components
            </Button>
          </Link>
        </div>

        {/* Command bar */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-full)',
            padding: '0.5rem 1.25rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code2 size={16} color="var(--color-primary)" />
            <code style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{command}</code>
          </div>
          <button
            onClick={handleCopy}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
            }}
            title="Sao chép lệnh"
            aria-label="Sao chép lệnh"
          >
            {copied ? <CheckCircle size={16} color="var(--color-success)" /> : <Copy size={16} />}
          </button>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section>
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.15rem' }}>Test Tương Tác Nhanh (State & Feedback)</h3>
              </div>
              <Badge variant="info">Live React Hook</Badge>
            </div>
          }
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <p style={{ marginBottom: '0.5rem' }}>
                Kiểm tra phản hồi tức thì với hook <code>useState</code> & hệ thống Toast Notification toàn cục:
              </p>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                Số lần bấm: {clickCount}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Button
                variant="primary"
                onClick={() => {
                  setClickCount((c) => c + 1);
                  addNotification(`Đã tăng lượt click lên: ${clickCount + 1}`, 'success');
                }}
              >
                Tăng Counter + Bắn Toast
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setClickCount(0);
                  addNotification('Đã đặt lại counter về 0', 'info');
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Feature Grid */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.85rem', marginBottom: '0.5rem' }}>
            Kiến trúc hoàn thiện dành cho Developers
          </h2>
          <p>Mọi thành phần được cấu hình tối ưu để mở rộng dự án từ nhỏ đến lớn</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {mockFeatures.map((feat, index) => (
            <Card key={index} interactive>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  {featureIconMap[feat.icon] || <Sparkles size={22} />}
                </div>
                <h4 style={{ fontSize: '1.1rem' }}>{feat.title}</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{feat.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
