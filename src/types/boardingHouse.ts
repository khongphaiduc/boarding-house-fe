export type RoomStatus = 'occupied' | 'available' | 'maintenance';

export interface Room {
  id: string;
  roomNumber: string;
  type: string;
  price: number;
  status: RoomStatus;
  tenantName?: string;
  tenantPhone?: string;
  tenantAvatar?: string;
  contractStart?: string;
  contractEnd?: string;
  image: string;
  floor: number;
  deposit?: number;
  electricNumber?: number;
  waterNumber?: number;
}

export interface ExpiringContract {
  id: string;
  roomNumber: string;
  tenantName: string;
  tenantAvatar: string;
  expiryDate: string;
  daysLeft: number;
  phone?: string;
}

export interface TodoTask {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'contract' | 'invoice' | 'repair' | 'moveout';
  color: 'warning' | 'danger' | 'info' | 'purple';
  count?: number;
}

export interface RevenueMonth {
  month: string;
  label: string;
  revenue: number;
  expense: number;
}

export interface ServiceRevenue {
  service: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardSummary {
  totalRooms: number;
  occupiedRooms: number;
  vacantRooms: number;
  maintenanceRooms: number;
  tenants: number;
  currentMonthRevenue: number;
  growthPercent: number;
  maintenanceRequests: number;
  processingRequests: number;
}
