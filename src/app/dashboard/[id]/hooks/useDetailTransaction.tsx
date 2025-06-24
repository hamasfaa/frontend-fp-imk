"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useDetailTransaction(id: string) {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await jsonRequest(`/transaction/${id}`, "GET");
        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data transaksi");
        }
        const data = response.data;
        console.log("Fetched Transaction Data:", data.data);
        const formattedTransaction = {
          id: data.data.id,
          status: data.data.status,
          totalPrice: data.data.total_price,
          items: data.data.transaction_details.map((detail) => ({
            id: detail.id,
            name: detail.Product.name,
            price: detail.price,
            quantity: detail.quantity,
            subtotal: detail.sub_total_price,
            image: detail.Product.image_path
              ? `http://127.0.0.1:8000/${detail.product.image_path.replace(
                  /^\.\/?/,
                  ""
                )}`
              : "/placeholder.svg?height=200&width=400",
          })),
        };
        setTransaction(formattedTransaction);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };
    fetchTransaction();
  }, [id]);

  return { transaction, loading, error };
}
