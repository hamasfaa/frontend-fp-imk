"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useMyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const response = await jsonRequest("/product/myproducts", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data produk saya");
      }
      const data = response.data;
      const formattedProducts = data.data.map((item: any) => ({
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.image_path
          ? `http://127.0.0.1:8000/${item.image_path.replace(/^\.\/?/, "")}`
          : "/placeholder.svg?height=200&width=400",
        quantity: item.quantity,
        category: item.category,
        seller: "Sementara",
      }));
      setProducts(formattedProducts);
    } catch (error: any) {
      console.error("Error fetching my products:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const deleteMyProduct = async (id: string) => {
    try {
      const response = await jsonRequest(`/product/${id}`, "DELETE");

      if (!response || response.status !== 200) {
        throw new Error("Gagal menghapus produk");
      }

      fetchMyProducts();

      return { success: true };
    } catch (error: any) {
      console.error("Error deleting product:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menghapus produk"
      );
      return {
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    }
  };
  return {
    products,
    loading,
    error,
    deleteMyProduct,
    refreshProducts: fetchMyProducts,
  };
}
