import type { MetricCard, ActivityItem } from '../types';

export const mockMetrics: MetricCard[] = [
  {
    id: 'm1',
    title: 'Tổng doanh thu',
    value: '$128,450',
    change: '+14.2%',
    isPositive: true,
    icon: 'TrendingUp',
  },
  {
    id: 'm2',
    title: 'Người dùng kích hoạt',
    value: '42,890',
    change: '+8.4%',
    isPositive: true,
    icon: 'Users',
  },
  {
    id: 'm3',
    title: 'Tỉ lệ chuyển đổi',
    value: '3.85%',
    change: '-0.4%',
    isPositive: false,
    icon: 'Target',
  },
  {
    id: 'm4',
    title: 'Thời gian phản hồi',
    value: '18ms',
    change: '-25%',
    isPositive: true,
    icon: 'Zap',
  },
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Triển khai bản phát hành v2.4.0',
    description: 'Hệ thống đã tự động build và deploy lên cụm production an toàn.',
    timestamp: '5 phút trước',
    type: 'success',
  },
  {
    id: 'a2',
    title: 'Đăng ký tổ chức Enterprise mới',
    description: 'TechCorp Vietnam vừa hoàn tất gói Pro Yearly Subscription.',
    timestamp: '42 phút trước',
    type: 'purple',
  },
  {
    id: 'a3',
    title: 'Cảnh báo hạn mức lưu trữ',
    description: 'Cụm Database Storage đạt ngưỡng 78% dung lượng.',
    timestamp: '2 giờ trước',
    type: 'warning',
  },
  {
    id: 'a4',
    title: 'Cập nhật chính sách bảo mật API',
    description: 'Đã kích hoạt xác thực hai yếu tố bắt buộc cho Admin.',
    timestamp: '5 giờ trước',
    type: 'info',
  },
];

export const mockFeatures = [
  {
    title: 'Vite & React 19 + TypeScript',
    description: 'Tốc độ khởi động siêu tốc (HMR < 50ms), cấu hình tối ưu và bảo vệ kiểu dữ liệu chặt chẽ.',
    icon: 'Zap',
  },
  {
    title: 'Cấu trúc thư mục Modular chuẩn',
    description: 'Tổ chức rõ ràng theo Domain-Driven Design: components, pages, hooks, services, context.',
    icon: 'FolderTree',
  },
  {
    title: 'React Router v7 / v6',
    description: 'Hệ thống định tuyến mạnh mẽ, hỗ trợ nested routes, dynamic parameters và 404 handler.',
    icon: 'Compass',
  },
  {
    title: 'Hệ thống Dark / Light Theme',
    description: 'CSS variables cao cấp, tự động đồng bộ system preference và lưu trữ localStorage mượt mà.',
    icon: 'Moon',
  },
  {
    title: 'Bộ Reusable UI Components',
    description: 'Button đa biến thể, Card Glassmorphism, Badge trạng thái, Modal Popup, Toast Notification.',
    icon: 'Component',
  },
  {
    title: 'Lucide Icons & Đồ họa Vector',
    description: 'Hơn 1000+ biểu tượng vector hiện đại, sắc nét và nhẹ nhàng.',
    icon: 'Sparkles',
  },
];
