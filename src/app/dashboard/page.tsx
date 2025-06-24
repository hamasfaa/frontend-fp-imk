"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Truck, CreditCard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useMyProducts } from "./hooks/useMyProducts";
import { useMemo } from "react";
import { useMyTransactions } from "./hooks/useMyTransactions";
import { useMyBuys } from "./hooks/useMyBuys";
import {
  SelectTrigger,
  SelectValue,
  Select,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { products, loading, error, deleteMyProduct } = useMyProducts();
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
    updateTransactionStatus,
  } = useMyTransactions();

  const { buys, loading: buysLoading, error: buysError } = useMyBuys();

  const deleteProduct = async (product: any) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${product.title}?`)) {
      try {
        const result = await deleteMyProduct(product.id);
        if (result.success) {
          alert(`Produk ${product.title} berhasil dihapus`);
        } else {
          alert(`Gagal menghapus produk: ${result}`);
        }
      } catch (err: any) {
        alert("Terjadi kesalahan saat menghapus produk");
      }
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const totalRevenue = useMemo(() => {
    return transactions.reduce((sum, tx: any) => sum + (tx.totalPrice || 0), 0);
  }, [transactions]);

  const totalOrders = useMemo(() => {
    return transactions.reduce(
      (count, tx: any) => count + tx.details.length,
      0
    );
  }, [transactions]);

  const { toast } = useToast();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {error}. Gagal memuat produk.</p>
      </div>
    );
  }

  if (transactionsLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat transaksi...</p>
      </div>
    );
  }

  if (transactionsError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {transactionsError}. Gagal memuat transaksi.</p>
      </div>
    );
  }

  if (buysLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Memuat pembelian...</p>
      </div>
    );
  }

  if (buysError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        <p>Error: {buysError}. Gagal memuat pembelian.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full space-y-6"
          >
            <div className="flex items-center justify-center mb-4">
              <TabsList>
                <TabsTrigger value="overview" className="inline-flex">
                  Ringkasan
                </TabsTrigger>
                <TabsTrigger value="products" className="inline-flex">
                  Produk
                </TabsTrigger>
                <TabsTrigger value="orders" className="inline-flex">
                  Penjualan
                </TabsTrigger>
                <TabsTrigger value="buy" className="inline-flex">
                  Pembelian
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent
              value="overview"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="grid gap-4 grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Pendapatan
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      Rp {totalRevenue.toLocaleString("id-ID")}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Pesanan
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Pesanan Terbaru</CardTitle>
                    <CardDescription>
                      Berikut adalah 3 pesanan terbaru Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions
                        .slice(-3)
                        .reverse()
                        .map((transaction: any) => {
                          return (
                            <div
                              key={transaction.id}
                              className="flex items-center gap-4"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  Pesanan #{transaction.id}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {transaction.details.length} produk • Rp{" "}
                                  {transaction.totalPrice.toLocaleString(
                                    "id-ID"
                                  )}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  transaction.status === "selesai"
                                    ? "default"
                                    : transaction.status === "proses"
                                    ? "secondary"
                                    : transaction.status === "batal"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="ml-auto"
                              >
                                {transaction.status
                                  ? transaction.status.charAt(0).toUpperCase() +
                                    transaction.status.slice(1)
                                  : "Diproses"}
                              </Badge>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Pembelian Terbaru</CardTitle>
                    <CardDescription>
                      Berikut adalah 3 pembelian terbaru Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {buys
                        .slice(-3)
                        .reverse()
                        .map((buy: any) => {
                          return (
                            <div
                              key={buy.id}
                              className="flex items-center gap-4"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  Pesanan #{buy.id}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {buy.details.length} produk • Rp{" "}
                                  {buy.totalPrice.toLocaleString("id-ID")}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  buy.status === "selesai"
                                    ? "default"
                                    : buy.status === "proses"
                                    ? "secondary"
                                    : buy.status === "batal"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="ml-auto"
                              >
                                {buy.status
                                  ? buy.status.charAt(0).toUpperCase() +
                                    buy.status.slice(1)
                                  : "Diproses"}
                              </Badge>
                            </div>
                          );
                        })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent
              value="products"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <div className="border rounded-lg">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Produk Saya</h2>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                      <div className="w-full md:w-[200px]">
                        <Input
                          placeholder="Cari produk..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div className="flex justify-between gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full md:w-auto"
                            >
                              {categoryFilter === "all"
                                ? "Kategori"
                                : categoryFilter}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onSelect={() => setCategoryFilter("all")}
                            >
                              Semua Kategori
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                setCategoryFilter("Produk Olahan")
                              }
                            >
                              Produk Olahan
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() =>
                                setCategoryFilter("Sampah Mentah")
                              }
                            >
                              Sampah Mentah
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Link
                          href="/dashboard/add"
                          className="w-full md:w-auto"
                        >
                          <Button className="bg-green-600 hover:bg-green-700 w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Tambah
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProducts.map((product: any) => (
                        <Card key={product.id} className="overflow-hidden">
                          <div className="relative h-40 w-full">
                            <Image
                              src={
                                product.image ||
                                "/placeholder.svg?height=160&width=320"
                              }
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="mb-2">
                              <Badge
                                variant={
                                  product.category === "Sampah Mentah"
                                    ? "outline"
                                    : "default"
                                }
                                className={
                                  product.category === "Sampah Mentah"
                                    ? ""
                                    : "bg-green-600 hover:bg-green-700"
                                }
                              >
                                {product.category}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Stok: {product.quantity}
                            </p>
                            <p className="font-bold text-lg">
                              Rp {product.price?.toLocaleString("id-ID")}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                              >
                                <Link href={`/dashboard/update/${product.id}`}>
                                  Edit
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => deleteProduct(product)}
                              >
                                Hapus
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-muted-foreground">
                        Belum ada produk ditemukan.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="orders"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan</CardTitle>
                  <CardDescription>Kelola semua pesanan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.length === 0 && (
                      <p className="text-muted-foreground text-sm">
                        Belum ada pesanan.
                      </p>
                    )}

                    {transactions.map((transaction: any) => {
                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center gap-4 justify-between border-b pb-4"
                        >
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">
                                Pesanan #{transaction.id}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {transaction.details.length} produk • Rp{" "}
                                {transaction.totalPrice.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select
                              defaultValue={transaction.status}
                              onValueChange={async (newStatus) => {
                                const result = await updateTransactionStatus(
                                  transaction.id,
                                  newStatus
                                );
                                if (result.success) {
                                  toast({
                                    title: "Status diperbarui",
                                    description: `Status pesanan berhasil diubah menjadi ${newStatus}`,
                                  });
                                } else {
                                  toast({
                                    title: "Gagal memperbarui",
                                    description:
                                      "Terjadi kesalahan saat mengubah status pesanan",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="proses">Proses</SelectItem>
                                <SelectItem value="selesai">Selesai</SelectItem>
                                <SelectItem value="batal">Batal</SelectItem>
                              </SelectContent>
                            </Select>
                            <Badge
                              variant={
                                transaction.status === "selesai"
                                  ? "default"
                                  : transaction.status === "proses"
                                  ? "secondary"
                                  : transaction.status === "batal"
                                  ? "destructive"
                                  : "outline"
                              }
                              className="ml-auto"
                            >
                              {transaction.status
                                ? transaction.status.charAt(0).toUpperCase() +
                                  transaction.status.slice(1)
                                : "Diproses"}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Link href={`/dashboard/${transaction.id}`}>
                                Detail
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="buy"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan</CardTitle>
                  <CardDescription>Kelola semua pesanan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {buys.length === 0 && (
                      <p className="text-muted-foreground text-sm">
                        Belum ada pesanan.
                      </p>
                    )}

                    {buys.map((buy: any) => {
                      return (
                        <div
                          key={buy.id}
                          className="flex items-center gap-4 justify-between border-b pb-4"
                        >
                          <div className="flex items-center gap-4">
                            <div>
                              <h4 className="font-medium">Pesanan #{buy.id}</h4>
                              <p className="text-sm text-muted-foreground">
                                {buy.details.length} produk • Rp{" "}
                                {buy.totalPrice.toLocaleString("id-ID")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                buy.status === "selesai"
                                  ? "default"
                                  : buy.status === "proses"
                                  ? "secondary"
                                  : buy.status === "batal"
                                  ? "destructive"
                                  : "outline"
                              }
                              className="ml-auto"
                            >
                              {buy.status
                                ? buy.status.charAt(0).toUpperCase() +
                                  buy.status.slice(1)
                                : "Diproses"}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Link href={`/dashboard/${buy.id}`}>Detail</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
