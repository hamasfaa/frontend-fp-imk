"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  User,
  ShoppingBag,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout } from "@/app/actions/auth";
import { useTransition } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    startTransition(() => {
      logout();
      router.push("/login");
    });
  };

  const navItems = [
    { name: "Beranda", path: "/" },
    { name: "TrashGallery", path: "/trashgallery" },
    { name: "TrashRadar", path: "/trashradar" },
    { name: "TrashEdu", path: "/trashedu" },
    { name: "TrashPoin", path: "/trashpoin" },
    { name: "Tentang Kami", path: "/tentangkami" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-900/90"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] border-r-0 glass-card"
            >
              <Link href="/" className="flex items-center gap-2 mb-8">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
                <span className="font-bold text-xl subtle-gradient-text">
                  TRASHSURE
                </span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-3 text-lg rounded-xl transition-all ${
                      isActive(item.path)
                        ? "font-medium bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                        : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden md:flex items-center gap-2 ">
            <div className="relative w-10 h-10 flex items-center justify-center bg-green-100 rounded-full p-2 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block subtle-gradient-text">
              TRASHSURE
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium relative px-2 py-1 transition-all ${
                  isActive(item.path)
                    ? "text-green-600 dark:text-green-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="glass-card border-0 rounded-xl"
            >
              <DropdownMenuSeparator />
              <Link href="/dashboard">
                <DropdownMenuItem className="rounded-lg">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="/profile">
                <DropdownMenuItem className="rounded-lg">
                  <Settings className="h-4 w-4 mr-2" />
                  Pengaturan Profil
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="rounded-lg text-red-600 cursor-pointer"
                onClick={handleLogout}
                disabled={isPending}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isPending ? "Keluar..." : "Keluar"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
