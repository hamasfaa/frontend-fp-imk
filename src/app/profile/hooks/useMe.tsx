"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

export function useMe() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await jsonRequest("/me", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data pengguna");
      }
      const data = response.data;
      const formattedUser = {
        username: data.data.username,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        email: data.data.email,
        address: data.data.address,
        phone: data.data.phone,
        points: data.data.points,
        rank: data.data.rank,
      };
      setUser(formattedUser);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching user:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetchUser: fetchUser };
}
