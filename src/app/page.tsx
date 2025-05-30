import HeroSection from "@/components/hero-section";
import FeatureSection from "@/components/feature-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product-card";
import WasteCollectionCTA from "@/components/waste-collection-cta";
import GiftCollectionCTA from "@/components/gift-collection-cta";

export default function Home() {
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
              href="/products"
              className="flex items-center gap-1 text-green-600 hover:text-green-700 group"
            >
              Lihat Semua
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              id="1"
              title="Tas Daur Ulang"
              price={75000}
              image="/placeholder.svg?height=200&width=200"
              category="Produk Olahan"
              seller="EcoCraft"
            />
            <ProductCard
              id="2"
              title="Botol Plastik (5kg)"
              price={25000}
              image="/placeholder.svg?height=200&width=200"
              category="Sampah Mentah"
              seller="Bank Sampah Sejahtera"
            />
            <ProductCard
              id="3"
              title="Hiasan Dinding Eco"
              price={120000}
              image="/placeholder.svg?height=200&width=200"
              category="Produk Olahan"
              seller="GreenArt"
            />
            <ProductCard
              id="4"
              title="Kardus Bekas (10kg)"
              price={30000}
              image="/placeholder.svg?height=200&width=200"
              category="Sampah Mentah"
              seller="Recycle Center"
            />
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <Link href="/trashedu" key={index} className="group">
                <div className="elegant-card overflow-hidden hover-scale">
                  <div className="relative h-48 w-full">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt={`Trashedu ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                      {index === 1
                        ? "Apa itu Daur Ulang? Pelajari Cara dan Manfaatnya"
                        : index === 2
                        ? "Panduan Memilah Sampah Rumah Tangga dengan Mudah"
                        : "5 Fakta Mengejutkan tentang Sampah Plastik di Indonesia"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {index === 1
                        ? "Pelajari definisi daur ulang dan bagaimana kegiatan ini bisa berdampak besar pada lingkungan."
                        : index === 2
                        ? "Dengan langkah sederhana, kamu bisa mulai memilah sampah dan membantu mengurangi limbah."
                        : "Ternyata sampah plastik punya dampak besar pada laut dan ekosistem—ketahui faktanya di sini."}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {index === 1
                          ? "2 Mei 2025"
                          : index === 2
                          ? "29 April 2025"
                          : "15 April 2025"}
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
        </section>

        <GiftCollectionCTA />
      </div>
    </div>
  );
}
