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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { products, loading, error, deleteMyProduct } = useMyProducts();

  const deleteProduct = async (product) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${product.title}?`)) {
      try {
        const result = await deleteMyProduct(product.id);
        if (result.success) {
          alert(`Produk ${product.title} berhasil dihapus`);
        } else {
          alert(`Gagal menghapus produk: ${result.error}`);
        }
      } catch (err) {
        alert("Terjadi kesalahan saat menghapus produk");
      }
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

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
                  Pesanan
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
                    <div className="text-2xl font-bold">Rp 1.250.000</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% dari bulan lalu
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pesanan
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+24</div>
                    <p className="text-xs text-muted-foreground">
                      +12.2% dari bulan lalu
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Pesanan Terbaru</CardTitle>
                    <CardDescription>
                      Anda memiliki 3 pesanan yang perlu diproses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((order) => (
                        <div key={order} className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-md">
                            <Image
                              src="/placeholder.svg?height=64&width=64"
                              alt="Product"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">
                              Pesanan #{order + 1000}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              2 produk • Rp 150.000
                            </p>
                          </div>
                          <Badge
                            variant={order === 1 ? "default" : "outline"}
                            className="ml-auto"
                          >
                            {order === 1
                              ? "Baru"
                              : order === 2
                              ? "Diproses"
                              : "Dikirim"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                      Lihat Semua Pesanan
                    </Button>
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
                      {filteredProducts.map((product) => (
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
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Product"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Pesanan #1001</h4>
                          <p className="text-sm text-muted-foreground">
                            2 produk • Rp 150.000
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pembeli: Ahmad Rizki
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Baru</Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Product"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Pesanan #1002</h4>
                          <p className="text-sm text-muted-foreground">
                            1 produk • Rp 75.000
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pembeli: Siti Nurhaliza
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Diproses</Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Product"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">Pesanan #1003</h4>
                          <p className="text-sm text-muted-foreground">
                            3 produk • Rp 220.000
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Pembeli: Budi Santoso
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Dikirim</Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="collections"
              className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pengambilan Sampah</CardTitle>
                  <CardDescription>
                    Kelola permintaan pengambilan sampah
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Pengambilan #501</h4>
                          <p className="text-sm text-muted-foreground">
                            Jl. Merdeka No. 123, Jakarta
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Jadwal: 15 April 2024, 08:00-11:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-amber-500 hover:bg-amber-600">
                          Menunggu
                        </Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Pengambilan #502</h4>
                          <p className="text-sm text-muted-foreground">
                            Jl. Sudirman No. 45, Bandung
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Jadwal: 16 April 2024, 12:00-15:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Dijadwalkan</Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between border-b pb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Pengambilan #503</h4>
                          <p className="text-sm text-muted-foreground">
                            Jl. Pahlawan No. 67, Surabaya
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Jadwal: 14 April 2024, 16:00-19:00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Selesai</Badge>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
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
