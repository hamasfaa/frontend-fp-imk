"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "./hooks/useCart";

const initialCartItems = [
  {
    id: 1,
    name: "Tas Daur Ulang Premium",
    price: 75000,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    seller: "EcoCraft",
  },
  {
    id: 2,
    name: "Hiasan Dinding Eco",
    price: 120000,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    seller: "GreenArt",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [shippingMethod, setShippingMethod] = useState("regular");
  const { cart, loadingCart, errorCart, addToCart, deleteFromCart } = useCart();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    console.log("Removing item with ID:", id);
    deleteFromCart(id);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    return shippingMethod === "regular" ? 10000 : 20000;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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

      {cart.length > 0 ? (
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

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Metode Pengiriman</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={shippingMethod}
                  onValueChange={setShippingMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label
                        htmlFor="regular"
                        className="flex items-center gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Pengiriman Reguler (2-3 hari)
                      </Label>
                    </div>
                    <p className="font-medium">Rp 10.000</p>
                  </div>
                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label
                        htmlFor="express"
                        className="flex items-center gap-2"
                      >
                        <Truck className="h-4 w-4" />
                        Pengiriman Express (1 hari)
                      </Label>
                    </div>
                    <p className="font-medium">Rp 20.000</p>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label
                      htmlFor="bank_transfer"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Transfer Bank
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="e_wallet" id="e_wallet" />
                    <Label
                      htmlFor="e_wallet"
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      E-Wallet
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Bayar di Tempat (COD)
                    </Label>
                  </div>
                </RadioGroup>
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
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Biaya Pengiriman
                  </span>
                  <span>{formatPrice(calculateShipping())}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Kode Promo" className="flex-1" />
                  <Button variant="outline">Terapkan</Button>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Lanjutkan ke Pembayaran
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
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Mulai Belanja
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
