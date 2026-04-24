import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicSite from './PublicSite';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicSite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
