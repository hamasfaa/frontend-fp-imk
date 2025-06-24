"use client";

import { jsonRequest } from "@/lib/api";
import { useEffect, useState } from "react";

export function useCart() {
  type CartItem = {
    id: string;
    price: number;
    quantity: number;
    image: string;
    title: string;
    seller: string;
  };

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await jsonRequest("/cart", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data keranjang");
      }
      const data = response.data;
      const formattedCart = data.data.items.map((item: any) => ({
        id: item.product_id,
        title: item.name,
        price: item.price,
        image: item.image_path
          ? `http://127.0.0.1:8000/${item.image_path.replace(/^\.\/?/, "")}`
          : "/placeholder.svg?height=200&width=400",
        quantity: item.quantity,
        seller: item.seller || "Sementara",
      }));

      setCart(formattedCart);
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product_id: string) => {
    try {
      const response = await jsonRequest(`/cart/add/${product_id}`, "POST", {
        product_id,
        quantity: 1,
      });

      if (!response || response.status !== 200) {
        throw new Error("Gagal menambahkan produk ke keranjang");
      }

      fetchCart();

      return { success: true };
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menambahkan produk ke keranjang"
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    }
  };

  const deleteFromCart = async (id: string) => {
    try {
      const response = await jsonRequest(`/cart/${id}`, "DELETE");
      if (!response || response.status !== 200) {
        throw new Error("Gagal menghapus produk dari keranjang");
      }

      setCart((prevCart) => prevCart.filter((item) => item.id !== id));

      await fetchCart();

      return { success: true };
    } catch (error: any) {
      console.error("Error deleting from cart:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghapus produk dari keranjang"
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    }
  };

  const updateCart = async (id: string, quantity: number) => {
    try {
      const response = await jsonRequest(`/cart/${id}`, "PUT", {
        quantity: quantity,
      });

      if (!response || response.status !== 200) {
        throw new Error("Gagal menambah jumlah produk di keranjang");
      }

      fetchCart();

      return { success: true };
    } catch (error: any) {
      console.error("Error adding quantity to cart:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menambah jumlah produk di keranjang"
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    }
  };

  const checkout = async () => {
    try {
      const response = await jsonRequest("/transaction/checkout", "POST");

      console.log("Checkout response:", response);

      setCart([]);
      setError(null);

      return { success: true };
    } catch (error: any) {
      console.error("Error during checkout:", error);

      if (error.response) {
        console.log("Error response data:", error.response.data.data);

        const errorMessage =
          error.response.data.message || "Gagal melakukan checkout";
        setError(errorMessage);

        return {
          success: false,
          message: errorMessage,
          errorData: error.response.data.data,
        };
      } else if (error.request) {
        setError("Tidak ada respons dari server");
        return {
          success: false,
          message: "Tidak ada respons dari server",
        };
      } else {
        setError(error.message || "Terjadi kesalahan saat melakukan checkout");
        return {
          success: false,
          message: error.message || "Terjadi kesalahan",
        };
      }
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    deleteFromCart,
    updateCart,
    fetchCart,
    checkout,
  };
}
