"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

export function useUpdateProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await jsonRequest("/me", "GET");

      if (!response || response.status !== 200) {
        throw new Error("Gagal mengambil data pengguna");
      }
      console.log("Response data:", response.data);
      const data = response.data;
      const formattedUser = {
        username: data.data.username,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        email: data.data.email,
        address: data.data.address,
        phone: data.data.phone,
      };
      setUser(formattedUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    error,
  };
}
