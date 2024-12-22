import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page from './Pages/MainPage';
import BuyFav from './Pages/buyfavs'
import Map from './Pages/Map/Maps';
import AgentProfile from './Pages/Profiles/agents';
import PropertyListing from './Pages/PropertyListing/propertylisting';
import SingleProperty from './Components/AgentPropertyListing/mapdisplay'
import ClientRegister from './Pages/Register/client'
import LoginPage  from './Pages/Login/loginpage'
import ClientEdit from './Pages/editDetails/client'
import BrowserProperty from './Pages/BroswerPropertiesByAgents/browserProperty'
import Openning from './Pages/Direction/openning'
import AgentLogin from './Pages/Login/agentlogin'
import PropertyAdd from './Pages/AgentCRUD/propertyadd'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path ='/buy-favorite' element={<BuyFav/>} />
          <Route path="/Website" element={<Page />} /> {/* MainPage Component */}
          <Route path="/map" element={<Map />} /> {/* Map Component */}
          <Route path ='/agentprofiles' element={<AgentProfile/>}/>
          <Route path='/property-listing' element={<PropertyListing/>}/>
          <Route path='/singleProperty/:ID' element={<SingleProperty/>} />
          <Route path='/register-client' element={<ClientRegister/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path = '/edit-client/:client_id' element={<ClientEdit/>}/>
          <Route path='/browser-property/:client_id' element={<BrowserProperty/>}/>
          <Route path='/' element={<Openning/>}/>
          <Route path='/agent-login' element={<AgentLogin/>}/>
          <Route path='/property-add/:id' element={<PropertyAdd/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;