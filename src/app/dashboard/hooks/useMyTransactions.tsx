"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useMyTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyTransactions();
  }, []);

  const fetchMyTransactions = async () => {
    try {
      const response = await jsonRequest("/transaction/my", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data transaksi saya");
      }

      const data = response.data;

      const formattedTransactions = data.data.map((transaction: any) => ({
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

      setTransactions(formattedTransactions);
    } catch (error: any) {
      console.error("Error fetching my transactions:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id: string, status: string) => {
    try {
      setLoading(true);
      const response = await jsonRequest(
        `/transaction/${id}?status=${status}`,
        "PUT"
      );

      if (!response || response.status !== 200) {
        throw new Error(`Gagal mengubah status transaksi ke ${status}`);
      }

      setTransactions((prevTransactions: any) =>
        prevTransactions.map((transaction: any) =>
          transaction.id === id ? { ...transaction, status } : transaction
        )
      );

      return { success: true };
    } catch (error: any) {
      console.error("Error updating transaction status:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengubah status"
      );
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading, error, updateTransactionStatus };
}
