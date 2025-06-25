"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "./hooks/useCart";
import { useToast } from "@/components/ui/use-toast";

export default function CartPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const {
    cart,
    deleteFromCart,
    updateCart,
    fetchCart,
    checkout,
    loading: loadingCart,
    error: errorCart,
  } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const result = await checkout();

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Pesanan Anda telah dibuat",
        });
        setOrderPlaced(true);
      } else {
        toast({
          title: "Error",
          description:
            result.message || "Gagal membuat pesanan, silakan coba lagi",
          variant: "destructive",
        });
        window.alert(
          `Error: ${
            result.errorData || "Gagal membuat pesanan, silakan coba lagi"
          }`
        );
      }
    } catch (error: any) {
      console.error("Unexpected checkout error:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan yang tidak terduga",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCart(id, newQuantity);
      await fetchCart();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal mengubah jumlah item",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      setIsDeleting(true);
      await deleteFromCart(id);

      toast({
        title: "Berhasil",
        description: "Produk telah dihapus dari keranjang",
      });

      await fetchCart();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Gagal menghapus item dari keranjang",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loadingCart) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat keranjang...</p>
      </div>
    );
  }

  if (errorCart) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Error: {errorCart}</p>
        <Link href="/trashgallery">
          <Button className="mt-4">Kembali ke Galeri</Button>
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Pesanan Berhasil Dibuat!</h1>
          <p className="text-muted-foreground mb-6">
            Terima kasih atas pesanan Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700">
                Lihat Status Pesanan
              </Button>
            </Link>
            <Link href="/trashgallery">
              <Button variant="outline">Lanjutkan Belanja</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/trashgallery"
        className="flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Lanjutkan Belanja
      </Link>

      <h1 className="text-3xl font-bold mb-8">Keranjang Belanja</h1>

      {cart && cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Item Keranjang ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 py-4 border-b"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Penjual: {item.seller}
                      </p>
                      <p className="font-semibold mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Ringkasan Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>
                      {isCheckingOut ? "Memproses..." : "Buat Pesanan"}
                    </span>
                  </div>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Keranjang Anda Kosong</h2>
          <p className="text-muted-foreground mb-6">
            Sepertinya Anda belum menambahkan produk apapun ke keranjang.
          </p>
          <Link href="/trashgallery">
            <Button className="bg-green-600 hover:bg-green-700">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
