import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BoardingSidebar } from './BoardingSidebar';
import { BoardingHeader } from './BoardingHeader';
import { ToastContainer } from '../feedback/Toast';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar on Left (100vh, Sticky) */}
      <BoardingSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area on Right */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowX: 'hidden',
        }}
      >
        <BoardingHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main style={{ flex: 1, padding: '1.5rem 1.75rem' }}>
          <Outlet />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
export default Layout;
