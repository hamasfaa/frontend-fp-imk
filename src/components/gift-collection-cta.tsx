import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function GiftCollectionCTA() {
  return (
    <div className="relative my-20 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10 elegant-gradient rounded-3xl"></div>
      <div className="absolute inset-0 -z-10 subtle-dots rounded-3xl"></div>

      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-center elegant-underline">
            <span className="subtle-gradient-text">Kumpulkan Poin</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400">
                  Dapatkan Reward dari Jual Beli Sampah Daur Ulang
                </h3>
              </div>
              <p className="mb-6 text-green-700 dark:text-green-300 leading-relaxed">
                Kumpulkan poin dari aktivitas jual atau beli sampah daur ulang.
                Setiap transaksi membawa Anda lebih dekat ke berbagai hadiah
                menarik. Semakin aktif Anda berkontribusi, semakin besar poin
                yang didapat!
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
                    Voucher belanja, produk ramah lingkungan, dan penawaran
                    eksklusif
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
                    Menjual sampah mentah, membeli hasil daur ulang, hingga
                    mengajak teman bergabung
                  </span>
                </li>
              </ul>
              <Link href="/trashpoin">
                <Button className="bg-green-600 hover:bg-green-700 rounded-xl h-12 px-6 shadow-md hover:shadow-lg transition-all elegant-button">
                  Lihat Lebih Banyak Reward
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Voucher Belanja Rp 50.000", points: 500 },
                { title: "Tas Belanja Ramah Lingkungan", points: 300 },
                { title: "Tumbler Eco-Friendly", points: 450 },
                { title: "Diskon 20% untuk Pembelian", points: 200 },
              ].map((reward, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover-scale"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Badge className="bg-green-600">{reward.points} poin</Badge>
                  </div>
                  <h4 className="font-medium mb-1">{reward.title}</h4>
                  <Link href="/trashpoin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-green-600 hover:text-green-700"
                    >
                      Tukarkan
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
