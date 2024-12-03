import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Pages/MainPage';
import Map from './Pages/Map/Maps';
import AgentProfile from './Pages/Profiles/agents';
import PropertyListing from './Pages/PropertyListing/propertylisting';
import SingleProperty from './Components/AgentPropertyListing/mapdisplay'
import ClientRegister from './Pages/Register/client'
import LoginPage  from './Pages/Login/loginpage'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page />} /> {/* MainPage Component */}
          <Route path="/map" element={<Map />} /> {/* Map Component */}
          <Route path ='/agentprofiles' element={<AgentProfile/>}/>
          <Route path='/property-listing' element={<PropertyListing/>}/>
          <Route path='/singleProperty/:ID' element={<SingleProperty/>} />
          <Route path='/register-client' element={<ClientRegister/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;