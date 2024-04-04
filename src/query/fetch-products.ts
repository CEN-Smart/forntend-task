import axios from "axios";
import { Product } from "./../types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data as Product[];
};

interface QueryKey {
  queryKey: [{ queryIdentifier: string; productId: string }];
}

export const fetchProduct = async ({
  queryKey,
}: QueryKey): Promise<Product> => {
  const { productId } = queryKey[0];
  const { data } = await axios.get(
    `https://fakestoreapi.com/products/${productId}`
  );
  return data as Product;
};
