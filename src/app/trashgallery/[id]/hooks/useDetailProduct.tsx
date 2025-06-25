"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useDetailProduct(id: string) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await jsonRequest(`/product/${id}`, "GET");
        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data produk");
        }
        const data = response.data;
        console.log("Fetched Product Data:", data.data.id);
        const formattedProduct = {
          id: data.data.id,
          title: data.data.name,
          price: data.data.price,
          image: data.data.image_path
            ? `http://34.101.249.2:8000/${data.data.image_path.replace(
                /^\.\/?/,
                ""
              )}`
            : "/placeholder.svg?height=200&width=400",
          stock: data.data.quantity,
          category: data.data.category,
          seller: data.data.owner,
          description: data.data.description || "Tidak ada deskripsi produk.",
        };
        console.log("Formatted Product:", formattedProduct);
        setProduct(formattedProduct);
      } catch (error: any) {
        console.error("Error fetching product:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  return { product, loading, error };
}
