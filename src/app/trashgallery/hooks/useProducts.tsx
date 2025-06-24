"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await jsonRequest("/product", "GET");

        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data produk");
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
          seller: item.owner,
        }));
        setProducts(formattedProducts);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}
