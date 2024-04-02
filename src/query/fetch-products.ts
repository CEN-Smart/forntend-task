import axios from "axios";
import { ProductList } from "../types/product";

export const fetchProducts = async (): Promise<ProductList[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data as ProductList[];
};

export const fetchProduct = async (id: string): Promise<ProductList> => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data as ProductList;
};
