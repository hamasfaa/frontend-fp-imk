"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/app/cart/hooks/useCart";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
}

export default function ProductCard({
  id,
  title,
  price,
  image,
  category,
  seller,
}: ProductCardProps) {
  const { cart, loadingCart, errorCart, addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden border-0 rounded-xl hover-scale group elegant-card">
      <Link href={`/trashgallery/${id}`} className="block relative">
        <div className="relative h-56 w-full overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>

          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge with subtle styling */}
          <Badge
            variant={category === "Produk Olahan" ? "default" : "outline"}
            className={`absolute top-3 left-3 z-20 ${
              category === "Produk Olahan"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-white/90 text-gray-800 border-gray-200"
            } rounded-full px-3 py-1 text-xs`}
          >
            {category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-2">Penjual: {seller}</p>
        <p className="font-bold text-lg text-green-600">{formatPrice(price)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 rounded-lg elegant-button"
          onClick={() => addToCart(id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Tambah ke Keranjang
        </Button>
      </CardFooter>
    </Card>
  );
}
