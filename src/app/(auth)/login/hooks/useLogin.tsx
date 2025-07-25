"use client";

import { setAuthCookies } from "@/app/actions/auth";
import { jsonRequest } from "@/lib/api";
import { useState } from "react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jsonRequest("/authentication", "POST", {
        username,
        password,
      });

      const data = response.data;

      if (data.code === 200 && data.data?.token) {
        await setAuthCookies({
          username: data.data.username,
          role: data.data.role[0].role,
        });

        return { success: true };
      } else {
        throw new Error(data.message || "Login gagal");
      }
    } catch (err: any) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
