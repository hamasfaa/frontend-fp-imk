import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WasteCollectionCTA() {
  return (
    <div className="relative my-20 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 elegant-gradient rounded-3xl"></div>
      <div className="absolute inset-0 -z-10 subtle-dots rounded-3xl"></div>

      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-center elegant-underline">
            <span className="subtle-gradient-text">Temukan TPA Terdekat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400">
                  Ingin membuang sampah dengan tepat dan bertanggung jawab?
                </h3>
              </div>
              <p className="mb-6 text-green-700 dark:text-green-300 leading-relaxed">
                Temukan Tempat Pembuangan Akhir (TPA) terdekat dari lokasi Anda.
                Kami menyediakan informasi lengkap untuk membantu Anda membuang
                sampah secara aman dan sesuai aturan.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-200 p-1 mt-0.5 flex-shrink-0">
                    <svg
                      className="h-3 w-3 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-green-800 dark:text-green-200">
                    Temukan TPA terdekat berdasarkan lokasi GPS Anda
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-200 p-1 mt-0.5 flex-shrink-0">
                    <svg
                      className="h-3 w-3 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-green-800 dark:text-green-200">
                    Dapatkan informasi lengkap seputar jam operasional
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-green-200 p-1 mt-0.5 flex-shrink-0">
                    <svg
                      className="h-3 w-3 text-green-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-green-800 dark:text-green-200">
                    Dukung upaya pengelolaan sampah yang baik demi lingkungan
                    yang lebih bersih dan sehat
                  </span>
                </li>
              </ul>
              <Link href="/tpa-terdekat">
                <Button className="bg-green-600 hover:bg-green-700 rounded-xl h-12 px-6 shadow-md hover:shadow-lg transition-all elegant-button">
                  Cari TPA Terdekat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="relative h-full w-full rounded-[30px] overflow-hidden border border-green-100 bg-transparent">
                  <Image
                    src="/trash.png"
                    alt="Tempat Sampah"
                    fill
                    className="object-contain p-2" // Changed from object-cover to object-contain
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
