import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Discovery from './pages/Discovery/Discovery';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import Search from './pages/Search/Search';
import TvDetail from './pages/TvDetail/TvDetail';

import 'react-lazy-load-image-component/src/effects/blur.css';
import MovieWatch from './pages/MovieWatch/MovieWatch';
import TvWatch from './pages/TvWatch/TvWatch';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout isOnlyIcon={false} />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
      </Route>
      <Route path="/" element={<MainLayout isOnlyIcon />}>
        <Route path="discovery" element={<Discovery />} />
        <Route path="search" element={<Search />} />
        <Route path="movie/:id" element={<MovieDetail />} />
        <Route path="movie/:id/watch" element={<MovieWatch />} />
        <Route path="tv/:id" element={<TvDetail />} />
        <Route path="tv/:id/watch" element={<TvWatch />} />
      </Route>
    </Routes>
  );
}

export default App;
