import { ProductList } from "types/product";
import { create } from "zustand";

export interface ProductState {
  quantity: number;
  products: ProductList[];
}

export interface ProductStoreAction {
  addProduct: (product: ProductList) => void;
  removeProduct: (id: number) => void;
  increaseProduct: (id: number) => void;
  decreaseProduct: (id: number) => void;
  clearCart: () => void;
}

export const useProductStore = create<ProductStoreAction & ProductState>(
  (set) => ({
    quantity: 0,
    products: [],
    addProduct: (product) => {
      set((state) => ({
        quantity: state.quantity + 1,
        products: [...state.products, product],
      }));
    },
    removeProduct: (id) =>
      set((state) => ({
        quantity: state.quantity - 1,
        products: state.products.filter((product) => product.id !== id),
      })),
    increaseProduct: (id) => {
      set((state) => {
        const product = state.products.find((product) => product.id === id);
        if (!product) return state;
        return {
          quantity: state.quantity + 1,
          products: [...state.products, product],
        };
      });
    },
    decreaseProduct: (id) => {
      set((state) => {
        const product = state.products.find((product) => product.id === id);
        if (!product) return state;
        return {
          quantity: state.quantity - 1,
          products: state.products.filter((product) => product.id !== id),
        };
      });
    },
    clearCart: () => set({ quantity: 0, products: [] }),
  })
);
