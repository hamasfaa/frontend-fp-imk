"use client";

import HeroSection from "@/components/hero-section";
import FeatureSection from "@/components/feature-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import WasteCollectionCTA from "@/components/waste-collection-cta";
import GiftCollectionCTA from "@/components/gift-collection-cta";
import { useProducts } from "./trashgallery/hooks/useProducts";
import { useArticles } from "./trashedu/hooks/useArticles";

export default function Home() {
  const { products, loading, error } = useProducts();
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
  } = useArticles();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <div className="mx-8 md:mx-32">
        {/* Products section with elegant styling */}
        <section className="my-16 relative">
          {/* Section header with elegant styling */}
          <div className="flex items-center justify-between mb-8 relative">
            <h2 className="text-2xl md:text-3xl font-bold relative elegant-underline">
              <span className="subtle-gradient-text">Produk</span> Terbaru
            </h2>

            <Link
              href="/trashgallery"
              className="flex items-center gap-1 text-green-600 hover:text-green-700 group"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {loading ? (
            <p>Memuat produk...</p>
          ) : error ? (
            <p className="text-red-500">Gagal memuat produk: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...products]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                )
                .slice(0, 4)
                .map((product: any) => (
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
          )}
        </section>

        <WasteCollectionCTA />

        {/* TrashEdu section */}
        <section className="my-16 relative">
          <div className="flex items-center justify-between mb-8 relative">
            <h2 className="text-2xl md:text-3xl font-bold relative elegant-underline">
              <span className="subtle-gradient-text">Edukasi</span> Terbaru
            </h2>

            <Link
              href="/trashedu"
              className="flex items-center gap-1 text-green-600 hover:text-green-700 group"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {articlesLoading ? (
            <p>Memuat artikel...</p>
          ) : articlesError ? (
            <p className="text-red-500">
              Gagal memuat artikel: {articlesError}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...articles]
                .sort(
                  (a: any, b: any) =>
                    new Date(b.createdAt || 0).getTime() -
                    new Date(a.createdAt || 0).getTime()
                )
                .slice(0, 3)
                .map((article: any) => (
                  <Link
                    href={article.link || "/trashedu"}
                    key={article.id}
                    className="group"
                  >
                    <div className="elegant-card overflow-hidden hover-scale">
                      <div className="relative h-48 w-full">
                        <img
                          src={
                            article.image ||
                            "/placeholder.svg?height=200&width=400"
                          }
                          alt={article.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            {article.date}
                          </span>
                          <span className="text-sm text-green-600 group-hover:underline">
                            Baca selengkapnya
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </section>

        <GiftCollectionCTA />
      </div>
    </div>
  );
}
