import { createContext } from 'react';
import type { AppNotification, User } from '../types';

export interface AppContextType {
  user: User;
  updateUser: (fields: Partial<User>) => void;
  notifications: AppNotification[];
  addNotification: (message: string, type?: AppNotification['type']) => void;
  removeNotification: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
