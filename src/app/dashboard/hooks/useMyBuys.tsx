"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useMyBuys() {
  const [buys, setBuys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyBuys();
  }, []);

  const fetchMyBuys = async () => {
    try {
      const response = await jsonRequest("/transaction/buyer", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data transaksi saya");
      }

      const data = response.data;

      const transactions = Array.isArray(data?.data) ? data.data : [];
      const formattedBuys = transactions.map((transaction: any) => ({
        id: transaction.id,
        totalPrice: transaction.total_price,
        status: transaction.status,
        details: transaction.transaction_details.map((detail: any) => ({
          id: detail.id,
          subTotalPrice: detail.sub_total_price,
          price: detail.price,
          quantity: detail.quantity,
          product: {
            id: detail.Product.id,
            name: detail.Product.name,
            price: detail.Product.price,
            quantity: detail.Product.quantity,
            category: detail.Product.category,
            imagePath: detail.Product.image_path,
          },
        })),
      }));

      setBuys(formattedBuys);
    } catch (error: any) {
      console.error("Error fetching my buys:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return { buys, loading, error };
}
