import React, { useState, useCallback } from 'react';
import type { AppNotification, User } from '../types';
import { AppContext } from './AppContextDefinition';

const defaultUser: User = {
  id: 'usr_101',
  name: 'Alex Developer',
  email: 'alex.dev@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  role: 'Fullstack Architect',
};

let notificationCounter = 1;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'init-1',
      message: 'Chào mừng bạn đến với React Base Project!',
      type: 'success',
      timestamp: 'Vừa xong',
    },
  ]);

  const updateUser = useCallback((fields: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...fields }));
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((message: string, type: AppNotification['type'] = 'info') => {
    notificationCounter += 1;
    const id = `noti-${notificationCounter}`;
    const newNotification: AppNotification = {
      id,
      message,
      type,
      timestamp: 'Vừa xong',
    };
    setNotifications((prev) => [newNotification, ...prev]);

    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }, [removeNotification]);

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
