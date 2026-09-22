"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { CartItem, Product } from "@/lib/types/product";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  subtotalArs: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "gc_studio_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignorar si storage no está disponible
    }
    setMounted(true);
  }, []);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignorar
    }
  }, [items, mounted]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          quantity: copy[index].quantity + quantity,
        };
        return copy;
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const totalItems = items.reduce((acc, it) => acc + it.quantity, 0);
  const subtotalArs = items.reduce(
    (acc, it) => acc + it.product.priceArs * it.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalItems,
        subtotalArs,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
