# 🚀 React Base Application (TypeScript + Vite)

Dự án mẫu **React 19 + TypeScript** chuẩn kiến trúc Clean & Modular Architecture, được cấu hình sẵn với bộ định tuyến **React Router**, hệ thống **Design Tokens & Dark/Light Mode**, bộ **Reusable UI Components**, và tích hợp **Linter & Type Checker**.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- |
| **React** | `^19.2.x` | Thư viện UI cốt lõi |
| **TypeScript** | `~6.0.x` | Kiểm soát kiểu dữ liệu an toàn & chặt chẽ |
| **Vite** | `^8.3.x` | Build tool và Hot Module Replacement (HMR < 50ms) |
| **React Router** | `^7.x` | Định tuyến client-side đa trang |
| **Lucide React** | `^1.x` | Hệ thống vector icon hiện đại, tối ưu bundle |
| **Oxlint** | `^1.8x` | Linter thế hệ mới siêu nhanh (Rust-based) |
| **Vanilla CSS Tokens**| Standard | Design System linh hoạt với biến CSS, không phụ thuộc thư viện cồng kềnh |

---

## 📁 Cấu trúc thư mục (Folder Hierarchy)

```text
react-base-app/
├── public/                  # Tài nguyên tĩnh công khai (favicon, svg, images)
├── src/
│   ├── assets/              # Icons, logo và ảnh nội bộ
│   ├── components/          # Reusable UI Components
│   │   ├── common/          # Button, Card, Badge, Input, Modal
│   │   ├── layout/          # Layout chính, Navbar, Sidebar, Footer
│   │   └── feedback/        # Toast Notifications, LoadingSpinner
│   ├── context/             # Global Context Providers & State
│   │   ├── ThemeContext.tsx # Quản lý Dark/Light Theme & đồng bộ localStorage
│   │   └── AppContext.tsx   # Quản lý User Profile & hệ thống Toast
│   ├── hooks/               # Custom React Hooks
│   │   ├── useTheme.ts      # Hook truy xuất/đổi theme
│   │   ├── useApp.ts        # Hook truy xuất thông tin & trigger thông báo
│   │   ├── useLocalStorage.ts # Hook lưu trữ dữ liệu bền vững
│   │   └── useDebounce.ts   # Hook debounce tối ưu ô tìm kiếm
│   ├── pages/               # Các trang ứng dụng (Routing Pages)
│   │   ├── Home.tsx         # Trang chủ giới thiệu tính năng & test tương tác
│   │   ├── Dashboard.tsx    # Bảng điều khiển số liệu KPI & nhật ký hoạt động
│   │   ├── ComponentsPage.tsx # Thư viện trình diễn toàn bộ UI Components
│   │   ├── Settings.tsx     # Cài đặt Theme & chỉnh sửa thông tin người dùng
│   │   └── NotFound.tsx     # Trang lỗi 404
│   ├── routes/              # Cấu hình Router (index.tsx)
│   ├── services/            # Tầng gọi API & Mock Data
│   │   ├── api.ts           # Standard fetch client wrapper
│   │   └── mockData.ts      # Dữ liệu giả lập cho dashboard
│   ├── styles/              # Hệ thống CSS Design System
│   │   ├── variables.css    # Biến màu sắc HSL, radii, shadows, spacing
│   │   └── global.css       # Reset CSS, typography, animation & utilities
│   ├── types/               # TypeScript interfaces & types định nghĩa
│   ├── App.tsx              # Component gốc bọc Providers & Router
│   └── main.tsx             # Điểm khởi chạy React DOM
├── index.html               # File HTML chính tích hợp Google Fonts (Inter, Outfit)
├── tsconfig.json            # Cấu hình TypeScript
├── vite.config.ts           # Cấu hình Vite với alias '@/' trỏ vào 'src/'
└── package.json             # Danh sách dependencies và npm scripts
```

---

## ⚡ Bắt đầu nhanh (Getting Started)

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Khởi chạy Development Server
```bash
npm run dev
```
Truy cập trình duyệt tại: `http://localhost:5173/`

### 3. Kiểm tra Linter (Oxlint)
```bash
npm run lint
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## 🧭 Hướng dẫn mở rộng & Thêm tính năng

### Thêm một trang mới (New Page)
1. Tạo file mới trong `src/pages/` (ví dụ: `src/pages/Analytics.tsx`).
2. Khai báo component và xuất `export const Analytics: React.FC = () => { ... }`.
3. Mở [src/routes/index.tsx](file:///C:/Users/Admin/.gemini/antigravity-ide/scratch/react-base-app/src/routes/index.tsx) và thêm Route:
   ```tsx
   <Route path="analytics" element={<Analytics />} />
   ```
4. Thêm mục vào Sidebar trong [src/components/layout/Sidebar.tsx](file:///C:/Users/Admin/.gemini/antigravity-ide/scratch/react-base-app/src/components/layout/Sidebar.tsx).

### Bắn thông báo Toast từ bất kỳ Component nào
```tsx
import { useApp } from '@/hooks/useApp';

const MyComponent = () => {
  const { addNotification } = useApp();

  const handleAction = () => {
    addNotification('Thao tác đã được lưu thành công!', 'success'); // 'info' | 'success' | 'warning' | 'error'
  };

  return <button onClick={handleAction}>Click me</button>;
};
```

### Đổi chủ đề màu sắc (Theme)
Chỉnh sửa biến màu sắc trong [src/styles/variables.css](file:///C:/Users/Admin/.gemini/antigravity-ide/scratch/react-base-app/src/styles/variables.css) cho cả 2 mode `:root` (Light) và `[data-theme='dark']` (Dark).

---

## 🌟 Tính năng nổi bật đã tích hợp sẵn
- ✅ **Dark & Light Mode**: Chuyển đổi mượt mà, lưu vào LocalStorage, tự động đồng bộ theo hệ điều hành.
- ✅ **Path Alias `@/`**: Import gọn gàng từ thư mục `src/` thay vì đường dẫn tương đối dài.
- ✅ **Phản hồi tức thì**: Hệ thống Toast tự động biến mất sau 4 giây, hỗ trợ các mức độ trạng thái.
- ✅ **Form & Validation Preview**: Input có icon, label, text hướng dẫn và trạng thái báo lỗi.
- ✅ **Accessible Modal Dialog**: Tự động hỗ trợ phím `ESC` và click ra ngoài backdrop blur để đóng.
