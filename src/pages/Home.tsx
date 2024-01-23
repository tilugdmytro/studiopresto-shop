import React, { useEffect } from 'react';
import { ProductList } from '../organisms/Product/ProductList';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../redux/productsSlice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (products.length > 0) {
      return;
    }

    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div>
      <ProductList />
    </div>
  );
};
