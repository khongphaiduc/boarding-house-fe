import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard';
import { RoomsPage } from '../pages/RoomsPage';
import { ContractsPage } from '../pages/ContractsPage';
import { TenantsPage } from '../pages/TenantsPage';
import { FinancesPage } from '../pages/FinancesPage';
import { ServicesPage } from '../pages/ServicesPage';
import { MaintenancePage } from '../pages/MaintenancePage';
import { NotificationsPage } from '../pages/NotificationsPage';
import { ReportsPage } from '../pages/ReportsPage';
import { Settings } from '../pages/Settings';
import { NotFound } from '../pages/NotFound';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Navigate to="/" replace />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="contracts" element={<ContractsPage />} />
        <Route path="tenants" element={<TenantsPage />} />
        <Route path="finances" element={<FinancesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
