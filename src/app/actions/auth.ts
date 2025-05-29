"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(userData: {
  token: string;
  username: string;
  role: string;
}) {
  (await cookies()).set({
    name: "token",
    value: userData.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "strict",
  });

  (await cookies()).set({
    name: "username",
    value: userData.username,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "strict",
  });

  (await cookies()).set({
    name: "role",
    value: userData.role,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "strict",
  });

  return { success: true };
}

export async function clearAuthCookies() {
  (await cookies()).delete("token");
  (await cookies()).delete("username");
  (await cookies()).delete("role");

  return { success: true };
}
