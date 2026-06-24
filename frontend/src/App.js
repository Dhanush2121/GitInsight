import React from 'react';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import ProfileDetail from './pages/ProfileDetail';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/profile/:username" element={<ProfileDetail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
