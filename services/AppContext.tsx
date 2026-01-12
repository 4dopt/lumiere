import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, Reservation, RestaurantSettings } from '../types';
import { MOCK_CUSTOMERS, MOCK_RESERVATIONS, MOCK_SETTINGS } from '../constants';

interface AppContextType {
  customers: Customer[];
  reservations: Reservation[];
  settings: RestaurantSettings;
  addReservation: (res: Reservation) => void;
  updateReservation: (res: Reservation) => void;
  updateSettings: (settings: RestaurantSettings) => void;
  getFormattedDate: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [settings, setSettings] = useState<RestaurantSettings>(MOCK_SETTINGS);

  const addReservation = (res: Reservation) => {
    setReservations(prev => [...prev, res]);
    
    // Check if customer exists, if not add (simplified logic)
    const existingCust = customers.find(c => c.name === res.customerName);
    if (!existingCust) {
      const newCustomer: Customer = {
        id: `c${Date.now()}`,
        name: res.customerName,
        email: '', // In a real app we'd capture this in booking
        phone: '',
        visits: 1,
        lastVisit: res.date,
        notes: '',
        avatarColor: 'bg-indigo-500'
      };
      setCustomers(prev => [...prev, newCustomer]);
    } else {
      // Update visit count
      setCustomers(prev => prev.map(c => 
        c.id === existingCust.id ? { ...c, visits: c.visits + 1, lastVisit: res.date } : c
      ));
    }
  };

  const updateReservation = (updatedRes: Reservation) => {
    setReservations(prev => prev.map(r => r.id === updatedRes.id ? updatedRes : r));
  };

  const updateSettings = (newSettings: RestaurantSettings) => {
    setSettings(newSettings);
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <AppContext.Provider value={{
      customers,
      reservations,
      settings,
      addReservation,
      updateReservation,
      updateSettings,
      getFormattedDate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};