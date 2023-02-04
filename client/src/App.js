import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './utilities/fonts.css'

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
