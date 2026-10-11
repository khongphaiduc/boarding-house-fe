import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContextDefinition';
import type { ThemeContextType } from '../context/ThemeContextDefinition';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
