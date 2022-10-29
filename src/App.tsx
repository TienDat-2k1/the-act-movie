import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Discovery from './pages/Discovery/Discovery';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="discovery" element={<Discovery />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
