import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, User as UserIcon, Trash2, Edit3, Eye } from 'lucide-react';
import { useBoardingHouse } from '../../context/BoardingHouseContext';
import type { Room, RoomStatus } from '../../types/boardingHouse';
import { AddRoomModal } from '../modals/AddRoomModal';
import { RoomDetailModal } from '../modals/RoomDetailModal';

export const RoomListTable: React.FC = () => {
  const {
    filteredRooms,
    filterTab,
    setFilterTab,
    summary,
    deleteRoom,
  } = useBoardingHouse();

  const [tableSearch, setTableSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Additional local table search filter if typed in the table search box
  const displayRooms = filteredRooms.filter((room) => {
    if (!tableSearch.trim()) return true;
    const query = tableSearch.toLowerCase();
    return (
      room.roomNumber.toLowerCase().includes(query) ||
      room.type.toLowerCase().includes(query) ||
      (room.tenantName && room.tenantName.toLowerCase().includes(query)) ||
      (room.tenantPhone && room.tenantPhone.toLowerCase().includes(query))
    );
  });

  const getStatusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'occupied':
        return (
          <span className="status-pill occupied">
            <span className="status-dot" />
            Đang thuê
          </span>
        );
      case 'available':
        return (
          <span className="status-pill available">
            <span className="status-dot" />
            Phòng trống
          </span>
        );
      case 'maintenance':
        return (
          <span className="status-pill maintenance">
            <span className="status-dot" />
            Bảo trì
          </span>
        );
    }
  };

  return (
    <>
      <div className="dashboard-card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Card Header & Controls */}
        <div style={{ padding: '1.25rem 1.25rem 0.75rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
              Danh sách phòng
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Search room */}
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                  }}
                />
                <input
                  type="text"
                  placeholder="Tìm kiếm phòng..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  style={{
                    padding: '0.45rem 0.75rem 0.45rem 2.1rem',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.82rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    width: '100%',
                  }}
                />
              </div>

              {/* Add Room Button */}
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.48rem 0.95rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              >
                <Plus size={16} />
                <span>Thêm phòng</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.1rem',
            }}
          >
            {[
              { id: 'all', label: `Tất cả (${summary.totalRooms})` },
              { id: 'occupied', label: `Đang thuê (${summary.occupiedRooms})` },
              { id: 'available', label: `Phòng trống (${summary.vacantRooms})` },
              { id: 'maintenance', label: `Bảo trì (${summary.maintenanceRooms})` },
            ].map((tab) => {
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as 'all' | RoomStatus)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem 0.2rem',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#2563eb' : '#64748b',
                    cursor: 'pointer',
                    position: 'relative',
                    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                    marginBottom: '-1px',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table Content */}
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Phòng</th>
                <th>Loại phòng</th>
                <th>Giá thuê</th>
                <th>Trạng thái</th>
                <th>Người thuê</th>
                <th>Hợp đồng</th>
                <th style={{ width: '60px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {displayRooms.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                    Không tìm thấy phòng nào phù hợp với bộ lọc.
                  </td>
                </tr>
              ) : (
                displayRooms.slice(0, 10).map((room) => (
                  <tr key={room.id}>
                    {/* Phòng (Thumbnail + Số phòng) */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <img
                          src={room.image}
                          alt={`Phòng ${room.roomNumber}`}
                          style={{
                            width: '42px',
                            height: '32px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            border: '1px solid #e2e8f0',
                            backgroundColor: '#f1f5f9',
                          }}
                        />
                        <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                          {room.roomNumber}
                        </span>
                      </div>
                    </td>

                    {/* Loại phòng */}
                    <td style={{ color: '#475569' }}>{room.type}</td>

                    {/* Giá thuê */}
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>
                      {room.price.toLocaleString('vi-VN')}đ
                    </td>

                    {/* Trạng thái */}
                    <td>{getStatusBadge(room.status)}</td>

                    {/* Người thuê */}
                    <td>
                      {room.tenantName ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              backgroundColor: '#f1f5f9',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#64748b',
                            }}
                          >
                            <UserIcon size={13} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0f172a' }}>
                              {room.tenantName}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                              {room.tenantPhone}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>---</span>
                      )}
                    </td>

                    {/* Hợp đồng */}
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      {room.contractStart && room.contractEnd ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{room.contractStart}</span>
                          <span style={{ color: '#94a3b8' }}>- {room.contractEnd}</span>
                        </div>
                      ) : (
                        <span style={{ color: '#94a3b8' }}>-</span>
                      )}
                    </td>

                    {/* Thao tác */}
                    <td style={{ textAlign: 'center', position: 'relative' }}>
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === room.id ? null : room.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '0.35rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title="Thao tác"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === room.id && (
                        <div
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '35px',
                            backgroundColor: '#ffffff',
                            borderRadius: '8px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                            border: '1px solid #e2e8f0',
                            zIndex: 30,
                            width: '140px',
                            textAlign: 'left',
                            padding: '0.35rem 0',
                          }}
                        >
                          <div
                            onClick={() => {
                              setSelectedRoom(room);
                              setActiveMenuId(null);
                            }}
                            style={{
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              color: '#334155',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Eye size={14} />
                            <span>Chi tiết</span>
                          </div>
                          <div
                            onClick={() => {
                              setSelectedRoom(room);
                              setActiveMenuId(null);
                            }}
                            style={{
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              color: '#334155',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Edit3 size={14} />
                            <span>Chỉnh sửa</span>
                          </div>
                          <div
                            onClick={() => {
                              deleteRoom(room.id);
                              setActiveMenuId(null);
                            }}
                            style={{
                              padding: '0.45rem 0.75rem',
                              fontSize: '0.8rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              color: '#dc2626',
                              borderTop: '1px solid #f1f5f9',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Trash2 size={14} />
                            <span>Xóa phòng</span>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddRoomModal onClose={() => setShowAddModal(false)} />}
      {selectedRoom && <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
    </>
  );
};
