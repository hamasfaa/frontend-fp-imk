"use client";

import { jsonRequest } from "@/lib/api";
import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    username: string,
    password: string,
    email: string,
    address: string,
    first_name: string,
    last_name: string,
    phone: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jsonRequest("/register", "POST", {
        username,
        password,
        email,
        address,
        first_name,
        last_name,
        phone,
      });

      const data = response.data;

      if (data.code === 201 || data.code === 200) {
        return {
          success: true,
          message: data.message || "Pendaftaran berhasil",
        };
      } else {
        throw new Error(data.message || "Pendaftaran gagal");
      }
    } catch (error: any) {
      let errorMessage = "Terjadi kesalahan saat mendaftar";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
