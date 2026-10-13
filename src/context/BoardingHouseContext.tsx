import React, { createContext, useContext, useState, useMemo } from 'react';
import type {
  Room,
  RoomStatus,
  ExpiringContract,
  TodoTask,
  DashboardSummary,
  RevenueMonth,
  ServiceRevenue,
} from '../types/boardingHouse';
import {
  initialRooms,
  initialExpiringContracts,
  initialTasks,
  initialSummary,
  revenueMonths,
  serviceRevenues,
} from '../services/boardingHouseData';

interface BoardingHouseContextType {
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
}

const BoardingHouseContext = createContext<BoardingHouseContextType | undefined>(undefined);

export const BoardingHouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [filterTab, setFilterTab] = useState<'all' | RoomStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expiringContracts] = useState<ExpiringContract[]>(initialExpiringContracts);
  const [tasks] = useState<TodoTask[]>(initialTasks);

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
