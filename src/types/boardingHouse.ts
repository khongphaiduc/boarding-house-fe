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

/* ================= Resident Side Types ================= */

export interface ResidentBill {
  id: string;
  month: string;
  roomPrice: number;
  electricity: {
    prev: number;
    current: number;
    used: number;
    rate: number;
    total: number;
  };
  water: {
    prev: number;
    current: number;
    used: number;
    rate: number;
    total: number;
  };
  internet: number;
  cleaning: number;
  totalAmount: number;
  status: 'paid' | 'unpaid';
  dueDate: string;
  paidAt?: string;
}

export interface ResidentContract {
  contractCode: string;
  roomNumber: string;
  roomType: string;
  startDate: string;
  endDate: string;
  monthlyRent: number;
  deposit: number;
  status: 'active' | 'expiring' | 'ended';
  landlordName: string;
  landlordPhone: string;
  landlordZalo: string;
}

export interface MaintenanceTicket {
  id: string;
  roomNumber: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'notice' | 'urgent' | 'reminder';
  author: string;
}

export interface HouseRule {
  id: string;
  title: string;
  description: string;
  category: 'security' | 'cleanliness' | 'noise' | 'general';
}
