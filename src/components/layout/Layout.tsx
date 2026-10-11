import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { ToastContainer } from '../feedback/Toast';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            overflowX: 'hidden',
          }}
        >
          <div style={{ flex: 1, padding: '2rem 1.5rem' }}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
