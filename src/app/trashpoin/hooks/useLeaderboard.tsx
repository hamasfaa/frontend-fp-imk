"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect } from "react";

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await jsonRequest("/leaderboard", "GET");

        if (!response || response.status !== 200) {
          throw new Error("Gagal mengambil data leaderboard");
        }
        const data = response.data;
        const formattedLeaderboard = data.data.map((item, index) => ({
          username: item.username,
          points: item.points,
          rank: item.rank,
          firstname: item.first_name,
          lastname: item.last_name,
        }));
        setLeaderboard(formattedLeaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return { leaderboard, loading, error };
}
