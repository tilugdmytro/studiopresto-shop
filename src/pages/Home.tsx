/* eslint-disable no-console */
import React, { useContext, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { GlobalContext } from '../utils/GlobalProvider';
import { getAllProducts } from '../api/getProducts';

export const Home: React.FC = () => {
  const { setProducts } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      <ProductList />
    </div>
  );
};
