import { Product } from '../types/Product';
import { getData } from './fetchClient';

export const getAllProducts = () => getData<Product[]>('/products');
export const getProductById = (id: number) => getData<Product>(`/products/${id}`);
