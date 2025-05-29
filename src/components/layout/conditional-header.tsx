"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <div className="md:px-12">
      <Header />
    </div>
  );
}
