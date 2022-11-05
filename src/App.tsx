import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Discovery from './pages/Discovery/Discovery';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import TvDetail from './pages/TvDetail/TvDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="discovery" element={<Discovery />} />
        <Route path="search" element={<Search />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="tv/:id" element={<TvDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
