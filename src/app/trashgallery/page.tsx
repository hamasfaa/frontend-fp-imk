"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import ProductCard from "@/components/product-card";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "../cart/hooks/useCart";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("newest");
  const { products, loading, error } = useProducts();
  const { cart, loadingCart, errorCart, addToCart } = useCart();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && !activeFilters.includes(categoryParam)) {
      setActiveFilters([categoryParam]);
    }
  }, [searchParams]);

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeFilters.length === 0 || activeFilters.includes(product.category);

    const hasStock = product.quantity >= 1;

    return matchesSearch && matchesCategory && hasStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">TrashGallery</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jual atau beli sampah daur ulang dengan mudah melalui marketplace
          limbah yang terhubung langsung dengan komunitas
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cari produk atau material..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={sortOption}
            onValueChange={(value) => setSortOption(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
              <SelectItem value="price-high">
                Harga: Tinggi ke Rendah
              </SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                {activeFilters.length > 0 && (
                  <span className="ml-1 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilters.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Produk</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Kategori</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-processed"
                        checked={activeFilters.includes("Produk Olahan")}
                        onCheckedChange={() => toggleFilter("Produk Olahan")}
                      />
                      <Label htmlFor="category-processed">Produk Olahan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="category-raw"
                        checked={activeFilters.includes("Sampah Mentah")}
                        onCheckedChange={() => toggleFilter("Sampah Mentah")}
                      />
                      <Label htmlFor="category-raw">Sampah Mentah</Label>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Rentang Harga</h3>
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" type="number" />
                    <span>-</span>
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>
              </div>
              <SheetFooter className="flex flex-row gap-3 sm:justify-between">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Reset
                </Button>
                <SheetClose asChild>
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    Terapkan
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => (
            <div
              key={filter}
              className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {filter}
              <button onClick={() => toggleFilter(filter)}>
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Hapus semua
          </button>
        </div>
      )}

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
              seller={product.seller}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">
            Tidak ada produk yang ditemukan
          </h3>
          <p className="text-muted-foreground">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      )}
    </div>
  );
}
