import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { BoardingHouseProvider } from './context/BoardingHouseContext';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppProvider>
        <BoardingHouseProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </BoardingHouseProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
