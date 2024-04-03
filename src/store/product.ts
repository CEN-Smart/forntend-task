import { CartProduct, Product } from "./../types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cartItems: CartProduct[];
  addItemToCart: (item: Product) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      addItemToCart: (item) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          set({ cartItems: [...get().cartItems] });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
        }
      },
      increaseItemQuantity: (id) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === id
        );
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          set({ cartItems: [...get().cartItems] });
        }
      },
      decreaseItemQuantity: (id) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === id
        );
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity <= 1) return;
            itemExists.quantity--;
          }
          set({ cartItems: [...get().cartItems] });
        }
      },
      removeItemFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        });
      },
      clearCart: () => {
        const confirmClear = window.confirm("Are you sure you want to clear?");
        if (confirmClear) {
          set({ cartItems: [] });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
