import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { UserProvider } from './contexts/UserContext.jsx';
import { BioProvider } from './contexts/BioContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import FilterProvider from './contexts/FilterContext.jsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <UserProvider>
            <BioProvider>
              <App />
            </BioProvider>
          </UserProvider>
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
