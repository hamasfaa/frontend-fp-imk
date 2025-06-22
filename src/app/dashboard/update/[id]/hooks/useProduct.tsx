"use client";

import { formRequest, jsonRequest } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

export function useProduct(id: string | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const response = await jsonRequest(`/product/${id}`, "GET");
      const data = response.data;

      if (data.code !== 200) {
        throw new Error(data.message || "Gagal mengambil data produk");
      }
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const updateProduct = async (dataToUpdate: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    image?: File;
  }) => {
    if (!id) return { success: false, message: "ID Produk tidak valid" };
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", dataToUpdate.name);
      formData.append("category", dataToUpdate.category);
      formData.append("price", dataToUpdate.price.toString());
      formData.append("quantity", dataToUpdate.quantity.toString());
      if (dataToUpdate.image) {
        formData.append("image", dataToUpdate.image);
      }
      console.log("Updating product with data");
      const response = await formRequest(`/product/${id}`, "PUT", formData);
      const data = response.data;

      if (data.code === 200) {
        await fetchProduct();
        return { success: true, message: "Produk berhasil diperbarui" };
      } else {
        throw new Error(data.message || "Gagal memperbarui produk");
      }
    } catch (error) {
      setError((error as Error).message);
      return { success: false, message: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, error, updateProduct, refetch: fetchProduct };
}
