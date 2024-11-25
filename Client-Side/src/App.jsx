import React from 'react';
import './App.css'
import Page from './Pages/MainPage'
import Map from './Pages/Map/Maps'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Page />} />
          <Route exact path="/Map" element={<Map />} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
