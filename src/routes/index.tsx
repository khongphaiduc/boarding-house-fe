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

// Resident Portal Components
import { ResidentLayout } from '../components/resident/ResidentLayout';
import { ResidentDashboard } from '../pages/resident/ResidentDashboard';
import { ResidentBillsPage } from '../pages/resident/ResidentBillsPage';
import { ResidentUtilitiesPage } from '../pages/resident/ResidentUtilitiesPage';
import { ResidentContractPage } from '../pages/resident/ResidentContractPage';
import { ResidentMaintenancePage } from '../pages/resident/ResidentMaintenancePage';
import { ResidentAnnouncementsPage } from '../pages/resident/ResidentAnnouncementsPage';
import { ResidentRulesPage } from '../pages/resident/ResidentRulesPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 1. Landlord / Admin Side */}
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
      </Route>

      {/* 2. Resident Portal Side */}
      <Route path="/resident" element={<ResidentLayout />}>
        <Route index element={<ResidentDashboard />} />
        <Route path="bills" element={<ResidentBillsPage />} />
        <Route path="utilities" element={<ResidentUtilitiesPage />} />
        <Route path="contract" element={<ResidentContractPage />} />
        <Route path="maintenance" element={<ResidentMaintenancePage />} />
        <Route path="announcements" element={<ResidentAnnouncementsPage />} />
        <Route path="rules" element={<ResidentRulesPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
