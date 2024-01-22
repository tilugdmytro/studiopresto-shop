export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
  };
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}
