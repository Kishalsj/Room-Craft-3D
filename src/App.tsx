import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CustomizationHub from './pages/CustomizationHub';
import RoomCustomizer from './pages/RoomCustomizer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customize" element={<CustomizationHub />} />
        <Route path="/customize/:mode" element={<RoomCustomizer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;