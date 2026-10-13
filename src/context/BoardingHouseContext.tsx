import React, { createContext, useContext, useState, useMemo } from 'react';
import type {
  Room,
  RoomStatus,
  ExpiringContract,
  TodoTask,
  DashboardSummary,
  RevenueMonth,
  ServiceRevenue,
  ResidentBill,
  ResidentContract,
  MaintenanceTicket,
  Announcement,
  HouseRule,
} from '../types/boardingHouse';
import {
  initialRooms,
  initialExpiringContracts,
  initialTasks,
  initialSummary,
  revenueMonths,
  serviceRevenues,
  currentResident,
  initialResidentBills,
  residentContract,
  initialMaintenanceTickets,
  residentAnnouncements,
  houseRules,
} from '../services/boardingHouseData';

interface BoardingHouseContextType {
  // Landlord Side
  rooms: Room[];
  filteredRooms: Room[];
  filterTab: 'all' | RoomStatus;
  setFilterTab: (tab: 'all' | RoomStatus) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  summary: DashboardSummary;
  expiringContracts: ExpiringContract[];
  tasks: TodoTask[];
  revenueMonths: RevenueMonth[];
  serviceRevenues: ServiceRevenue[];
  addRoom: (room: Omit<Room, 'id'>) => void;
  deleteRoom: (id: string) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;

  // Resident Side
  resident: typeof currentResident;
  residentBills: ResidentBill[];
  contract: ResidentContract;
  maintenanceTickets: MaintenanceTicket[];
  announcements: Announcement[];
  rules: HouseRule[];
  payBill: (billId: string) => void;
  createMaintenanceTicket: (ticket: Omit<MaintenanceTicket, 'id' | 'createdAt' | 'status'>) => void;
}

const BoardingHouseContext = createContext<BoardingHouseContextType | undefined>(undefined);

export const BoardingHouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [filterTab, setFilterTab] = useState<'all' | RoomStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expiringContracts] = useState<ExpiringContract[]>(initialExpiringContracts);
  const [tasks] = useState<TodoTask[]>(initialTasks);

  // Resident State
  const [resident] = useState(currentResident);
  const [residentBills, setResidentBills] = useState<ResidentBill[]>(initialResidentBills);
  const [contract] = useState<ResidentContract>(residentContract);
  const [maintenanceTickets, setMaintenanceTickets] = useState<MaintenanceTicket[]>(initialMaintenanceTickets);
  const [announcements] = useState<Announcement[]>(residentAnnouncements);
  const [rules] = useState<HouseRule[]>(houseRules);

  // Dynamically calculate summary stats based on room data
  const summary = useMemo<DashboardSummary>(() => {
    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
    const vacantRooms = rooms.filter((r) => r.status === 'available').length;
    const maintenanceRooms = rooms.filter((r) => r.status === 'maintenance').length;
    const tenants = occupiedRooms;

    return {
      ...initialSummary,
      totalRooms,
      occupiedRooms,
      vacantRooms,
      maintenanceRooms,
      tenants,
    };
  }, [rooms]);

  // Filtered rooms based on active tab and search query
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // Status filter
      if (filterTab !== 'all' && room.status !== filterTab) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesNumber = room.roomNumber.toLowerCase().includes(query);
        const matchesType = room.type.toLowerCase().includes(query);
        const matchesTenant = room.tenantName?.toLowerCase().includes(query) ?? false;
        const matchesPhone = room.tenantPhone?.toLowerCase().includes(query) ?? false;
        return matchesNumber || matchesType || matchesTenant || matchesPhone;
      }
      return true;
    });
  }, [rooms, filterTab, searchQuery]);

  const addRoom = (newRoomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...newRoomData,
      id: `room-${Date.now()}`,
    };
    setRooms((prev) => [newRoom, ...prev]);
  };

  const deleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const payBill = (billId: string) => {
    setResidentBills((prev) =>
      prev.map((b) =>
        b.id === billId
          ? { ...b, status: 'paid', paidAt: 'Hôm nay' }
          : b
      )
    );
  };

  const createMaintenanceTicket = (
    ticket: Omit<MaintenanceTicket, 'id' | 'createdAt' | 'status'>
  ) => {
    const newTicket: MaintenanceTicket = {
      ...ticket,
      id: `maint-${Date.now()}`,
      createdAt: 'Vừa xong',
      status: 'pending',
    };
    setMaintenanceTickets((prev) => [newTicket, ...prev]);
  };

  return (
    <BoardingHouseContext.Provider
      value={{
        rooms,
        filteredRooms,
        filterTab,
        setFilterTab,
        searchQuery,
        setSearchQuery,
        summary,
        expiringContracts,
        tasks,
        revenueMonths,
        serviceRevenues,
        addRoom,
        deleteRoom,
        updateRoom,
        resident,
        residentBills,
        contract,
        maintenanceTickets,
        announcements,
        rules,
        payBill,
        createMaintenanceTicket,
      }}
    >
      {children}
    </BoardingHouseContext.Provider>
  );
};

export const useBoardingHouse = () => {
  const context = useContext(BoardingHouseContext);
  if (!context) {
    throw new Error('useBoardingHouse must be used within a BoardingHouseProvider');
  }
  return context;
};
