import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './utilities/fonts.css';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import CurrentUserProfileScreen from './screens/CurrentUserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
        <Route path="Currentuserprofile/:username" element={<CurrentUserProfileScreen/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
