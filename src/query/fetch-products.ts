import axios from "axios";
import { Product } from "./../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data as Product[];
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data as Product;
};
