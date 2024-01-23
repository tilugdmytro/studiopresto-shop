import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import './App.scss';
import Container from '@mui/material/Container';
import { Home } from './pages/Home';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import PrimarySearchAppBar from './molecules/AppBar';

export const App: React.FC = () => {
  return (
    <>
      <PrimarySearchAppBar />
      <Container sx={{ paddingX: 3, paddingY: 8 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};
