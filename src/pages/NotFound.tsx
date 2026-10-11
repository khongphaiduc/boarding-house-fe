import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div
      className="container animate-fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-danger-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-danger)',
        }}
      >
        <AlertCircle size={44} />
      </div>

      <div>
        <h1 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Trang không tồn tại</h2>
        <p style={{ marginTop: '0.5rem', maxWidth: '400px' }}>
          Đường dẫn bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển sang một liên kết khác.
        </p>
      </div>

      <Link to="/">
        <Button variant="primary" leftIcon={<Home size={18} />}>
          Quay lại Trang chủ
        </Button>
      </Link>
    </div>
  );
};
