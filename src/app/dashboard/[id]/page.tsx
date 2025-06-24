"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDetailTransaction } from "./hooks/useDetailTransaction";
import { useParams } from "next/navigation";

export default function TransactionDetailPage() {
  const params = useParams();
  const transactionId = params.id as string;
  const { transaction, loading, error } = useDetailTransaction(transactionId);

  const calculateSubtotal = () => {
    if (!transaction) return 0;
    return transaction.totalPrice;
  };

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
        <p>Memuat data transaksi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
        <Link
          href="/dashboard"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Data transaksi tidak ditemukan</p>
        <Link
          href="/dashboard"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Kembali ke Dashboard
      </Link>

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center border-b">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-green-600 rounded-full p-2">
                <Package className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-2xl">Detail Transaksi</CardTitle>
            </div>
            <p className="text-lg font-semibold text-green-600">
              {transaction.id}
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Daftar Barang */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Daftar Barang Pesanan</h3>
              {transaction.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.price)}</p>
                    <p className="text-sm text-muted-foreground">per item</p>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold text-green-600">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Total Harga */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total Harga</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(calculateSubtotal())}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
