"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useGifts() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await jsonRequest("/gift", "GET");

        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data hadiah");
        }
        const data = response.data;
        console.log("Gifts data:", data);
        const formattedGifts = data.data.map((gift, index) => ({
          id: gift.id,
          name: gift.name,
          point: gift.point_price,
          image: gift.image_path
            ? `http://127.0.0.1:8000/${gift.image_path.replace(/^\.\/?/, "")}`
            : "/placeholder.svg?height=200&width=400",
          quantity: gift.quantity,
        }));
        setGifts(formattedGifts);
      } catch (error) {
        console.error("Error fetching gifts:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  return { gifts, loading, error };
}
