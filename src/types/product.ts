export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface Product {
  products: Product;
}
