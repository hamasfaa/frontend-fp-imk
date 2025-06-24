"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Share2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDetailProduct } from "./hooks/useDetailProduct";
import { useParams } from "next/navigation";
import { useCart } from "@/app/cart/hooks/useCart";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const { cart, loadingCart, errorCart, addToCart } = useCart();
  const params = useParams();
  const router = useRouter();

  const productId = params.id as string;

  const { product, loading, error } = useDetailProduct(productId);
  console.log("Product Detail:", product, loading, error);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat detail produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {error}. Gagal memuat detail produk.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6">
        <Link
          href="/trashgallery"
          className="flex items-center text-muted-foreground hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke TrashGallery
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={"/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white/90 hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  {product.category}
                </Badge>
              </div>

              <h1 className="text-3xl font-bold mb-3 text-gray-900">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Stock & Shipping Info */}
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">
                  Stok: {product.stock} tersisa
                </span>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-12"
                onClick={() => addToCart(product.id)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Tambah ke Keranjang
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-xl h-12 border-green-600 text-green-600 hover:bg-green-50"
                onClick={async () => {
                  await addToCart(product.id);
                  router.push("/cart");
                }}
              >
                Beli Sekarang
              </Button>
            </div>

            {/* Seller Info */}
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{product.seller.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{product.seller}</h3>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
