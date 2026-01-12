import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './services/AppContext';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Reservations } from './components/Reservations';
import { Customers } from './components/Customers';
import { Settings } from './components/Settings';
import { BookingPage } from './components/BookingPage';
import { PageEditor } from './components/PageEditor';
import { Orders } from './components/Orders';
import { Menu } from './components/Menu';
import { Reports } from './components/Reports';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public Booking Page Route (No Layout) */}
          <Route path="/book" element={<BookingPage />} />

          {/* Full Screen Editor Route */}
          <Route path="/editor" element={<PageEditor />} />

          {/* SaaS Dashboard Routes (With Layout) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
            <Route path="reports" element={<Reports />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;