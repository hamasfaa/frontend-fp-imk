"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

export function useGifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGifts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await jsonRequest("/gift", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data hadiah");
      }
      const data = response.data;
      console.log("Gifts data:", data);
      const formattedGifts = data.data.map((gift: any) => ({
        id: gift.id,
        name: gift.name,
        point: gift.point_price,
        image: gift.image_path
          ? `http://34.101.249.2:8000/${gift.image_path.replace(
              /^\/?\.?\/?/,
              ""
            )}`
          : "/placeholder.svg?height=200&width=400",
        quantity: gift.quantity,
      }));
      setGifts(formattedGifts);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching gifts:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGifts();
  }, [fetchGifts]);

  const exchangeGift = async (id: string) => {
    try {
      const response = await jsonRequest(`/gift/${id}/exchange`, "POST");

      if (!response || response.status !== 200) {
        throw new Error(response?.data?.message || "Gagal menukar hadiah");
      }

      await fetchGifts();

      return { success: true };
    } catch (error: any) {
      console.error("Error exchanging gift:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Gagal menukar hadiah",
      };
    } finally {
    }
  };

  return {
    gifts,
    loading,
    error,
    exchangeGift,
    refetchGifts: fetchGifts,
  };
}
