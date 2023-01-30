import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Dashboard/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
