"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await jsonRequest("/news", "GET");

        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data artikel");
        }

        const data = response.data;

        const formattedArticles = data.data.map((item: any, index: any) => ({
          id: index,
          title: item.title,
          excerpt: item.source,
          image: item.image,
          category: item.source,
          date: new Date().toLocaleDateString("id-ID"),
          readTime: "5 menit",
          link: item.link,
        }));
        setArticles(formattedArticles);
      } catch (error: any) {
        console.error("Error fetching articles:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}
