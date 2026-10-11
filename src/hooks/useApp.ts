import { useContext } from 'react';
import { AppContext } from '../context/AppContextDefinition';
import type { AppContextType } from '../context/AppContextDefinition';

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
