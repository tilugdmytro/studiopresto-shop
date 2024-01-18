import { Product } from './Product';
import { ProductWithQuantity } from './ProductWithQuantity';

export type Context = {
  cart: ProductWithQuantity[];
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>,
  addCartItem: (id: number) => void;
  deleteCartItem: (id: number) => void;
  clearCart: () => void;
  updateCartItemQuantity?: (id: number, newQuantity: number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
