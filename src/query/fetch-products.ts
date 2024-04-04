import axios from "axios";
import { Product } from "./../types/product";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get("/products");
  return data as Product[];
};

interface QueryKey {
  queryKey: [{ queryIdentifier: string; productId: string }];
}

export const fetchProduct = async ({
  queryKey,
}: QueryKey): Promise<Product> => {
  const { productId } = queryKey[0];
  const { data } = await axiosInstance.get(`/products/${productId}`);
  return data as Product;
};
