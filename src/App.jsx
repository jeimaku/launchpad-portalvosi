import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PortalGateway from './components/PortalGateway';
import GroupLanding from './components/GroupLanding';
import { AuthProvider } from './context/AuthContext';
import { SystemDataProvider } from './context/SystemDataContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SystemDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PortalGateway />} />
              {/* each group landing page: http://localhost:5173/{group_url} */}
              <Route path=":groupUrl" element={<GroupLanding />} />
              {/* admin systems manager removed */}
            </Routes>
          </BrowserRouter>
        </SystemDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;