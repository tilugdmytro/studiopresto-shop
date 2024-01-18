/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../types/Context';
import { ProviderProps } from '../types/ProviderProps';
import { useLocalStorage } from './useLocalStorage';
import { ProductWithQuantity } from '../types/ProductWithQuantity';
import { Product } from '../types/Product';

export const GlobalContext = React.createContext<Context>({
  cart: [],
  products: [],
  setProducts: () => {},
  addCartItem: () => {},
  deleteCartItem: () => {},
  clearCart: () => {},
  updateCartItemQuantity: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

export const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<ProductWithQuantity[]>('cart', []);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const query = searchParams.get('query') || '';
  // const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setCurrentPage(1);
  }, [category, query]);

  const addCartItem = (id: number) => {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      const updatedCart = cart
        .map(item => (item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item));

      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { id, quantity: 1 }];

      setCart(updatedCart);
    }
  };

  const deleteCartItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);

    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }

      return item;
    });

    setCart(updatedCart);
  };

  const value = {
    cart,
    products,
    setProducts,
    addCartItem,
    deleteCartItem,
    clearCart,
    updateCartItemQuantity,
    currentPage,
    setCurrentPage,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
