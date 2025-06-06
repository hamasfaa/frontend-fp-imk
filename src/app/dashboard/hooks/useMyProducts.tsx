"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useMyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await jsonRequest("/product/myproducts", "GET");

        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data produk saya");
        }
        const data = response.data;
        const formattedProducts = data.data.map((item, index) => ({
          id: item.id,
          title: item.name,
          price: item.price,
          image: item.image || "/placeholder.svg?height=200&width=400",
          category: item.category,
          seller: "Sementara",
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching my products:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  return { products, loading, error };
}
