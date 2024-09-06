import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { UserProvider } from './contexts/UserContext.jsx';
import { BioProvider } from './contexts/BioContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import './index.css';
import FilterProvider from './contexts/FilterContext.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import PrimaryFilterProvider from './contexts/PrimaryFilterContext.jsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UserProvider>
            <BioProvider>
              <FilterProvider>
                <PrimaryFilterProvider>
                  <App />
                </PrimaryFilterProvider>
              </FilterProvider>
            </BioProvider>
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
