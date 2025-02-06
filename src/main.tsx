import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { SuttaCatalogue } from './pages/SuttaCatalogue.tsx';
import { AdminSync } from './pages/AdminSync.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/catalogue" element={<SuttaCatalogue />} />
        <Route path="/admin/sync" element={<AdminSync />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
