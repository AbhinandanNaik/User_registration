import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
};

export default App;