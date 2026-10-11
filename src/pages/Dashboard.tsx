import React from 'react';
import {
  TrendingUp,
  Users,
  Target,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  PlusCircle,
  FileDown,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useApp } from '../hooks/useApp';
import { mockMetrics, mockActivities } from '../services/mockData';

const metricIconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={22} color="var(--color-primary)" />,
  Users: <Users size={22} color="var(--color-secondary)" />,
  Target: <Target size={22} color="var(--color-warning)" />,
  Zap: <Zap size={22} color="var(--color-success)" />,
};

export const Dashboard: React.FC = () => {
  const { addNotification } = useApp();

  const handleExport = () => {
    addNotification('Đang trích xuất báo cáo số liệu CSV...', 'info');
    setTimeout(() => {
      addNotification('Báo cáo đã xuất thành công!', 'success');
    }, 1500);
  };

  const handleRefresh = () => {
    addNotification('Đã cập nhật dữ liệu mới nhất!', 'success');
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header with Title and Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>Bảng điều khiển (Dashboard)</h1>
          <p>Tổng quan số liệu hiệu năng hệ thống và luồng hoạt động thời gian thực.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={15} />} onClick={handleRefresh}>
            Làm mới
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<FileDown size={15} />} onClick={handleExport}>
            Xuất dữ liệu
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle size={15} />}
            onClick={() => addNotification('Đã mở form tạo dự án mới', 'info')}
          >
            Tạo chiến dịch
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {mockMetrics.map((metric) => (
          <Card key={metric.id} interactive>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {metric.title}
                </span>
                <div
                  style={{
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                  }}
                >
                  {metricIconMap[metric.icon]}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '1.85rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                  {metric.value}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: metric.isPositive ? 'var(--color-success)' : 'var(--color-danger)',
                  }}
                >
                  {metric.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {metric.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Analytics & Activity Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Performance Visualization Card */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="var(--color-primary)" />
                <h3 style={{ fontSize: '1.1rem' }}>Hiệu năng truy cập tuần qua</h3>
              </div>
              <Badge variant="primary">Real-time metrics</Badge>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.9rem' }}>
              Biểu đồ phân phối lưu lượng yêu cầu (Request Throughput) được phân bổ qua CDN Edge nodes:
            </p>

            {/* Simulated Chart Bars */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: '180px',
                padding: '1rem 0',
                borderBottom: '1px solid var(--border-subtle)',
                gap: '0.75rem',
              }}
            >
              {[
                { day: 'T2', height: '45%' },
                { day: 'T3', height: '65%' },
                { day: 'T4', height: '55%' },
                { day: 'T5', height: '85%' },
                { day: 'T6', height: '95%' },
                { day: 'T7', height: '70%' },
                { day: 'CN', height: '60%' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '32px',
                      height: item.height,
                      background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      transition: 'height 0.4s ease',
                    }}
                    title={`${item.day}: ${item.height}`}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.day}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Mức tải trung bình: <strong>72.4%</strong></span>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Tối ưu 99.98% uptime</span>
            </div>
          </div>
        </Card>

        {/* Recent Activity Log */}
        <Card
          header={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Nhật ký hoạt động gần đây</h3>
              <Badge variant="info">Live Stream</Badge>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockActivities.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  paddingBottom: '0.875rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor:
                      act.type === 'success'
                        ? 'var(--color-success)'
                        : act.type === 'warning'
                        ? 'var(--color-warning)'
                        : act.type === 'purple'
                        ? 'var(--color-accent)'
                        : 'var(--color-info)',
                    marginTop: '0.5rem',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {act.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', marginTop: '0.2rem', color: 'var(--text-secondary)' }}>
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
