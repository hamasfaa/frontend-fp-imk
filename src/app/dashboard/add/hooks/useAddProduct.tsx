"use client";

import { formRequest } from "@/lib/api";
import { useState } from "react";

export function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (
    title: string,
    category: string,
    quantity: number,
    price: number,
    description: string,
    image: File
  ) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("quantity", quantity.toString());
      formData.append("description", description);
      formData.append("image", image);

      const response = await formRequest("/product", "POST", formData);

      const data = response.data;
      if (data.code === 200) {
        return { success: true, message: "Produk berhasil ditambahkan" };
      } else {
        throw new Error(data.message || "Gagal menambahkan produk");
      }
    } catch (error) {
      setError((error as Error).message);
      return { success: false, message: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  return { addProduct, loading, error };
}
