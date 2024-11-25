import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Pages/MainPage';
import Map from './Pages/Map/Maps';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route path="/" element={<Page />} /> {/* MainPage Component */}
          <Route path="/map" element={<Map />} /> {/* Map Component */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;