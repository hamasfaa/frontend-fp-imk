"use client";

import { jsonRequest } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";

export function useUpdateProfile() {
  const [user, setUser] = useState<any>(null);
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

  const updateProfile = async (dataToUpdate: {
    email: string;
    address: string;
    phone: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jsonRequest(
        "/update-profile",
        "PUT",
        dataToUpdate
      );
      const data = response.data;

      if (data.code !== 200) {
        throw new Error(data.message || "Gagal memperbarui profil");
      }
      await fetchUser();
      return { success: true, message: "Profil berhasil diperbarui" };
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
      return {
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    updateProfile,
    fetchUser,
  };
}
