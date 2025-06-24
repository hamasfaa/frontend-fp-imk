import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Recycle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden md:px-32">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 elegant-gradient"></div>
      <div className="absolute inset-0 -z-10 subtle-dots"></div>

      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-green-50 opacity-40 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-green-50 opacity-30 blur-3xl"></div>

      <div className="mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mobile: Judul di atas, Desktop: Kiri */}
          <div className="order-1 md:order-1 max-w-xl flex flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="subtle-gradient-text">Trashsure</span>{" "}
              Marketplace
            </h1>
            {/* Desktop: Deskripsi, fitur, tombol */}
            <div className="hidden md:block">
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                Platform jual beli sampah mentah dan produk daur ulang. Bersama
                kita wujudkan ekonomi sirkular dan lingkungan yang lebih bersih.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  {
                    icon: <Recycle className="h-5 w-5" />,
                    text: "Daur Ulang Mudah",
                  },
                  {
                    icon: <Leaf className="h-5 w-5" />,
                    text: "Ramah Lingkungan",
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5" />,
                    text: "Terpercaya",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm"
                  >
                    <div className="text-green-600">{item.icon}</div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl h-14 px-8 shadow-md hover:shadow-lg transition-all elegant-button"
                >
                  <a href="#fitur" className="flex">
                    Kenali Lebih Jauh
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          {/* Gambar: Mobile tengah, Desktop kanan */}
          <div className="relative order-2 md:order-2">
            <div className="relative z-10 aspect-square max-w-md mx-auto">
              <div className="relative h-full w-full rounded-[30px] overflow-hidden border border-green-100 bg-transparent">
                <Image
                  src="/people-trash.png"
                  alt="Bank Sampah Marketplace"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* Mobile: Deskripsi, fitur, tombol di bawah gambar */}
          <div className="max-w-xl order-3 md:hidden -mt-4">
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              Platform jual beli sampah mentah dan produk daur ulang. Bersama
              kita wujudkan ekonomi sirkular dan lingkungan yang lebih bersih.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                {
                  icon: <Recycle className="h-5 w-5" />,
                  text: "Daur Ulang Mudah",
                },
                {
                  icon: <Leaf className="h-5 w-5" />,
                  text: "Ramah Lingkungan",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  text: "Terpercaya",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm"
                >
                  <div className="text-green-600">{item.icon}</div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl h-14 px-8 shadow-md hover:shadow-lg transition-all elegant-button"
              >
                <a href="#fitur" className="flex">
                  Kenali Lebih Jauh
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
