"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(userData: {
  username: string;
  role: string;
}) {
  const isProduction = process.env.NODE_ENV === "production";

  (await cookies()).set({
    name: "username",
    value: userData.username,
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
  });

  (await cookies()).set({
    name: "role",
    value: userData.role,
    httpOnly: true,
    maxAge: 60 * 60,
    path: "/",
    sameSite: isProduction ? "none" : "lax",
  });

  return { success: true };
}

export async function logout() {
  (await cookies()).delete("token");
  (await cookies()).delete("username");
  (await cookies()).delete("role");

  return { success: true };
}
